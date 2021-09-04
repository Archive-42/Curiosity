/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ConstantPool} from '../../constant_pool';
import {AttributeMarker} from '../../core';
import {AST, BindingType, Interpolation} from '../../expression_parser/ast';
import * as o from '../../output/output_ast';
import {ParseSourceSpan} from '../../parse_util';
import {isEmptyExpression} from '../../template_parser/template_parser';
import * as t from '../r3_ast';
import {Identifiers as R3} from '../r3_identifiers';

import {parse as parseStyle} from './style_parser';
import {ValueConverter} from './template';

const IMPORTANT_FLAG = '!important';

/**
 * A styling expression summary that is to be processed by the compiler
 */
export interface Instruction {
  sourceSpan: ParseSourceSpan|null;
  reference: o.ExternalReference;
  allocateBindingSlots: number;
  buildParams(convertFn: (value: any) => o.Expression): o.Expression[];
}

/**
 * An internal record of the input data for a styling binding
 */
interface BoundStylingEntry {
  hasOverrideFlag: boolean;
  name: string|null;
  unit: string|null;
  sourceSpan: ParseSourceSpan;
  value: AST;
}

/**
 * Produces creation/update instructions for all styling bindings (class and style)
 *
 * It also produces the creation instruction to register all initial styling values
 * (which are all the static class="..." and style="..." attribute values that exist
 * on an element within a template).
 *
 * The builder class below handles producing instructions for the following cases:
 *
 * - Static style/class attributes (style="..." and class="...")
 * - Dynamic style/class map bindings ([style]="map" and [class]="map|string")
 * - Dynamic style/class property bindings ([style.prop]="exp" and [class.name]="exp")
 *
 * Due to the complex relationship of all of these cases, the instructions generated
 * for these attributes/properties/bindings must be done so in the correct order. The
 * order which these must be generated is as follows:
 *
 * if (createMode) {
 *   elementStyling(...)
 * }
 * if (updateMode) {
 *   elementStylingMap(...)
 *   elementStyleProp(...)
 *   elementClassProp(...)
 *   elementStylingApp(...)
 * }
 *
 * The creation/update methods within the builder class produce these instructions.
 */
export class StylingBuilder {
  /** Whether or not there are any static styling values present */
  private _hasInitialValues = false;
  /**
   *  Whether or not there are any styling bindings present
   *  (i.e. `[style]`, `[class]`, `[style.prop]` or `[class.name]`)
   */
  public hasBindings = false;

  /** the input for [class] (if it exists) */
  private _classMapInput: BoundStylingEntry|null = null;
  /** the input for [style] (if it exists) */
  private _styleMapInput: BoundStylingEntry|null = null;
  /** an array of each [style.prop] input */
  private _singleStyleInputs: BoundStylingEntry[]|null = null;
  /** an array of each [class.name] input */
  private _singleClassInputs: BoundStylingEntry[]|null = null;
  private _lastStylingInput: BoundStylingEntry|null = null;

  // maps are used instead of hash maps because a Map will
  // retain the ordering of the keys

  /**
   * Represents the location of each style binding in the template
   * (e.g. `<div [style.width]="w" [style.height]="h">` implies
   * that `width=0` and `height=1`)
   */
  private _stylesIndex = new Map<string, number>();

  /**
   * Represents the location of each class binding in the template
   * (e.g. `<div [class.big]="b" [class.hidden]="h">` implies
   * that `big=0` and `hidden=1`)
   */
  private _classesIndex = new Map<string, number>();
  private _initialStyleValues: string[] = [];
  private _initialClassValues: string[] = [];

  // certain style properties ALWAYS need sanitization
  // this is checked each time new styles are encountered
  private _useDefaultSanitizer = false;

  constructor(private _elementIndexExpr: o.Expression, private _directiveExpr: o.Expression|null) {}

