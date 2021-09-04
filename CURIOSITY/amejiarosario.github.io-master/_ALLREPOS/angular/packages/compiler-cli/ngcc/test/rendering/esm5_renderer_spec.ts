/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {dirname} from 'canonical-path';
import MagicString from 'magic-string';
import * as ts from 'typescript';
import {AbsoluteFsPath} from '../../../src/ngtsc/path';
import {DecorationAnalyzer} from '../../src/analysis/decoration_analyzer';
import {NgccReferencesRegistry} from '../../src/analysis/ngcc_references_registry';
import {SwitchMarkerAnalyzer} from '../../src/analysis/switch_marker_analyzer';
import {Esm5ReflectionHost} from '../../src/host/esm5_host';
import {Esm5Renderer} from '../../src/rendering/esm5_renderer';
import {makeTestEntryPointBundle, getDeclaration} from '../helpers/utils';
import {MockLogger} from '../helpers/mock_logger';

function setup(file: {name: string, contents: string}) {
  const logger = new MockLogger();
  const dir = dirname(file.name);
  const bundle = makeTestEntryPointBundle('module', 'esm5', false, [file]);
  const typeChecker = bundle.src.program.getTypeChecker();
  const host = new Esm5ReflectionHost(logger, false, typeChecker);
  const referencesRegistry = new NgccReferencesRegistry(host);
  const decorationAnalyses =
      new DecorationAnalyzer(
          bundle.src.program, bundle.src.options, bundle.src.host, typeChecker, host,
          referencesRegistry, [AbsoluteFsPath.fromUnchecked('/')], false)
          .analyzeProgram();
  const switchMarkerAnalyses = new SwitchMarkerAnalyzer(host).analyzeProgram(bundle.src.program);
  const renderer = new Esm5Renderer(logger, host, false, bundle, dir);
  return {
    host,
    program: bundle.src.program,
    sourceFile: bundle.src.file, renderer, decorationAnalyses, switchMarkerAnalyses
  };
}

const PROGRAM = {
  name: '/some/file.js',
  contents: `
/* A copyright notice */
import 'some-side-effect';
import {Directive} from '@angular/core';
var A = (function() {
  function A() {}
  A.decorators = [
    { type: Directive, args: [{ selector: '[a]' }] },
    { type: OtherA }
  ];
  A.prototype.ngDoCheck = function() {
    //
  };
  return A;
}());

var B = (function() {
  function B() {}
  B.decorators = [
    { type: OtherB },
    { type: Directive, args: [{ selector: '[b]' }] }
  ];
  return B;
}());

var C = (function() {
  function C() {}
  C.decorators = [
    { type: Directive, args: [{ selector: '[c]' }] },
  ];
  return C;
}());

function NoIife() {}

var BadIife = (function() {
  function BadIife() {}
  BadIife.decorators = [
    { type: Directive, args: [{ selector: '[c]' }] },
  ];
}());

var compileNgModuleFactory = compileNgModuleFactory__PRE_R3__;
var badlyFormattedVariable = __PRE_R3__badlyFormattedVariable;
function compileNgModuleFactory__PRE_R3__(injector, options, moduleType) {
  const compilerFactory = injector.get(CompilerFactory);
  const compiler = compilerFactory.createCompiler([options]);
  return compiler.compileModuleAsync(moduleType);
}

function compileNgModuleFactory__POST_R3__(injector, options, moduleType) {
  ngDevMode && assertNgModuleType(moduleType);
  return Promise.resolve(new R3NgModuleFactory(moduleType));
}
// Some other content
export {A, B, C, NoIife, BadIife};`
};

