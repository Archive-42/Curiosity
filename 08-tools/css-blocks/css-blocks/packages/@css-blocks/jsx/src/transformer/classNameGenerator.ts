import {
  AndExpression,
  BlockClass,
  BooleanExpression,
  Conditional,
  Dependency,
  DynamicClasses,
  HasAttrValue,
  HasGroup,
  IndexedClassRewrite,
  NotExpression,
  OrExpression,
  Style,
  Switch,
  hasDependency,
  isConditional,
  isFalseCondition,
  isSwitch,
  isTrueCondition,
} from "@css-blocks/core";
import {
  isAndExpression,
  isNotExpression,
  isOrExpression,
} from "@opticss/template-api";
import {
  assertNever,
  isSome,
  unwrap,
} from "@opticss/util";
import {
  CallExpression,
  Expression,
  arrayExpression,
  callExpression,
  identifier,
  nullLiteral,
  numericLiteral,
  stringLiteral,
} from "babel-types";

import {
  BooleanExpression as BooleanAST,
  JSXElementAnalysis,
  StringExpression as StringAST,
  TernaryExpression as TernaryAST,
} from "../Analyzer/types";

// TODO: detect conflicts and pick an available name.
export const HELPER_FN_NAME = "c$$";

const enum SourceExpression {
  ternary,
  dependency,
  boolean,
  booleanWithDep,
  switch,
  switchWithDep,
}

const builders = {
  number: numericLiteral,
  string: stringLiteral,
  null: nullLiteral,
};

const enum FalsySwitchBehavior {
  error,
  unset,
  default,
}

const enum BooleanExpr {
  not = -1,
  or = -2,
  and = -3,
}

export function classnamesHelper(rewrite: IndexedClassRewrite<Style>, element: JSXElementAnalysis, helpFnName = HELPER_FN_NAME, includeStaticClasses = false): CallExpression {
  let args: Expression[] = [ arrayExpression(constructArgs(rewrite, element)) ];
  let staticClassnames = rewrite.staticClasses;
  if (includeStaticClasses && staticClassnames.length > 0) {
    args.unshift(stringLiteral(staticClassnames.join(" ")));
  }
  return callExpression(identifier(helpFnName), args);
}

function constructArgs(rewrite: IndexedClassRewrite<Style>, element: JSXElementAnalysis): Array<Expression> {
  let expr = new Array<Expression>();
  expr.push(builders.number(element.dynamicClasses.length + element.dynamicAttributes.length));
  expr.push(builders.number(rewrite.dynamicClasses.length));
  expr.push(...constructSourceArgs(rewrite, element));
  expr.push(...constructOutputArgs(rewrite));
  return expr;
}

function constructSourceArgs(rewrite: IndexedClassRewrite<Style>, element: JSXElementAnalysis): Array<Expression> {
  let expr = new Array<Expression>();
  for (let classes of element.dynamicClasses) {
    // type of expression
    expr.push(builders.number(SourceExpression.ternary));
    expr.push(...constructTernary(classes, rewrite));
  }
  for (let attr of element.dynamicAttributes) {
    if (isSwitch(attr)) {
      if (hasDependency(attr)) {
        expr.push(builders.number(SourceExpression.switchWithDep));
        expr.push(...constructDependency(attr, rewrite));
      } else {
        expr.push(builders.number(SourceExpression.switch));
      }
      expr.push(...constructSwitch(attr, rewrite));
    } else {
      let type = 0;
      if (hasDependency(attr)) {
        type = type | SourceExpression.dependency;
      }
      if (isConditional(attr)) {
        type = type | SourceExpression.boolean;
      }
      expr.push(builders.number(type));
      if (hasDependency(attr)) {
        expr.push(...constructDependency(attr, rewrite));
      }
      if (isConditional(attr)) {
        expr.push(...constructConditional(attr, rewrite));
      }
      expr.push(...constructAttrReferences(attr, rewrite));
    }
  }
  return expr;
}

/**
 * Boolean Ternary:
 * 1: expression to evaluate as truthy
 * 2: number (t) of source styles set if true
 * 3..(3+t-1): indexes of source styles set if true
 * (3+t): number (f) of source styles set if false
 * (4+t)..(4+t+f-1): indexes of source styles set if false
 */
function constructTernary(classes: DynamicClasses<TernaryAST>, rewrite: IndexedClassRewrite<Style>): Array<Expression> {
  let expr = new Array<Expression>();
  // The boolean expression
  expr.push(classes.condition);
  // The true styles
  if (isTrueCondition(classes)) {
    let trueClasses = resolveInheritance(classes.whenTrue, rewrite);
    expr.push(builders.number(trueClasses.length));
    expr.push(...trueClasses.map(style => builders.number(unwrap(rewrite.indexOf(style)))));
  } else {
    expr.push(builders.number(0));
  }
  // The false styles
  if (isFalseCondition(classes)) {
    let falseClasses = resolveInheritance(classes.whenFalse, rewrite);
    expr.push(builders.number(falseClasses.length));
    expr.push(...falseClasses.map(style => builders.number(unwrap(rewrite.indexOf(style)))));
  } else {
    expr.push(builders.number(0));
  }
  return expr;
}