  /**
   * Registers a given input to the styling builder to be later used when producing AOT code.
   *
   * The code below will only accept the input if it is somehow tied to styling (whether it be
   * style/class bindings or static style/class attributes).
   */
  registerBoundInput(input: t.BoundAttribute): boolean {
    // [attr.style] or [attr.class] are skipped in the code below,
    // they should not be treated as styling-based bindings since
    // they are intended to be written directly to the attr and
    // will therefore skip all style/class resolution that is present
    // with style="", [style]="" and [style.prop]="", class="",
    // [class.prop]="". [class]="" assignments
    let binding: BoundStylingEntry|null = null;
    let name = input.name;
    switch (input.type) {
      case BindingType.Property:
        binding = this.registerInputBasedOnName(name, input.value, input.sourceSpan);
        break;
      case BindingType.Style:
        binding = this.registerStyleInput(name, false, input.value, input.sourceSpan, input.unit);
        break;
      case BindingType.Class:
        binding = this.registerClassInput(name, false, input.value, input.sourceSpan);
        break;
    }
    return binding ? true : false;
  }

  registerInputBasedOnName(name: string, expression: AST, sourceSpan: ParseSourceSpan) {
    let binding: BoundStylingEntry|null = null;
    const nameToMatch = name.substring(0, 5);  // class | style
    const isStyle = nameToMatch === 'style';
    const isClass = isStyle ? false : (nameToMatch === 'class');
    if (isStyle || isClass) {
      const isMapBased = name.charAt(5) !== '.';         // style.prop or class.prop makes this a no
      const property = name.substr(isMapBased ? 5 : 6);  // the dot explains why there's a +1
      if (isStyle) {
        binding = this.registerStyleInput(property, isMapBased, expression, sourceSpan);
      } else {
        binding = this.registerClassInput(property, isMapBased, expression, sourceSpan);
      }
    }
    return binding;
  }

  registerStyleInput(
      name: string, isMapBased: boolean, value: AST, sourceSpan: ParseSourceSpan,
      unit?: string|null): BoundStylingEntry|null {
    if (isEmptyExpression(value)) {
      return null;
    }
    const {property, hasOverrideFlag, unit: bindingUnit} = parseProperty(name);
    const entry: BoundStylingEntry = {
      name: property,
      unit: unit || bindingUnit, value, sourceSpan, hasOverrideFlag
    };
    if (isMapBased) {
      this._useDefaultSanitizer = true;
      this._styleMapInput = entry;
    } else {
      (this._singleStyleInputs = this._singleStyleInputs || []).push(entry);
      this._useDefaultSanitizer = this._useDefaultSanitizer || isStyleSanitizable(name);
      registerIntoMap(this._stylesIndex, property);
    }
    this._lastStylingInput = entry;
    this.hasBindings = true;
    return entry;
  }

  registerClassInput(name: string, isMapBased: boolean, value: AST, sourceSpan: ParseSourceSpan):
      BoundStylingEntry|null {
    if (isEmptyExpression(value)) {
      return null;
    }
    const {property, hasOverrideFlag} = parseProperty(name);
    const entry:
        BoundStylingEntry = {name: property, value, sourceSpan, hasOverrideFlag, unit: null};
    if (isMapBased) {
      this._classMapInput = entry;
    } else {
      (this._singleClassInputs = this._singleClassInputs || []).push(entry);
      registerIntoMap(this._classesIndex, property);
    }
    this._lastStylingInput = entry;
    this.hasBindings = true;
    return entry;
  }

  /**
   * Registers the element's static style string value to the builder.
   *
   * @param value the style string (e.g. `width:100px; height:200px;`)
   */
  registerStyleAttr(value: string) {
    this._initialStyleValues = parseStyle(value);
    this._hasInitialValues = true;
  }

  /**
   * Registers the element's static class string value to the builder.
   *
   * @param value the className string (e.g. `disabled gold zoom`)
   */
  registerClassAttr(value: string) {
    this._initialClassValues = value.trim().split(/\s+/g);
    this._hasInitialValues = true;
  }

