/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {ClassMemberKind, Decorator, Import, isNamedClassDeclaration, isNamedFunctionDeclaration, isNamedVariableDeclaration} from '../../../src/ngtsc/reflection';
import {Esm2015ReflectionHost} from '../../src/host/esm2015_host';
import {Esm5ReflectionHost, getIifeBody} from '../../src/host/esm5_host';
import {MockLogger} from '../helpers/mock_logger';
import {getDeclaration, makeTestBundleProgram, makeTestProgram} from '../helpers/utils';

import {expectTypeValueReferencesForParameters} from './util';

const SOME_DIRECTIVE_FILE = {
  name: '/some_directive.js',
  contents: `
    import { Directive, Inject, InjectionToken, Input } from '@angular/core';

    var INJECTED_TOKEN = new InjectionToken('injected');
    var ViewContainerRef = {};
    var TemplateRef = {};

    var SomeDirective = (function() {
      function SomeDirective(_viewContainer, _template, injected) {
        this.instanceProperty = 'instance';
      }
      SomeDirective.prototype = {
        instanceMethod: function() {},
      };
      SomeDirective.staticMethod = function() {};
      SomeDirective.staticProperty = 'static';
      SomeDirective.decorators = [
        { type: Directive, args: [{ selector: '[someDirective]' },] }
      ];
      SomeDirective.ctorParameters = function() { return [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: undefined, decorators: [{ type: Inject, args: [INJECTED_TOKEN,] },] },
      ]; };
      SomeDirective.propDecorators = {
        "input1": [{ type: Input },],
        "input2": [{ type: Input },],
      };
      return SomeDirective;
    }());
  `,
};
const ACCESSORS_FILE = {
  name: '/accessors.js',
  contents: `
    import { Directive, Input, Output } from '@angular/core';

    var SomeDirective = (function() {
      function SomeDirective() {
      }
      Object.defineProperty(SomeDirective.prototype, "setter", {
          set: function (value) { this.value = value; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SomeDirective.prototype, "getter", {
          get: function () { return null; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SomeDirective.prototype, "setterAndGetter", {
          get: function () { return null; },
          set: function (value) { this.value = value; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SomeDirective, "staticSetter", {
          set: function (value) { this.value = value; },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SomeDirective.prototype, "none", {
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(SomeDirective.prototype, "incomplete");
      SomeDirective.decorators = [
        { type: Directive, args: [{ selector: '[someDirective]' },] }
      ];
      SomeDirective.propDecorators = {
        "setter": [{ type: Input },],
        "getter": [{ type: Output },],
        "setterAndGetter": [{ type: Input },],
      };
      return SomeDirective;
    }());
  `,
};

const SIMPLE_ES2015_CLASS_FILE = {
  name: '/simple_es2015_class.d.ts',
  contents: `
    export class EmptyClass {}
  `,
};

const SIMPLE_CLASS_FILE = {
  name: '/simple_class.js',
  contents: `
    var EmptyClass = (function() {
      function EmptyClass() {
      }
      return EmptyClass;
    }());
    var NoDecoratorConstructorClass = (function() {
      function NoDecoratorConstructorClass(foo) {
      }
      return NoDecoratorConstructorClass;
    }());
  `,
};

const FOO_FUNCTION_FILE = {
  name: '/foo_function.js',
  contents: `
    import { Directive } from '@angular/core';

    function foo() {}
    foo.decorators = [
      { type: Directive, args: [{ selector: '[ignored]' },] }
    ];
  `,
};

const INVALID_DECORATORS_FILE = {
  name: '/invalid_decorators.js',
  contents: `
    import { Directive } from '@angular/core';
    var NotArrayLiteral = (function() {
      function NotArrayLiteral() {
      }
      NotArrayLiteral.decorators = () => [
        { type: Directive, args: [{ selector: '[ignored]' },] },
      ];
      return NotArrayLiteral;
    }());

    var NotObjectLiteral = (function() {
      function NotObjectLiteral() {
      }
      NotObjectLiteral.decorators = [
        "This is not an object literal",
        { type: Directive },
      ];
      return NotObjectLiteral;
    }());

    var NoTypeProperty = (function() {
      function NoTypeProperty() {
      }
      NoTypeProperty.decorators = [
        { notType: Directive },
        { type: Directive },
      ];
      return NoTypeProperty;
    }());

    var NotIdentifier = (function() {
      function NotIdentifier() {
      }
      NotIdentifier.decorators = [
        { type: 'StringsLiteralsAreNotIdentifiers' },
        { type: Directive },
      ];
      return NotIdentifier;
    }());
  `,
};

const INVALID_DECORATOR_ARGS_FILE = {
  name: '/invalid_decorator_args.js',
  contents: `
    import { Directive } from '@angular/core';
    var NoArgsProperty = (function() {
      function NoArgsProperty() {
      }
      NoArgsProperty.decorators = [
        { type: Directive },
      ];
      return NoArgsProperty;
    }());

    var args = [{ selector: '[ignored]' },];
    var NoPropertyAssignment = (function() {
      function NoPropertyAssignment() {
      }
      NoPropertyAssignment.decorators = [
        { type: Directive, args },
      ];
      return NoPropertyAssignment;
    }());

    var NotArrayLiteral = (function() {
      function NotArrayLiteral() {
      }
      NotArrayLiteral.decorators = [
        { type: Directive, args: () => [{ selector: '[ignored]' },] },
      ];
      return NotArrayLiteral;
    }());
    `,
};

const INVALID_PROP_DECORATORS_FILE = {
  name: '/invalid_prop_decorators.js',
  contents: `
    import { Input } from '@angular/core';
    var NotObjectLiteral = (function() {
      function NotObjectLiteral() {
      }
      NotObjectLiteral.propDecorators = () => ({
        "prop": [{ type: Input },]
      });
      return NotObjectLiteral;
    }());

    var NotObjectLiteralProp = (function() {
      function NotObjectLiteralProp() {
      }
      NotObjectLiteralProp.propDecorators = {
        "prop": [
          "This is not an object literal",
          { type: Input },
        ]
      };
      return NotObjectLiteralProp;
    }());

    var NoTypeProperty = (function() {
      function NoTypeProperty() {
      }
      NoTypeProperty.propDecorators = {
        "prop": [
          { notType: Input },
          { type: Input },
        ]
      };
      return NoTypeProperty;
    }());

    var NotIdentifier = (function() {
      function NotIdentifier() {
      }
      NotIdentifier.propDecorators = {
        "prop": [
          { type: 'StringsLiteralsAreNotIdentifiers' },
          { type: Input },
        ]
      };
      return NotIdentifier;
    }());
    `,
};

const INVALID_PROP_DECORATOR_ARGS_FILE = {
  name: '/invalid_prop_decorator_args.js',
  contents: `
    import { Input } from '@angular/core';
    var NoArgsProperty = (function() {
      function NoArgsProperty() {
      }
      NoArgsProperty.propDecorators = {
        "prop": [{ type: Input },]
      };
      return NoArgsProperty;
    }());

    var args = [{ selector: '[ignored]' },];
    var NoPropertyAssignment = (function() {
      function NoPropertyAssignment() {
      }
      NoPropertyAssignment.propDecorators = {
        "prop": [{ type: Input, args },]
      };
      return NoPropertyAssignment;
    }());

    var NotArrayLiteral = (function() {
      function NotArrayLiteral() {
      }
      NotArrayLiteral.propDecorators = {
        "prop": [{ type: Input, args: () => [{ selector: '[ignored]' },] },],
      };
      return NotArrayLiteral;
    }());
    `,
};

