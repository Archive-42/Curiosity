/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {DynamicValue} from './dynamic';
import {BuiltinFn, ResolvedValue, ResolvedValueArray} from './result';

export class ArraySliceBuiltinFn extends BuiltinFn {
  constructor(private node: ts.Node, private lhs: ResolvedValueArray) { super(); }

  evaluate(args: ResolvedValueArray): ResolvedValue {
    if (args.length === 0) {
      return this.lhs;
    } else {
      return DynamicValue.fromUnknown(this.node);
    }
  }
}

export class ArrayConcatBuiltinFn extends BuiltinFn {
  constructor(private node: ts.Node, private lhs: ResolvedValueArray) { super(); }

  evaluate(args: ResolvedValueArray): ResolvedValue {
    const result: ResolvedValueArray = [...this.lhs];
    for (const arg of args) {
      if (arg instanceof DynamicValue) {
        result.push(DynamicValue.fromDynamicInput(this.node, arg));
      } else if (Array.isArray(arg)) {
        result.push(...arg);
      } else {
        result.push(arg);
      }
    }
    return result;
  }
}