function resolveInheritance(classes: Array<BlockClass>, rewrite: IndexedClassRewrite<Style>) {
  let allClasses = [...classes];
  for (let c of classes) {
    allClasses.push(...c.resolveInheritance());
  }
  return allClasses.filter(c => isSome(rewrite.indexOf(c)));
}

/*
 * if conditional type has a dependency:
 *   3/4: number (d) of style indexes this is dependent on.
 *   4/5..((4/5)+d-1): style indexes that must be set for this to be true
 */
function constructDependency(attr: Dependency, rewrite: IndexedClassRewrite<Style>): Array<Expression> {
  let expr = new Array<Expression>();
  expr.push(builders.number(1));
  expr.push(builders.number(unwrap(rewrite.indexOf(attr.container))));
  return expr;
}

function constructConditional(attr: Conditional<BooleanAST> & HasAttrValue, _rewrite: IndexedClassRewrite<Style>): Array<Expression> {
  let expr = new Array<Expression>();
  expr.push(attr.condition);
  return expr;
}

function constructAttrReferences(attr: HasAttrValue, rewrite: IndexedClassRewrite<Style>): Array<Expression> {
  let expr = new Array<Expression>();
  // TODO: inheritance
  expr.push(builders.number(1));
  expr.push(builders.number(unwrap(rewrite.indexOf(attr.value))));
  return expr;
}
/*
 * * String switch:
 * 1: conditional type: 4 - switch, 5 - both switch and dependency
 * if conditional type has a dependency:
 *   2: number (d) of style indexes this is dependent on.
 *   3..((3)+d-1): style indexes that must be set for this to be true
 * 1: number (n) of strings that can be returned
 * 2: whether a falsy value is an error (0), unsets the values (1)
 *    or provide a default (2) if a string
 * 3?: the default value if the falsy behavior is default (2)
 * then: expression to evaluate as a string
 * For each of the <n> strings that can be returned:
 *   1: string that can be returned by the expression
 *   2: number (s) of source styles set. s >= 1
 *   3..3+s-1: indexes of source styles set
 */
function constructSwitch(attr: Switch<StringAST> & HasGroup, rewrite: IndexedClassRewrite<Style>): Array<Expression> {
  let expr = new Array<Expression>();
  let values = Object.keys(attr.group);
  expr.push(builders.number(values.length));
  if (attr.disallowFalsy) {
    expr.push(builders.number(FalsySwitchBehavior.error));
  } else {
    expr.push(builders.number(FalsySwitchBehavior.unset));
  }
  expr.push(attr.stringExpression);
  for (let value of values) {
    let obj = attr.group[value];
    expr.push(builders.string(value));
    expr.push(builders.number(1));
    expr.push(builders.number(unwrap(rewrite.indexOf(obj))));
  }
  return expr;
}

// tslint:disable-next-line:prefer-whatever-to-any
function constructOutputArgs(rewrite: IndexedClassRewrite<any>): Array<Expression> {
  let expr = new Array<Expression>();
  for (let out of rewrite.dynamicClasses) {
    expr.push(builders.string(out));
    expr.push(...constructBoolean(rewrite.dynamicClass(out)!));
  }
  return expr;
}

type ConditionalArg = number | BooleanExpression<number>;

function constructBoolean(bool: ConditionalArg): Array<Expression> {
  if (typeof bool === "number") {
    return [builders.number(bool)];
  } else if (isAndExpression(bool)) {
    return constructAndExpression(bool);
  } else if (isOrExpression(bool)) {
    return constructOrExpression(bool);
  } else if (isNotExpression(bool)) {
    return constructNotExpression(bool);
  } else {
    assertNever(bool);
    return [builders.null()];
  }
}

function constructAndExpression(bool: AndExpression<number>): Array<Expression> {
  return constructConditionalExpression(BooleanExpr.and, bool.and);
}
function constructOrExpression(bool: OrExpression<number>): Array<Expression> {
  return constructConditionalExpression(BooleanExpr.or, bool.or);
}

function constructNotExpression(bool: NotExpression<number>): Array<Expression> {
  return [builders.number(BooleanExpr.not), ...constructBoolean(bool.not)];
}
function constructConditionalExpression(type: BooleanExpr, args: Array<ConditionalArg>): Array<Expression> {
  let expr = new Array<Expression>();
  if (args.length === 1) {
    let n = args[0];
    if (typeof n === "number") {
      expr.push(builders.number(n));
      return expr;
    }
  }
  expr.push(builders.number(type));
  expr.push(builders.number(args.length));
  for (let e of args) {
    if (typeof e === "number") {
      expr.push(builders.number(e));
    } else {
      expr.push(...constructBoolean(e));
    }
  }
  return expr;
}