const INVALID_CTOR_DECORATORS_FILE = {
  name: '/invalid_ctor_decorators.js',
  contents: `
    import { Inject } from '@angular/core';
    var NoParametersDecorator = {};
    var NoParameters = (function() {
      function NoParameters() {}
      return NoParameters;
    }());

    var ArrowFunction = (function() {
      function ArrowFunction(arg1) {
      }
      ArrowFunction.ctorParameters = () => [
        { type: 'ParamType', decorators: [{ type: Inject },] }
      ];
      return ArrowFunction;
    }());

    var NotArrayLiteral = (function() {
      function NotArrayLiteral(arg1) {
      }
      NotArrayLiteral.ctorParameters = function() { return 'StringsAreNotArrayLiterals'; };
      return NotArrayLiteral;
    }());

    var NotObjectLiteral = (function() {
      function NotObjectLiteral(arg1, arg2) {
      }
      NotObjectLiteral.ctorParameters = function() { return [
        "This is not an object literal",
        { type: 'ParamType', decorators: [{ type: Inject },] },
      ]; };
      return NotObjectLiteral;
    }());

    var NoTypeProperty = (function() {
      function NoTypeProperty(arg1, arg2) {
      }
      NoTypeProperty.ctorParameters = function() { return [
        {
          type: 'ParamType',
          decorators: [
            { notType: Inject },
            { type: Inject },
          ]
        },
      ]; };
      return NoTypeProperty;
    }());

    var NotIdentifier = (function() {
      function NotIdentifier(arg1, arg2) {
      }
      NotIdentifier.ctorParameters = function() { return [
        {
          type: 'ParamType',
          decorators: [
            { type: 'StringsLiteralsAreNotIdentifiers' },
            { type: Inject },
          ]
        },
      ]; };
      return NotIdentifier;
    }());
    `,
};

const INVALID_CTOR_DECORATOR_ARGS_FILE = {
  name: '/invalid_ctor_decorator_args.js',
  contents: `
    import { Inject } from '@angular/core';
    var NoArgsProperty = (function() {
      function NoArgsProperty(arg1) {
      }
      NoArgsProperty.ctorParameters = function() { return [
        { type: 'ParamType', decorators: [{ type: Inject },] },
      ]; };
      return NoArgsProperty;
    }());

    var args = [{ selector: '[ignored]' },];
    var NoPropertyAssignment = (function() {
      function NoPropertyAssignment(arg1) {
      }
      NoPropertyAssignment.ctorParameters = function() { return [
        { type: 'ParamType', decorators: [{ type: Inject, args },] },
      ]; };
      return NoPropertyAssignment;
    }());

    var NotArrayLiteral = (function() {
      function NotArrayLiteral(arg1) {
      }
      NotArrayLiteral.ctorParameters = function() { return [
        { type: 'ParamType', decorators: [{ type: Inject, args: () => [{ selector: '[ignored]' },] },] },
      ]; };
      return NotArrayLiteral;
    }());
    `,
};

const IMPORTS_FILES = [
  {
    name: '/a.js',
    contents: `
      export const a = 'a';
    `,
  },
  {
    name: '/b.js',
    contents: `
      import {a} from './a.js';
      import {a as foo} from './a.js';

      var b = a;
      var c = foo;
      var d = b;
    `,
  },
];

const EXPORTS_FILES = [
  {
    name: '/a.js',
    contents: `
      export const a = 'a';
    `,
  },
  {
    name: '/b.js',
    contents: `
      import {Directive} from '@angular/core';
      import {a} from './a';
      import {a as foo} from './a';
      export {Directive} from '@angular/core';
      export {a} from './a';
      export var b = a;
      export var c = foo;
      export var d = b;
      export var e = 'e';
      export var DirectiveX = Directive;
      export var SomeClass = (function() {
        function SomeClass() {}
        return SomeClass;
      }());
    `,
  },
];

const FUNCTION_BODY_FILE = {
  name: '/function_body.js',
  contents: `
    function foo(x) {
      return x;
    }
    function bar(x, y) {
      if (y === void 0) { y = 42; }
      return x + y;
    }
    function complex() {
      var x = 42;
      return 42;
    }
    function baz(x) {
      var y;
      if (x === void 0) { y = 42; }
      return y;
    }
    var y;
    function qux(x) {
      if (x === void 0) { y = 42; }
      return y;
    }
    function moo() {
      var x;
      if (x === void 0) { x = 42; }
      return x;
    }
    var x;
    function juu() {
      if (x === void 0) { x = 42; }
      return x;
    }
  `
};

const DECORATED_FILES = [
  {
    name: '/primary.js',
    contents: `
    import {Directive} from '@angular/core';
    import { D } from '/secondary';
    var A = (function() {
      function A() {}
      A.decorators = [
        { type: Directive, args: [{ selector: '[a]' }] }
      ];
      return A;
    }());
     var B = (function() {
      function B() {}
      B.decorators = [
        { type: Directive, args: [{ selector: '[b]' }] }
      ];
      return B;
    }());
     function x() {}
     function y() {}
     var C = (function() {
      function C() {}
      return C;
    });
    export { A, x, C };
    `
  },
  {
    name: '/secondary.js',
    contents: `
    import {Directive} from '@angular/core';
    var D = (function() {
      function D() {}
      D.decorators = [
        { type: Directive, args: [{ selector: '[d]' }] }
      ];
      return D;
    }());
    export { D };
    `
  }
];

const UNWANTED_PROTOTYPE_EXPORT_FILE = {
  name: '/library.d.ts',
  contents: `
    export declare class SomeParam {
      someInstanceMethod(): void;
      static someStaticProp: any;
    }`
};

const TYPINGS_SRC_FILES = [
  {
    name: '/src/index.js',
    contents:
        `import {InternalClass} from './internal'; export * from './class1'; export * from './class2';`
  },
  {
    name: '/src/class1.js',
    contents: `
        var Class1 = (function() {
          function Class1() {}
          return Class1;
        }());
        var MissingClass1 = (function() {
          function MissingClass1() {}
          return MissingClass1;
        }());
        export {Class1, MissingClass1};
        `
  },
  {
    name: '/src/class2.js',
    contents: `
        var Class2 = (function() {
          function Class2() {}
          return Class2;
        }());
        export {Class2};
      `
  },
  {name: '/src/func1.js', contents: 'function mooFn() {} export {mooFn}'}, {
    name: '/src/internal.js',
    contents: `
        var InternalClass = (function() {
          function InternalClass() {}
          return InternalClass;
        }());
        var Class2 = (function() {
          function Class2() {}
          return Class2;
        }());
        export {InternalClass, Class2};
      `
  },
  {
    name: '/src/missing-class.js',
    contents: `
        var MissingClass2 = (function() {
          function MissingClass2() {}
          return MissingClass2;
        }());
        export {MissingClass2};
      `
  },
  {
    name: '/src/flat-file.js',
    contents: `
        var Class1 = (function() {
          function Class1() {}
          return Class1;
        }());
        var MissingClass1 = (function() {
          function MissingClass1() {}
          return MissingClass1;
        }());
        var MissingClass2 = (function() {
          function MissingClass2() {}
          return MissingClass2;
        }());
        var Class3 = (function() {
          function Class3() {}
          return Class3;
        }());
        export {Class1, Class3 as xClass3, MissingClass1, MissingClass2};
      `
  }
];