  /**
   * Appends all styling-related expressions to the provided attrs array.
   *
   * @param attrs an existing array where each of the styling expressions
   * will be inserted into.
   */
  populateInitialStylingAttrs(attrs: o.Expression[]): void {
    // [CLASS_MARKER, 'foo', 'bar', 'baz' ...]
    if (this._initialClassValues.length) {
      attrs.push(o.literal(AttributeMarker.Classes));
      for (let i = 0; i < this._initialClassValues.length; i++) {
        attrs.push(o.literal(this._initialClassValues[i]));
      }
    }

    // [STYLE_MARKER, 'width', '200px', 'height', '100px', ...]
    if (this._initialStyleValues.length) {
      attrs.push(o.literal(AttributeMarker.Styles));
      for (let i = 0; i < this._initialStyleValues.length; i += 2) {
        attrs.push(
            o.literal(this._initialStyleValues[i]), o.literal(this._initialStyleValues[i + 1]));
      }
    }
  }

  /**
   * Builds an instruction with all the expressions and parameters for `elementHostAttrs`.
   *
   * The instruction generation code below is used for producing the AOT statement code which is
   * responsible for registering initial styles (within a directive hostBindings' creation block),
   * as well as any of the provided attribute values, to the directive host element.
   */
  buildHostAttrsInstruction(
      sourceSpan: ParseSourceSpan|null, attrs: o.Expression[],
      constantPool: ConstantPool): Instruction|null {
    if (this._directiveExpr && (attrs.length || this._hasInitialValues)) {
      return {
        sourceSpan,
        reference: R3.elementHostAttrs,
        allocateBindingSlots: 0,
        buildParams: () => {
          // params => elementHostAttrs(agetDirectiveContext()ttrs)
          this.populateInitialStylingAttrs(attrs);
          const attrArray = !attrs.some(attr => attr instanceof o.WrappedNodeExpr) ?
              getConstantLiteralFromArray(constantPool, attrs) :
              o.literalArr(attrs);
          return [attrArray];
        }
      };
    }
    return null;
  }

  /**
   * Builds an instruction with all the expressions and parameters for `elementStyling`.
   *
   * The instruction generation code below is used for producing the AOT statement code which is
   * responsible for registering style/class bindings to an element.
   */
  buildElementStylingInstruction(sourceSpan: ParseSourceSpan|null, constantPool: ConstantPool):
      Instruction|null {
    const reference = this._directiveExpr ? R3.elementHostStyling : R3.elementStyling;
    if (this.hasBindings) {
      return {
        sourceSpan,
        allocateBindingSlots: 0, reference,
        buildParams: () => {
          // a string array of every style-based binding
          const styleBindingProps =
              this._singleStyleInputs ? this._singleStyleInputs.map(i => o.literal(i.name)) : [];
          // a string array of every class-based binding
          const classBindingNames =
              this._singleClassInputs ? this._singleClassInputs.map(i => o.literal(i.name)) : [];

          // to salvage space in the AOT generated code, there is no point in passing
          // in `null` into a param if any follow-up params are not used. Therefore,
          // only when a trailing param is used then it will be filled with nulls in between
          // (otherwise a shorter amount of params will be filled). The code below helps
          // determine how many params are required in the expression code.
          //
          // HOST:
          //   min params => elementHostStyling()
          //   max params => elementHostStyling(classBindings, styleBindings, sanitizer)
          //
          // Template:
          //   min params => elementStyling()
          //   max params => elementStyling(classBindings, styleBindings, sanitizer)
          //
          const params: o.Expression[] = [];
          let expectedNumberOfArgs = 0;
          if (this._useDefaultSanitizer) {
            expectedNumberOfArgs = 3;
          } else if (styleBindingProps.length) {
            expectedNumberOfArgs = 2;
          } else if (classBindingNames.length) {
            expectedNumberOfArgs = 1;
          }

          addParam(
              params, classBindingNames.length > 0,
              getConstantLiteralFromArray(constantPool, classBindingNames), 1,
              expectedNumberOfArgs);
          addParam(
              params, styleBindingProps.length > 0,
              getConstantLiteralFromArray(constantPool, styleBindingProps), 2,
              expectedNumberOfArgs);
          addParam(
              params, this._useDefaultSanitizer, o.importExpr(R3.defaultStyleSanitizer), 3,
              expectedNumberOfArgs);
          return params;
        }
      };
    }
    return null;
  }