const PROGRAM_DECORATE_HELPER = {
  name: '/some/file.js',
  contents: `
import * as tslib_1 from "tslib";
/* A copyright notice */
import { Directive } from '@angular/core';
var OtherA = function () { return function (node) { }; };
var OtherB = function () { return function (node) { }; };
var A = /** @class */ (function () {
    function A() {
    }
    A = tslib_1.__decorate([
        Directive({ selector: '[a]' }),
        OtherA()
    ], A);
    return A;
}());
export { A };
var B = /** @class */ (function () {
    function B() {
    }
    B = tslib_1.__decorate([
        OtherB(),
        Directive({ selector: '[b]' })
    ], B);
    return B;
}());
export { B };
var C = /** @class */ (function () {
    function C() {
    }
    C = tslib_1.__decorate([
        Directive({ selector: '[c]' })
    ], C);
    return C;
}());
export { C };
var D = /** @class */ (function () {
    function D() {
    }
    D_1 = D;
    var D_1;
    D = D_1 = tslib_1.__decorate([
        Directive({ selector: '[d]', providers: [D_1] })
    ], D);
    return D;
}());
export { D };
// Some other content`
};

describe('Esm5Renderer', () => {

  describe('addImports', () => {
    it('should insert the given imports after existing imports of the source file', () => {
      const {renderer, sourceFile} = setup(PROGRAM);
      const output = new MagicString(PROGRAM.contents);
      renderer.addImports(
          output,
          [
            {specifier: '@angular/core', qualifier: 'i0'},
            {specifier: '@angular/common', qualifier: 'i1'}
          ],
          sourceFile);
      expect(output.toString()).toContain(`/* A copyright notice */
import 'some-side-effect';
import {Directive} from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';`);
    });
  });

  describe('addExports', () => {
    it('should insert the given exports at the end of the source file', () => {
      const {renderer} = setup(PROGRAM);
      const output = new MagicString(PROGRAM.contents);
      renderer.addExports(output, PROGRAM.name.replace(/\.js$/, ''), [
        {from: '/some/a.js', dtsFrom: '/some/a.d.ts', identifier: 'ComponentA1'},
        {from: '/some/a.js', dtsFrom: '/some/a.d.ts', identifier: 'ComponentA2'},
        {from: '/some/foo/b.js', dtsFrom: '/some/foo/b.d.ts', identifier: 'ComponentB'},
        {from: PROGRAM.name, dtsFrom: PROGRAM.name, identifier: 'TopLevelComponent'},
      ]);
      expect(output.toString()).toContain(`
export {A, B, C, NoIife, BadIife};
export {ComponentA1} from './a';
export {ComponentA2} from './a';
export {ComponentB} from './foo/b';
export {TopLevelComponent};`);
    });

    it('should not insert alias exports in js output', () => {
      const {renderer} = setup(PROGRAM);
      const output = new MagicString(PROGRAM.contents);
      renderer.addExports(output, PROGRAM.name.replace(/\.js$/, ''), [
        {from: '/some/a.js', alias: 'eComponentA1', identifier: 'ComponentA1'},
        {from: '/some/a.js', alias: 'eComponentA2', identifier: 'ComponentA2'},
        {from: '/some/foo/b.js', alias: 'eComponentB', identifier: 'ComponentB'},
        {from: PROGRAM.name, alias: 'eTopLevelComponent', identifier: 'TopLevelComponent'},
      ]);
      const outputString = output.toString();
      expect(outputString).not.toContain(`{eComponentA1 as ComponentA1}`);
      expect(outputString).not.toContain(`{eComponentB as ComponentB}`);
      expect(outputString).not.toContain(`{eTopLevelComponent as TopLevelComponent}`);
    });
  });

  describe('addConstants', () => {
    it('should insert the given constants after imports in the source file', () => {
      const {renderer, program} = setup(PROGRAM);
      const file = program.getSourceFile('some/file.js');
      if (file === undefined) {
        throw new Error(`Could not find source file`);
      }
      const output = new MagicString(PROGRAM.contents);
      renderer.addConstants(output, 'const x = 3;', file);
      expect(output.toString()).toContain(`
import {Directive} from '@angular/core';

const x = 3;
var A = (function() {`);
    });

    it('should insert constants after inserted imports', () => {
      const {renderer, program} = setup(PROGRAM);
      const file = program.getSourceFile('some/file.js');
      if (file === undefined) {
        throw new Error(`Could not find source file`);
      }
      const output = new MagicString(PROGRAM.contents);
      renderer.addConstants(output, 'const x = 3;', file);
      renderer.addImports(output, [{specifier: '@angular/core', qualifier: 'i0'}], file);
      expect(output.toString()).toContain(`
import {Directive} from '@angular/core';
import * as i0 from '@angular/core';

const x = 3;
var A = (function() {`);
    });
  });

  describe('rewriteSwitchableDeclarations', () => {
    it('should switch marked declaration initializers', () => {
      const {renderer, program, sourceFile, switchMarkerAnalyses} = setup(PROGRAM);
      const file = program.getSourceFile('some/file.js');
      if (file === undefined) {
        throw new Error(`Could not find source file`);
      }
      const output = new MagicString(PROGRAM.contents);
      renderer.rewriteSwitchableDeclarations(
          output, file, switchMarkerAnalyses.get(sourceFile) !.declarations);
      expect(output.toString())
          .not.toContain(`var compileNgModuleFactory = compileNgModuleFactory__PRE_R3__;`);
      expect(output.toString())
          .toContain(`var badlyFormattedVariable = __PRE_R3__badlyFormattedVariable;`);
      expect(output.toString())
          .toContain(`var compileNgModuleFactory = compileNgModuleFactory__POST_R3__;`);
      expect(output.toString())
          .toContain(`function compileNgModuleFactory__PRE_R3__(injector, options, moduleType) {`);
      expect(output.toString())
          .toContain(`function compileNgModuleFactory__POST_R3__(injector, options, moduleType) {`);
    });
  });

  describe('addDefinitions', () => {
    it('should insert the definitions directly before the return statement of the class IIFE',
       () => {
         const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM);
         const output = new MagicString(PROGRAM.contents);
         const compiledClass =
             decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'A') !;
         renderer.addDefinitions(output, compiledClass, 'SOME DEFINITION TEXT');
         expect(output.toString()).toContain(`
  A.prototype.ngDoCheck = function() {
    //
  };
SOME DEFINITION TEXT
  return A;
`);
       });

    it('should error if the compiledClass is not valid', () => {
      const {renderer, host, sourceFile, program} = setup(PROGRAM);
      const output = new MagicString(PROGRAM.contents);

      const noIifeDeclaration =
          getDeclaration(program, sourceFile.fileName, 'NoIife', ts.isFunctionDeclaration);
      const mockNoIifeClass: any = {declaration: noIifeDeclaration, name: 'NoIife'};
      expect(() => renderer.addDefinitions(output, mockNoIifeClass, 'SOME DEFINITION TEXT'))
          .toThrowError(
              'Compiled class declaration is not inside an IIFE: NoIife in /some/file.js');

      const badIifeDeclaration =
          getDeclaration(program, sourceFile.fileName, 'BadIife', ts.isVariableDeclaration);
      const mockBadIifeClass: any = {declaration: badIifeDeclaration, name: 'BadIife'};
      expect(() => renderer.addDefinitions(output, mockBadIifeClass, 'SOME DEFINITION TEXT'))
          .toThrowError(
              'Compiled class wrapper IIFE does not have a return statement: BadIife in /some/file.js');
    });
  });


  describe('removeDecorators', () => {

    it('should delete the decorator (and following comma) that was matched in the analysis', () => {
      const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM);
      const output = new MagicString(PROGRAM.contents);
      const compiledClass =
          decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'A') !;
      const decorator = compiledClass.decorators[0];
      const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
      decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
      renderer.removeDecorators(output, decoratorsToRemove);
      expect(output.toString()).not.toContain(`{ type: Directive, args: [{ selector: '[a]' }] },`);
      expect(output.toString()).toContain(`{ type: OtherA }`);
      expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[b]' }] }`);
      expect(output.toString()).toContain(`{ type: OtherB }`);
      expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[c]' }] }`);
    });


    it('should delete the decorator (but cope with no trailing comma) that was matched in the analysis',
       () => {
         const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM);
         const output = new MagicString(PROGRAM.contents);
         const compiledClass =
             decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'B') !;
         const decorator = compiledClass.decorators[0];
         const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
         decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
         renderer.removeDecorators(output, decoratorsToRemove);
         expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[a]' }] },`);
         expect(output.toString()).toContain(`{ type: OtherA }`);
         expect(output.toString())
             .not.toContain(`{ type: Directive, args: [{ selector: '[b]' }] }`);
         expect(output.toString()).toContain(`{ type: OtherB }`);
         expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[c]' }] }`);
       });


    it('should delete the decorator (and its container if there are not other decorators left) that was matched in the analysis',
       () => {
         const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM);
         const output = new MagicString(PROGRAM.contents);
         const compiledClass =
             decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'C') !;
         const decorator = compiledClass.decorators[0];
         const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
         decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
         renderer.removeDecorators(output, decoratorsToRemove);
         renderer.addDefinitions(output, compiledClass, 'SOME DEFINITION TEXT');
         expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[a]' }] },`);
         expect(output.toString()).toContain(`{ type: OtherA }`);
         expect(output.toString()).toContain(`{ type: Directive, args: [{ selector: '[b]' }] }`);
         expect(output.toString()).toContain(`{ type: OtherB }`);
         expect(output.toString()).toContain(`function C() {}\nSOME DEFINITION TEXT\n  return C;`);
         expect(output.toString()).not.toContain(`C.decorators = [
  { type: Directive, args: [{ selector: '[c]' }] },
];`);
       });

  });

  describe('[__decorate declarations]', () => {
    it('should delete the decorator (and following comma) that was matched in the analysis', () => {
      const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM_DECORATE_HELPER);
      const output = new MagicString(PROGRAM_DECORATE_HELPER.contents);
      const compiledClass =
          decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'A') !;
      const decorator = compiledClass.decorators.find(d => d.name === 'Directive') !;
      const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
      decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
      renderer.removeDecorators(output, decoratorsToRemove);
      expect(output.toString()).not.toContain(`Directive({ selector: '[a]' }),`);
      expect(output.toString()).toContain(`OtherA()`);
      expect(output.toString()).toContain(`Directive({ selector: '[b]' })`);
      expect(output.toString()).toContain(`OtherB()`);
      expect(output.toString()).toContain(`Directive({ selector: '[c]' })`);
    });

    it('should delete the decorator (but cope with no trailing comma) that was matched in the analysis',
       () => {
         const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM_DECORATE_HELPER);
         const output = new MagicString(PROGRAM_DECORATE_HELPER.contents);
         const compiledClass =
             decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'B') !;
         const decorator = compiledClass.decorators.find(d => d.name === 'Directive') !;
         const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
         decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
         renderer.removeDecorators(output, decoratorsToRemove);
         expect(output.toString()).toContain(`Directive({ selector: '[a]' }),`);
         expect(output.toString()).toContain(`OtherA()`);
         expect(output.toString()).not.toContain(`Directive({ selector: '[b]' })`);
         expect(output.toString()).toContain(`OtherB()`);
         expect(output.toString()).toContain(`Directive({ selector: '[c]' })`);
       });


    it('should delete the decorator (and its container if there are no other decorators left) that was matched in the analysis',
       () => {
         const {renderer, decorationAnalyses, sourceFile} = setup(PROGRAM_DECORATE_HELPER);
         const output = new MagicString(PROGRAM_DECORATE_HELPER.contents);
         const compiledClass =
             decorationAnalyses.get(sourceFile) !.compiledClasses.find(c => c.name === 'C') !;
         const decorator = compiledClass.decorators.find(d => d.name === 'Directive') !;
         const decoratorsToRemove = new Map<ts.Node, ts.Node[]>();
         decoratorsToRemove.set(decorator.node.parent !, [decorator.node]);
         renderer.removeDecorators(output, decoratorsToRemove);
         expect(output.toString()).toContain(`Directive({ selector: '[a]' }),`);
         expect(output.toString()).toContain(`OtherA()`);
         expect(output.toString()).toContain(`Directive({ selector: '[b]' })`);
         expect(output.toString()).toContain(`OtherB()`);
         expect(output.toString()).not.toContain(`Directive({ selector: '[c]' })`);
         expect(output.toString()).not.toContain(`C = tslib_1.__decorate([`);
         expect(output.toString()).toContain(`function C() {\n    }\n    return C;`);
       });
  });
});