const TYPINGS_DTS_FILES = [
  {
    name: '/typings/index.d.ts',
    contents:
        `import {InternalClass} from './internal'; export * from './class1'; export * from './class2';`
  },
  {
    name: '/typings/class1.d.ts',
    contents: `export declare class Class1 {}\nexport declare class OtherClass {}`
  },
  {
    name: '/typings/class2.d.ts',
    contents:
        `export declare class Class2 {}\nexport declare interface SomeInterface {}\nexport {Class3 as xClass3} from './class3';`
  },
  {name: '/typings/func1.d.ts', contents: 'export declare function mooFn(): void;'},
  {
    name: '/typings/internal.d.ts',
    contents: `export declare class InternalClass {}\nexport declare class Class2 {}`
  },
  {name: '/typings/class3.d.ts', contents: `export declare class Class3 {}`},
];

const MODULE_WITH_PROVIDERS_PROGRAM = [
  {
    name: '/src/functions.js',
    contents: `
    import {ExternalModule} from './module';

    var SomeService = (function() {
      function SomeService() {}
      return SomeService;
    }());

    var InternalModule = (function() {
      function InternalModule() {}
      return InternalModule;
    }());
    export function aNumber() { return 42; }
    export function aString() { return 'foo'; }
    export function emptyObject() { return {}; }
    export function ngModuleIdentifier() { return { ngModule: InternalModule }; }
    export function ngModuleWithEmptyProviders() { return { ngModule: InternalModule, providers: [] }; }
    export function ngModuleWithProviders() { return { ngModule: InternalModule, providers: [SomeService] }; }
    export function onlyProviders() { return { providers: [SomeService] }; }
    export function ngModuleNumber() { return { ngModule: 42 }; }
    export function ngModuleString() { return { ngModule: 'foo' }; }
    export function ngModuleObject() { return { ngModule: { foo: 42 } }; }
    export function externalNgModule() { return { ngModule: ExternalModule }; }
    export {SomeService, InternalModule};
    `
  },
  {
    name: '/src/methods.js',
    contents: `
    import {ExternalModule} from './module';
    var SomeService = (function() {
      function SomeService() {}
      return SomeService;
    }());

    var InternalModule = (function() {
      function InternalModule() {}
      InternalModule.prototype = {
        instanceNgModuleIdentifier: function() { return { ngModule: InternalModule }; },
        instanceNgModuleWithEmptyProviders: function() { return { ngModule: InternalModule, providers: [] }; },
        instanceNgModuleWithProviders: function() { return { ngModule: InternalModule, providers: [SomeService] }; },
        instanceExternalNgModule: function() { return { ngModule: ExternalModule }; },
      };
      InternalModule.aNumber = function() { return 42; };
      InternalModule.aString = function() { return 'foo'; };
      InternalModule.emptyObject = function() { return {}; };
      InternalModule.ngModuleIdentifier = function() { return { ngModule: InternalModule }; };
      InternalModule.ngModuleWithEmptyProviders = function() { return { ngModule: InternalModule, providers: [] }; };
      InternalModule.ngModuleWithProviders = function() { return { ngModule: InternalModule, providers: [SomeService] }; };
      InternalModule.onlyProviders = function() { return { providers: [SomeService] }; };
      InternalModule.ngModuleNumber = function() { return { ngModule: 42 }; };
      InternalModule.ngModuleString = function() { return { ngModule: 'foo' }; };
      InternalModule.ngModuleObject = function() { return { ngModule: { foo: 42 } }; };
      InternalModule.externalNgModule = function() { return { ngModule: ExternalModule }; };
      return InternalModule;
    }());
    export {SomeService, InternalModule};
    `
  },
  {
    name: '/src/aliased_class.js',
    contents: `
    var AliasedModule = (function() {
      function AliasedModule() {}
      AliasedModule_1 = AliasedModule;
      AliasedModule.forRoot = function() { return { ngModule: AliasedModule_1 }; };
      var AliasedModule_1;
      return AliasedModule;
    }());
    export { AliasedModule };
    `
  },
  {name: '/src/module.js', contents: 'export class ExternalModule {}'},
];

