/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {ClassMemberKind, Import, isNamedVariableDeclaration} from '../../../src/ngtsc/reflection';
import {Esm5ReflectionHost} from '../../src/host/esm5_host';
import {MockLogger} from '../helpers/mock_logger';
import {convertToDirectTsLibImport, getDeclaration, makeTestProgram} from '../helpers/utils';

import {expectTypeValueReferencesForParameters} from './util';

const FILES = [
  {
    name: '/some_directive.js',
    contents: `
  import * as tslib_1 from 'tslib';
  import { Directive, Inject, InjectionToken, Input } from '@angular/core';
  var INJECTED_TOKEN = new InjectionToken('injected');
  var ViewContainerRef = /** @class */ (function () {
      function ViewContainerRef() {
      }
      return ViewContainerRef;
  }());
  var TemplateRef = /** @class */ (function () {
      function TemplateRef() {
      }
      return TemplateRef;
  }());
  var SomeDirective = /** @class */ (function () {
      function SomeDirective(_viewContainer, _template, injected) {
          this.instanceProperty = 'instance';
          this.input1 = '';
          this.input2 = 0;
      }
      SomeDirective.prototype.instanceMethod = function () { };
      SomeDirective.staticMethod = function () { };
      SomeDirective.staticProperty = 'static';
      tslib_1.__decorate([
          Input(),
          tslib_1.__metadata("design:type", String)
      ], SomeDirective.prototype, "input1", void 0);
      tslib_1.__decorate([
          Input(),
          tslib_1.__metadata("design:type", Number)
      ], SomeDirective.prototype, "input2", void 0);
      SomeDirective = tslib_1.__decorate([
          Directive({ selector: '[someDirective]' }),
          tslib_1.__param(2, Inject(INJECTED_TOKEN)),
          tslib_1.__metadata("design:paramtypes", [ViewContainerRef,
              TemplateRef, String])
      ], SomeDirective);
      return SomeDirective;
  }());
  export { SomeDirective };
  `,
  },
  {
    name: '/node_modules/@angular/core/some_directive.js',
    contents: `
  import * as tslib_1 from 'tslib';
  import { Directive, Input } from './directives';
  var SomeDirective = /** @class */ (function () {
    function SomeDirective() {
        this.input1 = '';
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SomeDirective.prototype, "input1", void 0);
    SomeDirective = tslib_1.__decorate([
        Directive({ selector: '[someDirective]' }),
    ], SomeDirective);
    return SomeDirective;
}());
export { SomeDirective };
`,
  },
  {
    name: '/ngmodule.js',
    contents: `
    import * as tslib_1 from 'tslib';
    import { NgModule } from '@angular/core';
      var HttpClientXsrfModule = /** @class */ (function () {
        function HttpClientXsrfModule() {
        }
        HttpClientXsrfModule_1 = HttpClientXsrfModule;
        HttpClientXsrfModule.withOptions = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: HttpClientXsrfModule_1,
                providers: [],
            };
        };
        var HttpClientXsrfModule_1;
        HttpClientXsrfModule = HttpClientXsrfModule_1 = tslib_1.__decorate([
            NgModule({
                providers: [],
            })
        ], HttpClientXsrfModule);
        return HttpClientXsrfModule;
    }());
    var missingValue;
    var nonDecoratedVar;
    nonDecoratedVar = 43;
    export { HttpClientXsrfModule };
    `
  },
];