  /**
   * Builds an instruction with all the expressions and parameters for `elementStylingMap`.
   *
   * The instruction data will contain all expressions for `elementStylingMap` to function
   * which include the `[style]` and `[class]` expression params (if they exist) as well as
   * the sanitizer and directive reference expression.
   */
  buildElementStylingMapInstruction(valueConverter: ValueConverter): Instruction|null {
    if (this._classMapInput || this._styleMapInput) {
      const stylingInput = this._classMapInput ! || this._styleMapInput !;
      let totalBindingSlotsRequired = 0;

      // these values must be outside of the update block so that they can
      // be evaluted (the AST visit call) during creation time so that any
      // pipes can be picked up in time before the template is built
      const mapBasedClassValue =
          this._classMapInput ? this._classMapInput.value.visit(valueConverter) : null;
      if (mapBasedClassValue instanceof Interpolation) {
        totalBindingSlotsRequired += mapBasedClassValue.expressions.length;
      }

      const mapBasedStyleValue =
          this._styleMapInput ? this._styleMapInput.value.visit(valueConverter) : null;
      if (mapBasedStyleValue instanceof Interpolation) {
        totalBindingSlotsRequired += mapBasedStyleValue.expressions.length;
      }

      const isHostBinding = this._directiveExpr;
      const reference = isHostBinding ? R3.elementHostStylingMap : R3.elementStylingMap;

      return {
        sourceSpan: stylingInput.sourceSpan,
        reference,
        allocateBindingSlots: totalBindingSlotsRequired,
        buildParams: (convertFn: (value: any) => o.Expression) => {
          // HOST:
          //   min params => elementHostStylingMap(classMap)
          //   max params => elementHostStylingMap(classMap, styleMap)
          // Template:
          //   min params => elementStylingMap(elmIndex, classMap)
          //   max params => elementStylingMap(elmIndex, classMap, styleMap)

          const params: o.Expression[] = [];
          if (!isHostBinding) {
            params.push(this._elementIndexExpr);
          }

          let expectedNumberOfArgs = 0;
          if (mapBasedStyleValue) {
            expectedNumberOfArgs = 2;
          } else if (mapBasedClassValue) {
            // index and class = 2
            expectedNumberOfArgs = 1;
          }

          addParam(
              params, mapBasedClassValue, mapBasedClassValue ? convertFn(mapBasedClassValue) : null,
              1, expectedNumberOfArgs);
          addParam(
              params, mapBasedStyleValue, mapBasedStyleValue ? convertFn(mapBasedStyleValue) : null,
              2, expectedNumberOfArgs);
          return params;
        }
      };
    }
    return null;
  }

  private _buildSingleInputs(
      reference: o.ExternalReference, isHostBinding: boolean, inputs: BoundStylingEntry[],
      mapIndex: Map<string, number>, allowUnits: boolean,
      valueConverter: ValueConverter): Instruction[] {
    let totalBindingSlotsRequired = 0;
    return inputs.map(input => {
      const bindingIndex: number = mapIndex.get(input.name !) !;
      const value = input.value.visit(valueConverter);
      totalBindingSlotsRequired += (value instanceof Interpolation) ? value.expressions.length : 0;
      return {
        sourceSpan: input.sourceSpan,
        allocateBindingSlots: totalBindingSlotsRequired, reference,
        buildParams: (convertFn: (value: any) => o.Expression) => {
          // HOST:
          //   min params => elementHostStylingProp(bindingIndex, value)
          //   max params => elementHostStylingProp(bindingIndex, value, overrideFlag)
          // Template:
          //   min params => elementStylingProp(elmIndex, bindingIndex, value)
          //   max params => elementStylingProp(elmIndex, bindingIndex, value, overrideFlag)
          const params: o.Expression[] = [];

          if (!isHostBinding) {
            params.push(this._elementIndexExpr);
          }

          params.push(o.literal(bindingIndex));
          params.push(convertFn(value));

          if (allowUnits) {
            if (input.unit) {
              params.push(o.literal(input.unit));
            } else if (input.hasOverrideFlag) {
              params.push(o.NULL_EXPR);
            }
          }

          if (input.hasOverrideFlag) {
            params.push(o.literal(true));
          }

          return params;
        }
      };
    });
  }

