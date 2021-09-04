/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {Reference} from '../../imports';
import {ReflectionHost} from '../../reflection';

import {StaticInterpreter} from './interpreter';
import {ResolvedValue} from './result';

export type ForeignFunctionResolver =
    (node: Reference<ts.FunctionDeclaration|ts.MethodDeclaration|ts.FunctionExpression>,
     args: ReadonlyArray<ts.Expression>) => ts.Expression | null;

export type VisitedFilesCallback = (sf: ts.SourceFile) => void;

export class PartialEvaluator {
  constructor(private host: ReflectionHost, private checker: ts.TypeChecker) {}

  evaluate(
      expr: ts.Expression, foreignFunctionResolver?: ForeignFunctionResolver,
      visitedFilesCb?: VisitedFilesCallback): ResolvedValue {
    const interpreter = new StaticInterpreter(this.host, this.checker, visitedFilesCb);
    if (visitedFilesCb) {
      visitedFilesCb(expr.getSourceFile());
    }
    return interpreter.visit(expr, {
      absoluteModuleName: null,
      resolutionContext: expr.getSourceFile().fileName,
      scope: new Map<ts.ParameterDeclaration, ResolvedValue>(), foreignFunctionResolver,
    });
  }
}