describe('Esm5ReflectionHost [import helper style]', () => {
  [{files: FILES, label: 'namespaced'},
   {files: convertToDirectTsLibImport(FILES), label: 'direct import'},
  ].forEach(fileSystem => {
    describe(`[${fileSystem.label}]`, () => {

      describe('getDecoratorsOfDeclaration()', () => {
        it('should find the decorators on a class', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const decorators = host.getDecoratorsOfDeclaration(classNode) !;

          expect(decorators).toBeDefined();
          expect(decorators.length).toEqual(1);

          const decorator = decorators[0];
          expect(decorator.name).toEqual('Directive');
          expect(decorator.import).toEqual({name: 'Directive', from: '@angular/core'});
          expect(decorator.args !.map(arg => arg.getText())).toEqual([
            '{ selector: \'[someDirective]\' }',
          ]);
        });

        it('should use `getImportOfIdentifier()` to retrieve import info', () => {
          const spy = spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier')
                          .and.callFake(
                              (identifier: ts.Identifier) => identifier.getText() === 'Directive' ?
                                  {from: '@angular/core', name: 'Directive'} :
                                  {});

          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);

          const decorators = host.getDecoratorsOfDeclaration(classNode) !;

          expect(decorators.length).toEqual(1);
          expect(decorators[0].import).toEqual({from: '@angular/core', name: 'Directive'});

          const identifiers = spy.calls.all().map(call => (call.args[0] as ts.Identifier).text);
          expect(identifiers.some(identifier => identifier === 'Directive')).toBeTruthy();
        });

        it('should support decorators being used inside @angular/core', () => {
          const program = makeTestProgram(fileSystem.files[1]);
          const host = new Esm5ReflectionHost(new MockLogger(), true, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/node_modules/@angular/core/some_directive.js', 'SomeDirective',
              isNamedVariableDeclaration);
          const decorators = host.getDecoratorsOfDeclaration(classNode) !;

          expect(decorators).toBeDefined();
          expect(decorators.length).toEqual(1);

          const decorator = decorators[0];
          expect(decorator.name).toEqual('Directive');
          expect(decorator.import).toEqual({name: 'Directive', from: './directives'});
          expect(decorator.args !.map(arg => arg.getText())).toEqual([
            '{ selector: \'[someDirective]\' }',
          ]);
        });
      });

      describe('getMembersOfClass()', () => {
        it('should find decorated members on a class', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const members = host.getMembersOfClass(classNode);

          const input1 = members.find(member => member.name === 'input1') !;
          expect(input1.kind).toEqual(ClassMemberKind.Property);
          expect(input1.isStatic).toEqual(false);
          expect(input1.decorators !.map(d => d.name)).toEqual(['Input']);

          const input2 = members.find(member => member.name === 'input2') !;
          expect(input2.kind).toEqual(ClassMemberKind.Property);
          expect(input2.isStatic).toEqual(false);
          expect(input1.decorators !.map(d => d.name)).toEqual(['Input']);
        });

        it('should find non decorated properties on a class', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const members = host.getMembersOfClass(classNode);

          const instanceProperty = members.find(member => member.name === 'instanceProperty') !;
          expect(instanceProperty.kind).toEqual(ClassMemberKind.Property);
          expect(instanceProperty.isStatic).toEqual(false);
          expect(ts.isBinaryExpression(instanceProperty.implementation !)).toEqual(true);
          expect(instanceProperty.value !.getText()).toEqual(`'instance'`);
        });

        it('should find static methods on a class', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const members = host.getMembersOfClass(classNode);

          const staticMethod = members.find(member => member.name === 'staticMethod') !;
          expect(staticMethod.kind).toEqual(ClassMemberKind.Method);
          expect(staticMethod.isStatic).toEqual(true);
          expect(ts.isFunctionExpression(staticMethod.implementation !)).toEqual(true);
        });

        it('should find static properties on a class', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const members = host.getMembersOfClass(classNode);

          const staticProperty = members.find(member => member.name === 'staticProperty') !;
          expect(staticProperty.kind).toEqual(ClassMemberKind.Property);
          expect(staticProperty.isStatic).toEqual(true);
          expect(ts.isPropertyAccessExpression(staticProperty.implementation !)).toEqual(true);
          expect(staticProperty.value !.getText()).toEqual(`'static'`);
        });

        it('should use `getImportOfIdentifier()` to retrieve import info', () => {
          const spy =
              spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier').and.returnValue({});

          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);

          host.getMembersOfClass(classNode);
          const identifiers = spy.calls.all().map(call => (call.args[0] as ts.Identifier).text);
          expect(identifiers.some(identifier => identifier === 'Input')).toBeTruthy();
        });

        it('should support decorators being used inside @angular/core', () => {
          const program = makeTestProgram(fileSystem.files[1]);
          const host = new Esm5ReflectionHost(new MockLogger(), true, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/node_modules/@angular/core/some_directive.js', 'SomeDirective',
              isNamedVariableDeclaration);
          const members = host.getMembersOfClass(classNode);

          const input1 = members.find(member => member.name === 'input1') !;
          expect(input1.kind).toEqual(ClassMemberKind.Property);
          expect(input1.isStatic).toEqual(false);
          expect(input1.decorators !.map(d => d.name)).toEqual(['Input']);
        });
      });

      describe('getConstructorParameters', () => {
        it('should find the decorated constructor parameters', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const parameters = host.getConstructorParameters(classNode);

          expect(parameters).toBeDefined();
          expect(parameters !.map(parameter => parameter.name)).toEqual([
            '_viewContainer', '_template', 'injected'
          ]);
          expectTypeValueReferencesForParameters(parameters !, [
            'ViewContainerRef',
            'TemplateRef',
            'String',
          ]);
        });

        describe('(returned parameters `decorators`)', () => {
          it('should use `getImportOfIdentifier()` to retrieve import info', () => {
            const mockImportInfo = {} as Import;
            const spy = spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier')
                            .and.returnValue(mockImportInfo);

            const program = makeTestProgram(fileSystem.files[0]);
            const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
            const classNode = getDeclaration(
                program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
            const parameters = host.getConstructorParameters(classNode);
            const decorators = parameters ![2].decorators !;

            expect(decorators.length).toEqual(1);
            expect(decorators[0].import).toBe(mockImportInfo);

            const typeIdentifier = spy.calls.mostRecent().args[0] as ts.Identifier;
            expect(typeIdentifier.text).toBe('Inject');
          });
        });
      });

      describe('findDecoratedClasses', () => {
        it('should return an array of all decorated classes in the given source file', () => {
          const program = makeTestProgram(...fileSystem.files);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());

          const ngModuleFile = program.getSourceFile('/ngmodule.js') !;
          const ngModuleClasses = host.findDecoratedClasses(ngModuleFile);
          expect(ngModuleClasses.length).toEqual(1);
          const ngModuleClass = ngModuleClasses.find(c => c.name === 'HttpClientXsrfModule') !;
          expect(ngModuleClass.decorators.map(decorator => decorator.name)).toEqual(['NgModule']);

          const someDirectiveFile = program.getSourceFile('/some_directive.js') !;
          const someDirectiveClasses = host.findDecoratedClasses(someDirectiveFile);
          expect(someDirectiveClasses.length).toEqual(1);
          const someDirectiveClass = someDirectiveClasses.find(c => c.name === 'SomeDirective') !;
          expect(someDirectiveClass.decorators.map(decorator => decorator.name)).toEqual([
            'Directive'
          ]);
        });
      });

      describe('getDeclarationOfIdentifier', () => {
        it('should return the declaration of a locally defined identifier', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const ctrDecorators = host.getConstructorParameters(classNode) !;
          const identifierOfViewContainerRef = (ctrDecorators[0].typeValueReference !as{
                                                 local: true,
                                                 expression: ts.Identifier,
                                                 defaultImportStatement: null,
                                               }).expression;

          const expectedDeclarationNode = getDeclaration(
              program, '/some_directive.js', 'ViewContainerRef', isNamedVariableDeclaration);
          const actualDeclaration = host.getDeclarationOfIdentifier(identifierOfViewContainerRef);
          expect(actualDeclaration).not.toBe(null);
          expect(actualDeclaration !.node).toBe(expectedDeclarationNode);
          expect(actualDeclaration !.viaModule).toBe(null);
        });

        it('should return the declaration of an externally defined identifier', () => {
          const program = makeTestProgram(fileSystem.files[0]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const classNode = getDeclaration(
              program, '/some_directive.js', 'SomeDirective', isNamedVariableDeclaration);
          const classDecorators = host.getDecoratorsOfDeclaration(classNode) !;
          const decoratorNode = classDecorators[0].node;

          const identifierOfDirective =
              ts.isCallExpression(decoratorNode) && ts.isIdentifier(decoratorNode.expression) ?
              decoratorNode.expression :
              null;

          const expectedDeclarationNode = getDeclaration(
              program, 'node_modules/@angular/core/index.ts', 'Directive',
              isNamedVariableDeclaration);
          const actualDeclaration = host.getDeclarationOfIdentifier(identifierOfDirective !);
          expect(actualDeclaration).not.toBe(null);
          expect(actualDeclaration !.node).toBe(expectedDeclarationNode);
          expect(actualDeclaration !.viaModule).toBe('@angular/core');
        });

        it('should find the "actual" declaration of an aliased variable identifier', () => {
          const program = makeTestProgram(fileSystem.files[2]);
          const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
          const ngModuleRef = findIdentifier(
              program.getSourceFile(fileSystem.files[2].name) !, 'HttpClientXsrfModule_1',
              isNgModulePropertyAssignment);

          const declaration = host.getDeclarationOfIdentifier(ngModuleRef !);
          expect(declaration).not.toBe(null);
          expect(declaration !.node.getText()).toContain('function HttpClientXsrfModule()');
        });
      });
    });

    describe('getVariableValue', () => {
      it('should find the "actual" declaration of an aliased variable identifier', () => {
        const program = makeTestProgram(fileSystem.files[2]);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const ngModuleRef = findVariableDeclaration(
            program.getSourceFile(fileSystem.files[2].name) !, 'HttpClientXsrfModule_1');

        const value = host.getVariableValue(ngModuleRef !);
        expect(value).not.toBe(null);
        if (!value || !ts.isFunctionDeclaration(value.parent)) {
          throw new Error(
              `Expected result to be a function declaration: ${value && value.getText()}.`);
        }
        expect(value.getText()).toBe('HttpClientXsrfModule');
      });

      it('should return undefined if the variable has no assignment', () => {
        const program = makeTestProgram(fileSystem.files[2]);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const missingValue = findVariableDeclaration(
            program.getSourceFile(fileSystem.files[2].name) !, 'missingValue');
        const value = host.getVariableValue(missingValue !);
        expect(value).toBe(null);
      });

      it('should return null if the variable is not assigned from a call to __decorate', () => {
        const program = makeTestProgram(fileSystem.files[2]);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const nonDecoratedVar = findVariableDeclaration(
            program.getSourceFile(fileSystem.files[2].name) !, 'nonDecoratedVar');
        const value = host.getVariableValue(nonDecoratedVar !);
        expect(value).toBe(null);
      });
    });
  });

  function findVariableDeclaration(
      node: ts.Node | undefined, variableName: string): ts.VariableDeclaration|undefined {
    if (!node) {
      return;
    }
    if (isNamedVariableDeclaration(node) && node.name.text === variableName) {
      return node;
    }
    return node.forEachChild(node => findVariableDeclaration(node, variableName));
  }
});

function findIdentifier(
    node: ts.Node | undefined, identifierName: string,
    requireFn: (node: ts.Identifier) => boolean): ts.Identifier|undefined {
  if (!node) {
    return undefined;
  }
  if (ts.isIdentifier(node) && node.text === identifierName && requireFn(node)) {
    return node;
  }
  return node.forEachChild(node => findIdentifier(node, identifierName, requireFn));
}

function isNgModulePropertyAssignment(identifier: ts.Identifier): boolean {
  return ts.isPropertyAssignment(identifier.parent) &&
      identifier.parent.name.getText() === 'ngModule';
}