describe('Esm5ReflectionHost', () => {

  describe('getDecoratorsOfDeclaration()', () => {
    it('should find the decorators on a class', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
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

    it('should return null if the symbol is not a class', () => {
      const program = makeTestProgram(FOO_FUNCTION_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const functionNode =
          getDeclaration(program, FOO_FUNCTION_FILE.name, 'foo', isNamedFunctionDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(functionNode);
      expect(decorators).toBe(null);
    });

    it('should return null if there are no decorators', () => {
      const program = makeTestProgram(SIMPLE_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode =
          getDeclaration(program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode);
      expect(decorators).toBe(null);
    });

    it('should ignore `decorators` if it is not an array literal', () => {
      const program = makeTestProgram(INVALID_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_DECORATORS_FILE.name, 'NotArrayLiteral', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode);
      expect(decorators).toEqual([]);
    });

    it('should ignore decorator elements that are not object literals', () => {
      const program = makeTestProgram(INVALID_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_DECORATORS_FILE.name, 'NotObjectLiteral', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode) !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining<Decorator>({name: 'Directive'}));
    });

    it('should ignore decorator elements that have no `type` property', () => {
      const program = makeTestProgram(INVALID_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_DECORATORS_FILE.name, 'NoTypeProperty', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode) !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Directive'}));
    });

    it('should ignore decorator elements whose `type` value is not an identifier', () => {
      const program = makeTestProgram(INVALID_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_DECORATORS_FILE.name, 'NotIdentifier', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode) !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Directive'}));
    });

    it('should use `getImportOfIdentifier()` to retrieve import info', () => {
      const mockImportInfo = { name: 'mock', from: '@angular/core' } as Import;
      const spy = spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier')
                      .and.returnValue(mockImportInfo);

      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const decorators = host.getDecoratorsOfDeclaration(classNode) !;

      expect(decorators.length).toEqual(1);
      expect(decorators[0].import).toBe(mockImportInfo);

      const typeIdentifier = spy.calls.mostRecent().args[0] as ts.Identifier;
      expect(typeIdentifier.text).toBe('Directive');
    });

    describe('(returned decorators `args`)', () => {
      it('should be an empty array if decorator has no `args` property', () => {
        const program = makeTestProgram(INVALID_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_DECORATOR_ARGS_FILE.name, 'NoArgsProperty',
            isNamedVariableDeclaration);
        const decorators = host.getDecoratorsOfDeclaration(classNode) !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Directive');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if decorator\'s `args` has no property assignment', () => {
        const program = makeTestProgram(INVALID_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_DECORATOR_ARGS_FILE.name, 'NoPropertyAssignment',
            isNamedVariableDeclaration);
        const decorators = host.getDecoratorsOfDeclaration(classNode) !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Directive');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if `args` property value is not an array literal', () => {
        const program = makeTestProgram(INVALID_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_DECORATOR_ARGS_FILE.name, 'NotArrayLiteral',
            isNamedVariableDeclaration);
        const decorators = host.getDecoratorsOfDeclaration(classNode) !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Directive');
        expect(decorators[0].args).toEqual([]);
      });
    });
  });

  describe('getMembersOfClass()', () => {
    it('should find decorated members on a class', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      const input1 = members.find(member => member.name === 'input1') !;
      expect(input1.kind).toEqual(ClassMemberKind.Property);
      expect(input1.isStatic).toEqual(false);
      expect(input1.decorators !.map(d => d.name)).toEqual(['Input']);

      const input2 = members.find(member => member.name === 'input2') !;
      expect(input2.kind).toEqual(ClassMemberKind.Property);
      expect(input2.isStatic).toEqual(false);
      expect(input2.decorators !.map(d => d.name)).toEqual(['Input']);
    });

    it('should find Object.defineProperty members on a class', () => {
      const program = makeTestProgram(ACCESSORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode =
          getDeclaration(program, ACCESSORS_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      const setter = members.find(member => member.name === 'setter') !;
      expect(setter.kind).toEqual(ClassMemberKind.Setter);
      expect(setter.isStatic).toEqual(false);
      expect(setter.value).toBeNull();
      expect(setter.decorators !.map(d => d.name)).toEqual(['Input']);
      expect(ts.isFunctionExpression(setter.implementation !)).toEqual(true);
      expect((setter.implementation as ts.FunctionExpression).body.statements[0].getText())
          .toEqual('this.value = value;');

      const getter = members.find(member => member.name === 'getter') !;
      expect(getter.kind).toEqual(ClassMemberKind.Getter);
      expect(getter.isStatic).toEqual(false);
      expect(getter.value).toBeNull();
      expect(getter.decorators !.map(d => d.name)).toEqual(['Output']);
      expect(ts.isFunctionExpression(getter.implementation !)).toEqual(true);
      expect((getter.implementation as ts.FunctionExpression).body.statements[0].getText())
          .toEqual('return null;');

      const [combinedSetter, combinedGetter] =
          members.filter(member => member.name === 'setterAndGetter');
      expect(combinedSetter.kind).toEqual(ClassMemberKind.Setter);
      expect(combinedSetter.isStatic).toEqual(false);
      expect(combinedSetter.decorators !.map(d => d.name)).toEqual(['Input']);
      expect(combinedGetter.kind).toEqual(ClassMemberKind.Getter);
      expect(combinedGetter.isStatic).toEqual(false);
      expect(combinedGetter.decorators !.map(d => d.name)).toEqual([]);

      const staticSetter = members.find(member => member.name === 'staticSetter') !;
      expect(staticSetter.kind).toEqual(ClassMemberKind.Setter);
      expect(staticSetter.isStatic).toEqual(true);
      expect(staticSetter.value).toBeNull();
      expect(staticSetter.decorators !.map(d => d.name)).toEqual([]);

      const none = members.find(member => member.name === 'none');
      expect(none).toBeUndefined();

      const incomplete = members.find(member => member.name === 'incomplete');
      expect(incomplete).toBeUndefined();
    });

    it('should find non decorated properties on a class', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      const instanceProperty = members.find(member => member.name === 'instanceProperty') !;
      expect(instanceProperty.kind).toEqual(ClassMemberKind.Property);
      expect(instanceProperty.isStatic).toEqual(false);
      expect(ts.isBinaryExpression(instanceProperty.implementation !)).toEqual(true);
      expect(instanceProperty.value !.getText()).toEqual(`'instance'`);
    });

    it('should find static methods on a class', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      const staticMethod = members.find(member => member.name === 'staticMethod') !;
      expect(staticMethod.kind).toEqual(ClassMemberKind.Method);
      expect(staticMethod.isStatic).toEqual(true);
      expect(staticMethod.value).toBeNull();
      expect(ts.isFunctionExpression(staticMethod.implementation !)).toEqual(true);
    });

    it('should find static properties on a class', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      const staticProperty = members.find(member => member.name === 'staticProperty') !;
      expect(staticProperty.kind).toEqual(ClassMemberKind.Property);
      expect(staticProperty.isStatic).toEqual(true);
      expect(ts.isPropertyAccessExpression(staticProperty.implementation !)).toEqual(true);
      expect(staticProperty.value !.getText()).toEqual(`'static'`);
    });

    it('should throw if the symbol is not a class', () => {
      const program = makeTestProgram(FOO_FUNCTION_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const functionNode =
          getDeclaration(program, FOO_FUNCTION_FILE.name, 'foo', isNamedFunctionDeclaration);
      expect(() => {
        host.getMembersOfClass(functionNode);
      }).toThrowError(`Attempted to get members of a non-class: "function foo() {}"`);
    });

    it('should return an empty array if there are no prop decorators', () => {
      const program = makeTestProgram(SIMPLE_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode =
          getDeclaration(program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      expect(members).toEqual([]);
    });

    it('should not process decorated properties in `propDecorators` if it is not an object literal',
       () => {
         const program = makeTestProgram(INVALID_PROP_DECORATORS_FILE);
         const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
         const classNode = getDeclaration(
             program, INVALID_PROP_DECORATORS_FILE.name, 'NotObjectLiteral',
             isNamedVariableDeclaration);
         const members = host.getMembersOfClass(classNode);

         expect(members.map(member => member.name)).not.toContain('prop');
       });

    it('should ignore prop decorator elements that are not object literals', () => {
      const program = makeTestProgram(INVALID_PROP_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_PROP_DECORATORS_FILE.name, 'NotObjectLiteralProp',
          isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);
      const prop = members.find(m => m.name === 'prop') !;
      const decorators = prop.decorators !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Input'}));
    });

    it('should ignore prop decorator elements that have no `type` property', () => {
      const program = makeTestProgram(INVALID_PROP_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_PROP_DECORATORS_FILE.name, 'NoTypeProperty', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);
      const prop = members.find(m => m.name === 'prop') !;
      const decorators = prop.decorators !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Input'}));
    });

    it('should ignore prop decorator elements whose `type` value is not an identifier', () => {
      const program = makeTestProgram(INVALID_PROP_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_PROP_DECORATORS_FILE.name, 'NotIdentifier', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);
      const prop = members.find(m => m.name === 'prop') !;
      const decorators = prop.decorators !;

      expect(decorators.length).toBe(1);
      expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Input'}));
    });

    it('should use `getImportOfIdentifier()` to retrieve import info', () => {
      let callCount = 0;
      const spy = spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier').and.callFake(() => {
        callCount++;
        return {name: `name${callCount}`, from: `@angular/core`};
      });

      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const members = host.getMembersOfClass(classNode);

      expect(spy).toHaveBeenCalled();
      spy.calls.allArgs().forEach(arg => expect(arg[0].getText()).toEqual('Input'));

      const index = members.findIndex(member => member.name === 'input1');
      expect(members[index].decorators !.length).toBe(1);
      expect(members[index].decorators ![0].import).toEqual({name: 'name1', from: '@angular/core'});
    });

    describe('(returned prop decorators `args`)', () => {
      it('should be an empty array if prop decorator has no `args` property', () => {
        const program = makeTestProgram(INVALID_PROP_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_PROP_DECORATOR_ARGS_FILE.name, 'NoArgsProperty',
            isNamedVariableDeclaration);
        const members = host.getMembersOfClass(classNode);
        const prop = members.find(m => m.name === 'prop') !;
        const decorators = prop.decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Input');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if prop decorator\'s `args` has no property assignment', () => {
        const program = makeTestProgram(INVALID_PROP_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_PROP_DECORATOR_ARGS_FILE.name, 'NoPropertyAssignment',
            isNamedVariableDeclaration);
        const members = host.getMembersOfClass(classNode);
        const prop = members.find(m => m.name === 'prop') !;
        const decorators = prop.decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Input');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if `args` property value is not an array literal', () => {
        const program = makeTestProgram(INVALID_PROP_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_PROP_DECORATOR_ARGS_FILE.name, 'NotArrayLiteral',
            isNamedVariableDeclaration);
        const members = host.getMembersOfClass(classNode);
        const prop = members.find(m => m.name === 'prop') !;
        const decorators = prop.decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Input');
        expect(decorators[0].args).toEqual([]);
      });
    });

    it('should ignore the prototype pseudo-static property on class imported from typings files',
       () => {
         const program = makeTestProgram(UNWANTED_PROTOTYPE_EXPORT_FILE);
         const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
         const classNode = getDeclaration(
             program, UNWANTED_PROTOTYPE_EXPORT_FILE.name, 'SomeParam', isNamedClassDeclaration);
         const members = host.getMembersOfClass(classNode);
         expect(members.find(m => m.name === 'prototype')).toBeUndefined();
       });
  });

  describe('getConstructorParameters()', () => {
    it('should find the decorated constructor parameters', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const parameters = host.getConstructorParameters(classNode);

      expect(parameters).toBeDefined();
      expect(parameters !.map(parameter => parameter.name)).toEqual([
        '_viewContainer', '_template', 'injected'
      ]);
      expectTypeValueReferencesForParameters(parameters !, [
        'ViewContainerRef',
        'TemplateRef',
        null,
      ]);
    });

    it('should throw if the symbol is not a class', () => {
      const program = makeTestProgram(FOO_FUNCTION_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const functionNode =
          getDeclaration(program, FOO_FUNCTION_FILE.name, 'foo', isNamedFunctionDeclaration);
      expect(() => { host.getConstructorParameters(functionNode); })
          .toThrowError(
              'Attempted to get constructor parameters of a non-class: "function foo() {}"');
    });

    // In ES5 there is no such thing as a constructor-less class
    // it('should return `null` if there is no constructor', () => { });

    it('should return an array even if there are no decorators', () => {
      const program = makeTestProgram(SIMPLE_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SIMPLE_CLASS_FILE.name, 'NoDecoratorConstructorClass',
          isNamedVariableDeclaration);
      const parameters = host.getConstructorParameters(classNode);

      expect(parameters).toEqual(jasmine.any(Array));
      expect(parameters !.length).toEqual(1);
      expect(parameters ![0].name).toEqual('foo');
      expect(parameters ![0].decorators).toBe(null);
    });

    it('should return an empty array if there are no constructor parameters', () => {
      const program = makeTestProgram(INVALID_CTOR_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_CTOR_DECORATORS_FILE.name, 'NoParameters', isNamedVariableDeclaration);
      const parameters = host.getConstructorParameters(classNode);

      expect(parameters).toEqual([]);
    });

    // In ES5 there are no arrow functions
    // it('should ignore `ctorParameters` if it is an arrow function', () => { });

    it('should ignore `ctorParameters` if it does not return an array literal', () => {
      const program = makeTestProgram(INVALID_CTOR_DECORATORS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, INVALID_CTOR_DECORATORS_FILE.name, 'NotArrayLiteral',
          isNamedVariableDeclaration);
      const parameters = host.getConstructorParameters(classNode);

      expect(parameters !.length).toBe(1);
      expect(parameters ![0]).toEqual(jasmine.objectContaining({
        name: 'arg1',
        decorators: null,
      }));
    });

    describe('(returned parameters `decorators`)', () => {
      it('should ignore param decorator elements that are not object literals', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATORS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATORS_FILE.name, 'NotObjectLiteral',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);

        expect(parameters !.length).toBe(2);
        expect(parameters ![0]).toEqual(jasmine.objectContaining({
          name: 'arg1',
          decorators: null,
        }));
        expect(parameters ![1]).toEqual(jasmine.objectContaining({
          name: 'arg2',
          decorators: jasmine.any(Array) as any
        }));
      });

      it('should ignore param decorator elements that have no `type` property', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATORS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATORS_FILE.name, 'NoTypeProperty',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        const decorators = parameters ![0].decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Inject'}));
      });

      it('should ignore param decorator elements whose `type` value is not an identifier', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATORS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATORS_FILE.name, 'NotIdentifier',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        const decorators = parameters ![0].decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0]).toEqual(jasmine.objectContaining({name: 'Inject'}));
      });

      it('should use `getImportOfIdentifier()` to retrieve import info', () => {
        const mockImportInfo = { name: 'mock', from: '@angulare/core' } as Import;
        const spy = spyOn(Esm5ReflectionHost.prototype, 'getImportOfIdentifier')
                        .and.returnValue(mockImportInfo);

        const program = makeTestProgram(SOME_DIRECTIVE_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        const decorators = parameters ![2].decorators !;

        expect(decorators.length).toEqual(1);
        expect(decorators[0].import).toBe(mockImportInfo);

        const typeIdentifier = spy.calls.mostRecent().args[0] as ts.Identifier;
        expect(typeIdentifier.text).toBe('Inject');
      });
    });

    describe('synthesized constructors', () => {
      function getConstructorParameters(constructor: string) {
        const file = {
          name: '/synthesized_constructors.js',
          contents: `
            var TestClass = /** @class */ (function (_super) {
              __extends(TestClass, _super);
              ${constructor}
              return TestClass;
            }(null));
          `,
        };

        const program = makeTestProgram(file);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode =
            getDeclaration(program, file.name, 'TestClass', isNamedVariableDeclaration);
        return host.getConstructorParameters(classNode);
      }

      it('recognizes _this assignment from super call', () => {
        const parameters = getConstructorParameters(`
          function TestClass() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.synthesizedProperty = null;
            return _this;
          }`);

        expect(parameters).toBeNull();
      });

      it('recognizes super call as return statement', () => {
        const parameters = getConstructorParameters(`
          function TestClass() {
            return _super !== null && _super.apply(this, arguments) || this;
          }`);

        expect(parameters).toBeNull();
      });

      it('handles the case where a unique name was generated for _super or _this', () => {
        const parameters = getConstructorParameters(`
          function TestClass() {
            var _this_1 = _super_1 !== null && _super_1.apply(this, arguments) || this;
            _this_1._this = null;
            _this_1._super = null;
            return _this_1;
          }`);

        expect(parameters).toBeNull();
      });

      it('does not consider constructors with parameters as synthesized', () => {
        const parameters = getConstructorParameters(`
          function TestClass(arg) {
            return _super !== null && _super.apply(this, arguments) || this;
          }`);

        expect(parameters !.length).toBe(1);
      });

      it('does not consider manual super calls as synthesized', () => {
        const parameters = getConstructorParameters(`
          function TestClass() {
            return _super.call(this) || this;
          }`);

        expect(parameters !.length).toBe(0);
      });

      it('does not consider empty constructors as synthesized', () => {
        const parameters = getConstructorParameters(`
          function TestClass() {
          }`);

        expect(parameters !.length).toBe(0);
      });
    });

    describe('(returned parameters `decorators.args`)', () => {
      it('should be an empty array if param decorator has no `args` property', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATOR_ARGS_FILE.name, 'NoArgsProperty',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        expect(parameters !.length).toBe(1);
        const decorators = parameters ![0].decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Inject');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if param decorator\'s `args` has no property assignment', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATOR_ARGS_FILE.name, 'NoPropertyAssignment',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        const decorators = parameters ![0].decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Inject');
        expect(decorators[0].args).toEqual([]);
      });

      it('should be an empty array if `args` property value is not an array literal', () => {
        const program = makeTestProgram(INVALID_CTOR_DECORATOR_ARGS_FILE);
        const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
        const classNode = getDeclaration(
            program, INVALID_CTOR_DECORATOR_ARGS_FILE.name, 'NotArrayLiteral',
            isNamedVariableDeclaration);
        const parameters = host.getConstructorParameters(classNode);
        const decorators = parameters ![0].decorators !;

        expect(decorators.length).toBe(1);
        expect(decorators[0].name).toBe('Inject');
        expect(decorators[0].args).toEqual([]);
      });
    });
  });

  describe('getDefinitionOfFunction()', () => {
    it('should return an object describing the function declaration passed as an argument', () => {
      const program = makeTestProgram(FUNCTION_BODY_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());

      const fooNode =
          getDeclaration(program, FUNCTION_BODY_FILE.name, 'foo', isNamedFunctionDeclaration) !;
      const fooDef = host.getDefinitionOfFunction(fooNode);
      expect(fooDef.node).toBe(fooNode);
      expect(fooDef.body !.length).toEqual(1);
      expect(fooDef.body ![0].getText()).toEqual(`return x;`);
      expect(fooDef.parameters.length).toEqual(1);
      expect(fooDef.parameters[0].name).toEqual('x');
      expect(fooDef.parameters[0].initializer).toBe(null);

      const barNode =
          getDeclaration(program, FUNCTION_BODY_FILE.name, 'bar', isNamedFunctionDeclaration) !;
      const barDef = host.getDefinitionOfFunction(barNode);
      expect(barDef.node).toBe(barNode);
      expect(barDef.body !.length).toEqual(1);
      expect(ts.isReturnStatement(barDef.body ![0])).toBeTruthy();
      expect(barDef.body ![0].getText()).toEqual(`return x + y;`);
      expect(barDef.parameters.length).toEqual(2);
      expect(barDef.parameters[0].name).toEqual('x');
      expect(fooDef.parameters[0].initializer).toBe(null);
      expect(barDef.parameters[1].name).toEqual('y');
      expect(barDef.parameters[1].initializer !.getText()).toEqual('42');

      const bazNode =
          getDeclaration(program, FUNCTION_BODY_FILE.name, 'baz', isNamedFunctionDeclaration) !;
      const bazDef = host.getDefinitionOfFunction(bazNode);
      expect(bazDef.node).toBe(bazNode);
      expect(bazDef.body !.length).toEqual(3);
      expect(bazDef.parameters.length).toEqual(1);
      expect(bazDef.parameters[0].name).toEqual('x');
      expect(bazDef.parameters[0].initializer).toBe(null);

      const quxNode =
          getDeclaration(program, FUNCTION_BODY_FILE.name, 'qux', isNamedFunctionDeclaration) !;
      const quxDef = host.getDefinitionOfFunction(quxNode);
      expect(quxDef.node).toBe(quxNode);
      expect(quxDef.body !.length).toEqual(2);
      expect(quxDef.parameters.length).toEqual(1);
      expect(quxDef.parameters[0].name).toEqual('x');
      expect(quxDef.parameters[0].initializer).toBe(null);
    });
  });

  describe('getImportOfIdentifier()', () => {
    it('should find the import of an identifier', () => {
      const program = makeTestProgram(...IMPORTS_FILES);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const variableNode =
          getDeclaration(program, IMPORTS_FILES[1].name, 'b', isNamedVariableDeclaration);
      const importOfIdent = host.getImportOfIdentifier(variableNode.initializer as ts.Identifier);

      expect(importOfIdent).toEqual({name: 'a', from: './a.js'});
    });

    it('should find the name by which the identifier was exported, not imported', () => {
      const program = makeTestProgram(...IMPORTS_FILES);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const variableNode =
          getDeclaration(program, IMPORTS_FILES[1].name, 'c', isNamedVariableDeclaration);
      const importOfIdent = host.getImportOfIdentifier(variableNode.initializer as ts.Identifier);

      expect(importOfIdent).toEqual({name: 'a', from: './a.js'});
    });

    it('should return null if the identifier was not imported', () => {
      const program = makeTestProgram(...IMPORTS_FILES);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const variableNode =
          getDeclaration(program, IMPORTS_FILES[1].name, 'd', isNamedVariableDeclaration);
      const importOfIdent = host.getImportOfIdentifier(variableNode.initializer as ts.Identifier);

      expect(importOfIdent).toBeNull();
    });
  });

  describe('getDeclarationOfIdentifier()', () => {
    it('should return the declaration of a locally defined identifier', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const ctrDecorators = host.getConstructorParameters(classNode) !;
      const identifierOfViewContainerRef = (ctrDecorators[0].typeValueReference !as{
                                             local: true,
                                             expression: ts.Identifier,
                                             defaultImportStatement: null,
                                           }).expression;

      const expectedDeclarationNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'ViewContainerRef', isNamedVariableDeclaration);
      const actualDeclaration = host.getDeclarationOfIdentifier(identifierOfViewContainerRef);
      expect(actualDeclaration).not.toBe(null);
      expect(actualDeclaration !.node).toBe(expectedDeclarationNode);
      expect(actualDeclaration !.viaModule).toBe(null);
    });

    it('should return the declaration of an externally defined identifier', () => {
      const program = makeTestProgram(SOME_DIRECTIVE_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(
          program, SOME_DIRECTIVE_FILE.name, 'SomeDirective', isNamedVariableDeclaration);
      const classDecorators = host.getDecoratorsOfDeclaration(classNode) !;
      const identifierOfDirective = ((classDecorators[0].node as ts.ObjectLiteralExpression)
                                         .properties[0] as ts.PropertyAssignment)
                                        .initializer as ts.Identifier;

      const expectedDeclarationNode = getDeclaration(
          program, 'node_modules/@angular/core/index.ts', 'Directive', isNamedVariableDeclaration);
      const actualDeclaration = host.getDeclarationOfIdentifier(identifierOfDirective);
      expect(actualDeclaration).not.toBe(null);
      expect(actualDeclaration !.node).toBe(expectedDeclarationNode);
      expect(actualDeclaration !.viaModule).toBe('@angular/core');
    });

    it('should return the correct declaration for an inner function identifier inside an ES5 IIFE',
       () => {
         const superGetDeclarationOfIdentifierSpy =
             spyOn(Esm2015ReflectionHost.prototype, 'getDeclarationOfIdentifier').and.callThrough();
         const program = makeTestProgram(SIMPLE_CLASS_FILE);
         const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());

         const outerDeclaration = getDeclaration(
             program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
         const innerDeclaration = (((outerDeclaration.initializer as ts.ParenthesizedExpression)
                                        .expression as ts.CallExpression)
                                       .expression as ts.FunctionExpression)
                                      .body.statements[0] as ts.FunctionDeclaration;

         const outerIdentifier = outerDeclaration.name as ts.Identifier;
         const innerIdentifier = innerDeclaration.name as ts.Identifier;

         expect(host.getDeclarationOfIdentifier(outerIdentifier) !.node).toBe(outerDeclaration);
         expect(superGetDeclarationOfIdentifierSpy).toHaveBeenCalledWith(outerIdentifier);
         expect(superGetDeclarationOfIdentifierSpy).toHaveBeenCalledTimes(1);

         superGetDeclarationOfIdentifierSpy.calls.reset();

         expect(host.getDeclarationOfIdentifier(innerIdentifier) !.node).toBe(outerDeclaration);
         expect(superGetDeclarationOfIdentifierSpy).toHaveBeenCalledWith(outerIdentifier);
         expect(superGetDeclarationOfIdentifierSpy).toHaveBeenCalledTimes(1);
       });
  });

  describe('getExportsOfModule()', () => {
    it('should return a map of all the exports from a given module', () => {
      const program = makeTestProgram(...EXPORTS_FILES);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const file = program.getSourceFile(EXPORTS_FILES[1].name) !;
      const exportDeclarations = host.getExportsOfModule(file);
      expect(exportDeclarations).not.toBe(null);
      expect(Array.from(exportDeclarations !.keys())).toEqual([
        'Directive',
        'a',
        'b',
        'c',
        'd',
        'e',
        'DirectiveX',
        'SomeClass',
      ]);

      const values = Array.from(exportDeclarations !.values())
                         .map(declaration => [declaration.node.getText(), declaration.viaModule]);
      expect(values).toEqual([
        // TODO: clarify what is expected here...
        //[`Directive = callableClassDecorator()`, '@angular/core'],
        [`Directive = callableClassDecorator()`, null],
        [`a = 'a'`, null],
        [`b = a`, null],
        [`c = foo`, null],
        [`d = b`, null],
        [`e = 'e'`, null],
        [`DirectiveX = Directive`, null],
        [
          `SomeClass = (function() {
        function SomeClass() {}
        return SomeClass;
      }())`,
          null
        ],
      ]);
    });
  });

  describe('getClassSymbol()', () => {
    it('should return the class symbol for an ES2015 class', () => {
      const program = makeTestProgram(SIMPLE_ES2015_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const node = getDeclaration(
          program, SIMPLE_ES2015_CLASS_FILE.name, 'EmptyClass', isNamedClassDeclaration);
      const classSymbol = host.getClassSymbol(node);

      expect(classSymbol).toBeDefined();
      expect(classSymbol !.valueDeclaration).toBe(node);
    });

    it('should return the class symbol for an ES5 class (outer variable declaration)', () => {
      const program = makeTestProgram(SIMPLE_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const node =
          getDeclaration(program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
      const classSymbol = host.getClassSymbol(node);

      expect(classSymbol).toBeDefined();
      expect(classSymbol !.valueDeclaration).toBe(node);
    });

    it('should return the class symbol for an ES5 class (inner function declaration)', () => {
      const program = makeTestProgram(SIMPLE_CLASS_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const outerNode =
          getDeclaration(program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
      const innerNode = getIifeBody(outerNode) !.statements.find(isNamedFunctionDeclaration) !;
      const classSymbol = host.getClassSymbol(innerNode);

      expect(classSymbol).toBeDefined();
      expect(classSymbol !.valueDeclaration).toBe(outerNode);
    });

    it('should return the same class symbol (of the outer declaration) for outer and inner declarations',
       () => {
         const program = makeTestProgram(SIMPLE_CLASS_FILE);
         const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
         const outerNode = getDeclaration(
             program, SIMPLE_CLASS_FILE.name, 'EmptyClass', isNamedVariableDeclaration);
         const innerNode = getIifeBody(outerNode) !.statements.find(isNamedFunctionDeclaration) !;

         expect(host.getClassSymbol(innerNode)).toBe(host.getClassSymbol(outerNode));
       });

    it('should return undefined if node is not an ES5 class', () => {
      const program = makeTestProgram(FOO_FUNCTION_FILE);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const node =
          getDeclaration(program, FOO_FUNCTION_FILE.name, 'foo', isNamedFunctionDeclaration);
      const classSymbol = host.getClassSymbol(node);

      expect(classSymbol).toBeUndefined();
    });
  });

  describe('isClass()', () => {
    let host: Esm5ReflectionHost;
    let mockNode: ts.Node;
    let getClassDeclarationSpy: jasmine.Spy;
    let superGetClassDeclarationSpy: jasmine.Spy;

    beforeEach(() => {
      host = new Esm5ReflectionHost(new MockLogger(), false, null as any);
      mockNode = {} as any;

      getClassDeclarationSpy = spyOn(Esm5ReflectionHost.prototype, 'getClassDeclaration');
      superGetClassDeclarationSpy = spyOn(Esm2015ReflectionHost.prototype, 'getClassDeclaration');
    });

    it('should return true if superclass returns true', () => {
      superGetClassDeclarationSpy.and.returnValue(true);
      getClassDeclarationSpy.and.callThrough();

      expect(host.isClass(mockNode)).toBe(true);
      expect(getClassDeclarationSpy).toHaveBeenCalledWith(mockNode);
      expect(superGetClassDeclarationSpy).toHaveBeenCalledWith(mockNode);
    });

    it('should return true if it can find a declaration for the class', () => {
      getClassDeclarationSpy.and.returnValue(true);

      expect(host.isClass(mockNode)).toBe(true);
      expect(getClassDeclarationSpy).toHaveBeenCalledWith(mockNode);
    });

    it('should return false if it cannot find a declaration for the class', () => {
      getClassDeclarationSpy.and.returnValue(false);

      expect(host.isClass(mockNode)).toBe(false);
      expect(getClassDeclarationSpy).toHaveBeenCalledWith(mockNode);
    });
  });

  describe('hasBaseClass()', () => {
    function hasBaseClass(source: string) {
      const file = {
        name: '/synthesized_constructors.js',
        contents: source,
      };

      const program = makeTestProgram(file);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const classNode = getDeclaration(program, file.name, 'TestClass', isNamedVariableDeclaration);
      return host.hasBaseClass(classNode);
    }

    it('should consider an IIFE with _super parameter as having a base class', () => {
      const result = hasBaseClass(`
        var TestClass = /** @class */ (function (_super) {
          __extends(TestClass, _super);
          function TestClass() {}
          return TestClass;
        }(null));`);
      expect(result).toBe(true);
    });

    it('should consider an IIFE with a unique name generated for the _super parameter as having a base class',
       () => {
         const result = hasBaseClass(`
        var TestClass = /** @class */ (function (_super_1) {
          __extends(TestClass, _super_1);
          function TestClass() {}
          return TestClass;
        }(null));`);
         expect(result).toBe(true);
       });

    it('should not consider an IIFE without parameter as having a base class', () => {
      const result = hasBaseClass(`
        var TestClass = /** @class */ (function () {
          __extends(TestClass, _super);
          function TestClass() {}
          return TestClass;
        }(null));`);
      expect(result).toBe(false);
    });
  });

  describe('findDecoratedClasses()', () => {
    it('should return an array of all decorated classes in the given source file', () => {
      const program = makeTestProgram(...DECORATED_FILES);
      const host = new Esm5ReflectionHost(new MockLogger(), false, program.getTypeChecker());
      const primary = program.getSourceFile(DECORATED_FILES[0].name) !;

      const primaryDecoratedClasses = host.findDecoratedClasses(primary);
      expect(primaryDecoratedClasses.length).toEqual(2);
      const classA = primaryDecoratedClasses.find(c => c.name === 'A') !;
      expect(classA.decorators.map(decorator => decorator.name)).toEqual(['Directive']);
      // Note that `B` is not exported from `primary.js`
      const classB = primaryDecoratedClasses.find(c => c.name === 'B') !;
      expect(classB.decorators.map(decorator => decorator.name)).toEqual(['Directive']);

      const secondary = program.getSourceFile(DECORATED_FILES[1].name) !;
      const secondaryDecoratedClasses = host.findDecoratedClasses(secondary);
      expect(secondaryDecoratedClasses.length).toEqual(1);
      // Note that `D` is exported from `secondary.js` but not exported from `primary.js`
      const classD = secondaryDecoratedClasses.find(c => c.name === 'D') !;
      expect(classD.name).toEqual('D');
      expect(classD.decorators.map(decorator => decorator.name)).toEqual(['Directive']);
    });
  });

  describe('getDtsDeclarationsOfClass()', () => {
    it('should find the dts declaration that has the same relative path to the source file', () => {
      const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
      const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
      const class1 =
          getDeclaration(srcProgram, '/src/class1.js', 'Class1', ts.isVariableDeclaration);
      const host =
          new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

      const dtsDeclaration = host.getDtsDeclaration(class1);
      expect(dtsDeclaration !.getSourceFile().fileName).toEqual('/typings/class1.d.ts');
    });

    it('should find the dts declaration for exported functions', () => {
      const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
      const dtsProgram = makeTestBundleProgram(TYPINGS_DTS_FILES);
      const mooFn = getDeclaration(srcProgram, '/src/func1.js', 'mooFn', ts.isFunctionDeclaration);
      const host =
          new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dtsProgram);

      const dtsDeclaration = host.getDtsDeclaration(mooFn);
      expect(dtsDeclaration !.getSourceFile().fileName).toEqual('/typings/func1.d.ts');
    });

    it('should return null if there is no matching class in the matching dts file', () => {
      const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
      const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
      const missingClass =
          getDeclaration(srcProgram, '/src/class1.js', 'MissingClass1', ts.isVariableDeclaration);
      const host =
          new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

      expect(host.getDtsDeclaration(missingClass)).toBe(null);
    });

    it('should return null if there is no matching dts file', () => {
      const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
      const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
      const missingClass = getDeclaration(
          srcProgram, '/src/missing-class.js', 'MissingClass2', ts.isVariableDeclaration);
      const host =
          new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

      expect(host.getDtsDeclaration(missingClass)).toBe(null);
    });

    it('should find the dts file that contains a matching class declaration, even if the source files do not match',
       () => {
         const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
         const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
         const class1 =
             getDeclaration(srcProgram, '/src/flat-file.js', 'Class1', ts.isVariableDeclaration);
         const host =
             new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

         const dtsDeclaration = host.getDtsDeclaration(class1);
         expect(dtsDeclaration !.getSourceFile().fileName).toEqual('/typings/class1.d.ts');
       });

    it('should find aliased exports', () => {
      const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
      const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
      const class3 =
          getDeclaration(srcProgram, '/src/flat-file.js', 'Class3', ts.isVariableDeclaration);
      const host =
          new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

      const dtsDeclaration = host.getDtsDeclaration(class3);
      expect(dtsDeclaration !.getSourceFile().fileName).toEqual('/typings/class3.d.ts');
    });

    it('should find the dts file that contains a matching class declaration, even if the class is not publicly exported',
       () => {
         const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
         const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
         const internalClass = getDeclaration(
             srcProgram, '/src/internal.js', 'InternalClass', ts.isVariableDeclaration);
         const host =
             new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

         const dtsDeclaration = host.getDtsDeclaration(internalClass);
         expect(dtsDeclaration !.getSourceFile().fileName).toEqual('/typings/internal.d.ts');
       });

    it('should prefer the publicly exported class if there are multiple classes with the same name',
       () => {
         const srcProgram = makeTestProgram(...TYPINGS_SRC_FILES);
         const dts = makeTestBundleProgram(TYPINGS_DTS_FILES);
         const class2 =
             getDeclaration(srcProgram, '/src/class2.js', 'Class2', ts.isVariableDeclaration);
         const internalClass2 =
             getDeclaration(srcProgram, '/src/internal.js', 'Class2', ts.isVariableDeclaration);
         const host =
             new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker(), dts);

         const class2DtsDeclaration = host.getDtsDeclaration(class2);
         expect(class2DtsDeclaration !.getSourceFile().fileName).toEqual('/typings/class2.d.ts');

         const internalClass2DtsDeclaration = host.getDtsDeclaration(internalClass2);
         expect(internalClass2DtsDeclaration !.getSourceFile().fileName)
             .toEqual('/typings/class2.d.ts');
       });
  });

  describe('getModuleWithProvidersFunctions', () => {
    it('should find every exported function that returns an object that looks like a ModuleWithProviders object',
       () => {
         const srcProgram = makeTestProgram(...MODULE_WITH_PROVIDERS_PROGRAM);
         const host = new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker());
         const file = srcProgram.getSourceFile('/src/functions.js') !;
         const fns = host.getModuleWithProvidersFunctions(file);
         expect(fns.map(fn => [fn.declaration.name !.getText(), fn.ngModule.node.name.text]))
             .toEqual([
               ['ngModuleIdentifier', 'InternalModule'],
               ['ngModuleWithEmptyProviders', 'InternalModule'],
               ['ngModuleWithProviders', 'InternalModule'],
               ['externalNgModule', 'ExternalModule'],
             ]);
       });

    it('should find every static method on exported classes that return an object that looks like a ModuleWithProviders object',
       () => {
         const srcProgram = makeTestProgram(...MODULE_WITH_PROVIDERS_PROGRAM);
         const host = new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker());
         const file = srcProgram.getSourceFile('/src/methods.js') !;
         const fn = host.getModuleWithProvidersFunctions(file);
         expect(fn.map(fn => [fn.declaration.getText(), fn.ngModule.node.name.text])).toEqual([
           [
             'function() { return { ngModule: InternalModule }; }',
             'InternalModule',
           ],
           [
             'function() { return { ngModule: InternalModule, providers: [] }; }',
             'InternalModule',
           ],
           [
             'function() { return { ngModule: InternalModule, providers: [SomeService] }; }',
             'InternalModule',
           ],
           [
             'function() { return { ngModule: ExternalModule }; }',
             'ExternalModule',
           ],
         ]);
       });

    // https://github.com/angular/angular/issues/29078
    it('should resolve aliased module references to their original declaration', () => {
      const srcProgram = makeTestProgram(...MODULE_WITH_PROVIDERS_PROGRAM);
      const host = new Esm5ReflectionHost(new MockLogger(), false, srcProgram.getTypeChecker());
      const file = srcProgram.getSourceFile('/src/aliased_class.js') !;
      const fn = host.getModuleWithProvidersFunctions(file);
      expect(fn.map(fn => [fn.declaration.getText(), fn.ngModule.node.name.text])).toEqual([
        ['function() { return { ngModule: AliasedModule_1 }; }', 'AliasedModule'],
      ]);
    });
  });
});