  private _buildClassInputs(valueConverter: ValueConverter): Instruction[] {
    if (this._singleClassInputs) {
      const isHostBinding = !!this._directiveExpr;
      const reference = isHostBinding ? R3.elementHostClassProp : R3.elementClassProp;
      return this._buildSingleInputs(
          reference, isHostBinding, this._singleClassInputs, this._classesIndex, false,
          valueConverter);
    }
    return [];
  }

  private _buildStyleInputs(valueConverter: ValueConverter): Instruction[] {
    if (this._singleStyleInputs) {
      const isHostBinding = !!this._directiveExpr;
      const reference = isHostBinding ? R3.elementHostStyleProp : R3.elementStyleProp;
      return this._buildSingleInputs(
          reference, isHostBinding, this._singleStyleInputs, this._stylesIndex, true,
          valueConverter);
    }
    return [];
  }

  private _buildApplyFn(): Instruction {
    const isHostBinding = this._directiveExpr;
    const reference = isHostBinding ? R3.elementHostStylingApply : R3.elementStylingApply;
    return {
      sourceSpan: this._lastStylingInput ? this._lastStylingInput.sourceSpan : null,
      reference,
      allocateBindingSlots: 0,
      buildParams: () => {
        // HOST:
        //   params => elementHostStylingApply()
        // Template:
        //   params => elementStylingApply(elmIndex)
        return isHostBinding ? [] : [this._elementIndexExpr];
      }
    };
  }

  /**
   * Constructs all instructions which contain the expressions that will be placed
   * into the update block of a template function or a directive hostBindings function.
   */
  buildUpdateLevelInstructions(valueConverter: ValueConverter) {
    const instructions: Instruction[] = [];
    if (this.hasBindings) {
      const mapInstruction = this.buildElementStylingMapInstruction(valueConverter);
      if (mapInstruction) {
        instructions.push(mapInstruction);
      }
      instructions.push(...this._buildStyleInputs(valueConverter));
      instructions.push(...this._buildClassInputs(valueConverter));
      instructions.push(this._buildApplyFn());
    }
    return instructions;
  }
}

function registerIntoMap(map: Map<string, number>, key: string) {
  if (!map.has(key)) {
    map.set(key, map.size);
  }
}

function isStyleSanitizable(prop: string): boolean {
  return prop === 'background-image' || prop === 'background' || prop === 'border-image' ||
      prop === 'filter' || prop === 'list-style' || prop === 'list-style-image';
}

/**
 * Simple helper function to either provide the constant literal that will house the value
 * here or a null value if the provided values are empty.
 */
function getConstantLiteralFromArray(
    constantPool: ConstantPool, values: o.Expression[]): o.Expression {
  return values.length ? constantPool.getConstLiteral(o.literalArr(values), true) : o.NULL_EXPR;
}

/**
 * Simple helper function that adds a parameter or does nothing at all depending on the provided
 * predicate and totalExpectedArgs values
 */
function addParam(
    params: o.Expression[], predicate: any, value: o.Expression | null, argNumber: number,
    totalExpectedArgs: number) {
  if (predicate && value) {
    params.push(value);
  } else if (argNumber < totalExpectedArgs) {
    params.push(o.NULL_EXPR);
  }
}

export function parseProperty(name: string):
    {property: string, unit: string, hasOverrideFlag: boolean} {
  let hasOverrideFlag = false;
  const overrideIndex = name.indexOf(IMPORTANT_FLAG);
  if (overrideIndex !== -1) {
    name = overrideIndex > 0 ? name.substring(0, overrideIndex) : '';
    hasOverrideFlag = true;
  }

  let unit = '';
  let property = name;
  const unitIndex = name.lastIndexOf('.');
  if (unitIndex > 0) {
    unit = name.substr(unitIndex + 1);
    property = name.substring(0, unitIndex);
  }

  return {property, unit, hasOverrideFlag};
}
