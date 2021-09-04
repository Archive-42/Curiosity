/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {WrappedNodeExpr} from '@angular/compiler';
import {R3Reference} from '@angular/compiler/src/compiler';
import * as ts from 'typescript';

import {LocalIdentifierStrategy, NOOP_DEFAULT_IMPORT_RECORDER, ReferenceEmitter} from '../../imports';
import {DtsMetadataReader, LocalMetadataRegistry} from '../../metadata';
import {PartialEvaluator} from '../../partial_evaluator';
import {TypeScriptReflectionHost, isNamedClassDeclaration} from '../../reflection';
import {LocalModuleScopeRegistry, MetadataDtsModuleScopeResolver} from '../../scope';
import {getDeclaration, makeProgram} from '../../testing/in_memory_typescript';
import {NgModuleDecoratorHandler} from '../src/ng_module';
import {NoopReferencesRegistry} from '../src/references_registry';

describe('NgModuleDecoratorHandler', () => {
  it('should resolve forwardRef', () => {
    const {program} = makeProgram([
      {
        name: 'node_modules/@angular/core/index.d.ts',
        contents: `
          export const Component: any;
          export const NgModule: any;
          export declare function forwardRef(fn: () => any): any;
        `,
      },
      {
        name: 'entry.ts',
        contents: `
          import {Component, forwardRef, NgModule} from '@angular/core';

          @Component({
            template: '',
          })
          export class TestComp {}

          @NgModule()
          export class TestModuleDependency {}

          @NgModule({
            declarations: [forwardRef(() => TestComp)],
            exports: [forwardRef(() => TestComp)],
            imports: [forwardRef(() => TestModuleDependency)]
          })
          export class TestModule {}
        `
      },
    ]);
    const checker = program.getTypeChecker();
    const reflectionHost = new TypeScriptReflectionHost(checker);
    const evaluator = new PartialEvaluator(reflectionHost, checker);
    const referencesRegistry = new NoopReferencesRegistry();
    const metaRegistry = new LocalMetadataRegistry();
    const dtsReader = new DtsMetadataReader(checker, reflectionHost);
    const scopeRegistry = new LocalModuleScopeRegistry(
        metaRegistry, new MetadataDtsModuleScopeResolver(dtsReader, null), new ReferenceEmitter([]),
        null);
    const refEmitter = new ReferenceEmitter([new LocalIdentifierStrategy()]);

    const handler = new NgModuleDecoratorHandler(
        reflectionHost, evaluator, metaRegistry, scopeRegistry, referencesRegistry, false, null,
        refEmitter, NOOP_DEFAULT_IMPORT_RECORDER);
    const TestModule = getDeclaration(program, 'entry.ts', 'TestModule', isNamedClassDeclaration);
    const detected =
        handler.detect(TestModule, reflectionHost.getDecoratorsOfDeclaration(TestModule));
    if (detected === undefined) {
      return fail('Failed to recognize @NgModule');
    }
    const moduleDef = handler.analyze(TestModule, detected.metadata).analysis !.ngModuleDef;

    expect(getReferenceIdentifierTexts(moduleDef.declarations)).toEqual(['TestComp']);
    expect(getReferenceIdentifierTexts(moduleDef.exports)).toEqual(['TestComp']);
    expect(getReferenceIdentifierTexts(moduleDef.imports)).toEqual(['TestModuleDependency']);

    function getReferenceIdentifierTexts(references: R3Reference[]) {
      return references.map(ref => (ref.value as WrappedNodeExpr<ts.Identifier>).node.text);
    }
  });

});
