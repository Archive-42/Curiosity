/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {AttributeMarker} from '@angular/compiler/src/core';
import {MockDirectory, setup} from '@angular/compiler/test/aot/test_util';
import {compile, expectEmit} from './mock_compile';

describe('compiler compliance: bindings', () => {
  const angularFiles = setup({
    compileAngular: false,
    compileFakeCore: true,
    compileAnimations: false,
  });

  describe('text bindings', () => {
    it('should generate interpolation instruction', () => {
      const files: MockDirectory = {
        app: {
          'example.ts': `
          import {Component, NgModule} from '@angular/core';
          @Component({
            selector: 'my-component',
            template: \`
              <div>Hello {{ name }}</div>\`
          })
          export class MyComponent {
            name = 'World';
          }
          @NgModule({declarations: [MyComponent]})
          export class MyModule {}
          `
        }
      };

      const template = `
      template:function MyComponent_Template(rf, $ctx$){
        if (rf & 1) {
          $i0$.ɵɵelementStart(0, "div");
          $i0$.ɵɵtext(1);
          $i0$.ɵɵelementEnd();
        }
        if (rf & 2) {
          $r3$.ɵɵselect(1);
          $i0$.ɵɵtextBinding(1, $i0$.ɵɵinterpolation1("Hello ", $ctx$.name, ""));
        }
      }`;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect interpolated text binding');
    });
  });

  describe('property bindings', () => {
    it('should generate bind instruction', () => {
      const files: MockDirectory = {
        app: {
          'example.ts': `
          import {Component, NgModule} from '@angular/core';

          @Component({
            selector: 'my-app',
            template: '<a [title]="title"></a>'
          })
          export class MyComponent {
            title = 'Hello World';
          }

          @NgModule({declarations: [MyComponent]})
          export class MyModule {}`
        }
      };

      const template = `
      const $e0_attrs$ = [${AttributeMarker.Bindings}, "title"];
      …
      template:function MyComponent_Template(rf, $ctx$){
        if (rf & 1) {
          $i0$.ɵɵelement(0, "a", $e0_attrs$);
        }
        if (rf & 2) {
          $i0$.ɵɵselect(0);
          $i0$.ɵɵproperty("title", $ctx$.title);
        }
      }`;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect property binding');
    });

    it('should generate interpolation instruction for {{...}} bindings', () => {
      const files: MockDirectory = {
        app: {
          'example.ts': `
          import {Component, NgModule} from '@angular/core';
          @Component({
            selector: 'my-component',
            template: \`
              <a title="Hello {{name}}"></a>\`
          })
          export class MyComponent {
            name = 'World';
          }
          @NgModule({declarations: [MyComponent]})
          export class MyModule {}
          `
        }
      };

      const template = `
      const $e0_attrs$ = [${AttributeMarker.Bindings}, "title"];
      …
      template:function MyComponent_Template(rf, $ctx$){
        if (rf & 1) {
          $i0$.ɵɵelement(0, "a", $e0_attrs$);
        }
        if (rf & 2) {
          $i0$.ɵɵselect(0);
          $i0$.ɵɵpropertyInterpolate1("title", "Hello ", $ctx$.name, "");
        }
      }`;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect interpolated property binding');
    });

    it('should ignore empty bindings', () => {
      const files: MockDirectory = {
        app: {
          'example.ts': `
            import {Component} from '@angular/core';
            @Component({
              selector: 'test',
              template: '<div [someProp]></div>'
            })
            class FooCmp {}
          `
        }
      };
      const result = compile(files, angularFiles);
      expect(result.source).not.toContain('i0.ɵɵelementProperty');
    });

    it('should not remap property names whose names do not correspond to their attribute names',
       () => {
         const files = {
           app: {
             'spec.ts': `
              import {Component, NgModule} from '@angular/core';

              @Component({
                selector: 'my-component',
                template: \`
                  <label [for]="forValue"></label>\`
              })
              export class MyComponent {
                forValue = 'some-input';
              }

              @NgModule({declarations: [MyComponent]})
              export class MyModule {}
          `
           }
         };

         const template = `
      const $c0$ = [${AttributeMarker.Bindings}, "for"];

      // ...

      function MyComponent_Template(rf, ctx) {
        if (rf & 1) {
            $i0$.ɵɵelement(0, "label", _c0);
        }
        if (rf & 2) {
            $i0$.ɵɵselect(0);
            $i0$.ɵɵproperty("for", ctx.forValue);
        }
      }`;

         const result = compile(files, angularFiles);

         expectEmit(result.source, template, 'Incorrect template');
       });

  });

  describe('host bindings', () => {
    it('should support host bindings', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Directive, HostBinding, NgModule} from '@angular/core';

            @Directive({selector: '[hostBindingDir]'})
            export class HostBindingDir {
              @HostBinding('id') dirId = 'some id';
            }

            @NgModule({declarations: [HostBindingDir]})
            export class MyModule {}
          `
        }
      };

      const HostBindingDirDeclaration = `
        HostBindingDir.ngDirectiveDef = $r3$.ɵɵdefineDirective({
          type: HostBindingDir,
          selectors: [["", "hostBindingDir", ""]],
          factory: function HostBindingDir_Factory(t) { return new (t || HostBindingDir)(); },
          hostBindings: function HostBindingDir_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵallocHostVars(1);
            }
            if (rf & 2) {
              $r3$.ɵɵproperty("id", ctx.dirId, null, true);
            }
          }
        });
      `;

      const result = compile(files, angularFiles);
      const source = result.source;

      expectEmit(source, HostBindingDirDeclaration, 'Invalid host binding code');
    });

    it('should support host bindings with pure functions', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Component, NgModule} from '@angular/core';

            @Component({
              selector: 'host-binding-comp',
              host: {
                '[id]': '["red", id]'
              },
              template: ''
            })
            export class HostBindingComp {
              id = 'some id';
            }

            @NgModule({declarations: [HostBindingComp]})
            export class MyModule {}
          `
        }
      };

      const HostBindingCompDeclaration = `
        const $ff$ = function ($v$) { return ["red", $v$]; };
        …
        HostBindingComp.ngComponentDef = $r3$.ɵɵdefineComponent({
          type: HostBindingComp,
          selectors: [["host-binding-comp"]],
          factory: function HostBindingComp_Factory(t) { return new (t || HostBindingComp)(); },
          hostBindings: function HostBindingComp_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵallocHostVars(3);
            }
            if (rf & 2) {
              $r3$.ɵɵproperty("id", $r3$.ɵɵpureFunction1(1, $ff$, ctx.id), null, true);
            }
          },
          consts: 0,
          vars: 0,
          template: function HostBindingComp_Template(rf, ctx) {},
          encapsulation: 2
        });
      `;

      const result = compile(files, angularFiles);
      const source = result.source;

      expectEmit(source, HostBindingCompDeclaration, 'Invalid host binding code');
    });

    it('should support host attribute bindings', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Directive, NgModule} from '@angular/core';

            @Directive({
              selector: '[hostAttributeDir]',
              host: {
                '[attr.required]': 'required'
              }
            })
            export class HostAttributeDir {
              required = true;
            }

            @NgModule({declarations: [HostAttributeDir]})
            export class MyModule {}
          `
        }
      };

      const HostAttributeDirDeclaration = `
        HostAttributeDir.ngDirectiveDef = $r3$.ɵɵdefineDirective({
          type: HostAttributeDir,
          selectors: [["", "hostAttributeDir", ""]],
          factory: function HostAttributeDir_Factory(t) { return new (t || HostAttributeDir)(); },
          hostBindings: function HostAttributeDir_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵallocHostVars(1);
            }
            if (rf & 2) {
              $r3$.ɵɵelementAttribute(elIndex, "required", $r3$.ɵɵbind(ctx.required));
            }
          }
        });
      `;

      const result = compile(files, angularFiles);
      const source = result.source;

      expectEmit(source, HostAttributeDirDeclaration, 'Invalid host attribute code');
    });

    it('should support host attributes', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Directive, NgModule} from '@angular/core';

            @Directive({
              selector: '[hostAttributeDir]',
              host: {
                'aria-label': 'label'
              }
            })
            export class HostAttributeDir {
            }

            @NgModule({declarations: [HostAttributeDir]})
            export class MyModule {}
          `
        }
      };

      const HostAttributeDirDeclaration = `
        const $c0$ = ["aria-label", "label"];
        …
        HostAttributeDir.ngDirectiveDef = $r3$.ɵɵdefineDirective({
          type: HostAttributeDir,
          selectors: [["", "hostAttributeDir", ""]],
          factory: function HostAttributeDir_Factory(t) { return new (t || HostAttributeDir)(); },
          hostBindings: function HostAttributeDir_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostAttrs($c0$);
            }
          }
        });
      `;

      const result = compile(files, angularFiles);
      const source = result.source;

      expectEmit(source, HostAttributeDirDeclaration, 'Invalid host attribute code');
    });

    it('should support host attributes together with host classes and styles', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Component, Directive, NgModule} from '@angular/core';

            @Component({
              selector: 'my-host-attribute-component',
              template: "...",
              host: {
                'title': 'hello there from component',
                'style': 'opacity:1'
              }
            })
            export class HostAttributeComp {
            }

            @Directive({
              selector: '[hostAttributeDir]',
              host: {
                'style': 'width: 200px; height: 500px',
                '[style.opacity]': "true",
                'class': 'one two',
                '[class.three]': "true",
                'title': 'hello there from directive',
              }
            })
            export class HostAttributeDir {
            }

            @NgModule({declarations: [HostAttributeComp, HostAttributeDir]})
            export class MyModule {}
          `
        }
      };

      const CompAndDirDeclaration = `
        const $c0$ = ["title", "hello there from component", ${AttributeMarker.Styles}, "opacity", "1"];
        const $c1$ = ["title", "hello there from directive", ${AttributeMarker.Classes}, "one", "two", ${AttributeMarker.Styles}, "width", "200px", "height", "500px"];
        …
        HostAttributeComp.ngComponentDef = $r3$.ɵɵdefineComponent({
          type: HostAttributeComp,
          selectors: [["my-host-attribute-component"]],
          factory: function HostAttributeComp_Factory(t) { return new (t || HostAttributeComp)(); },
          hostBindings: function HostAttributeComp_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostAttrs($c0$);
              …
            }
            …
          }
        …
        HostAttributeDir.ngDirectiveDef = $r3$.ɵɵdefineDirective({
          type: HostAttributeDir,
          selectors: [["", "hostAttributeDir", ""]],
          factory: function HostAttributeDir_Factory(t) { return new (t || HostAttributeDir)(); },
          hostBindings: function HostAttributeDir_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostAttrs($c1$);
              …
            }
            …
          }
      `;

      const result = compile(files, angularFiles);
      const source = result.source;
      expectEmit(source, CompAndDirDeclaration, 'Invalid host attribute code');
    });
  });

  describe('non bindable behavior', () => {
    const getAppFiles = (template: string = ''): MockDirectory => ({
      app: {
        'example.ts': `
          import {Component, NgModule} from '@angular/core';

          @Component({
            selector: 'my-app',
            template: \`${template}\`
          })
          export class MyComponent {
            name = 'John Doe';
          }

          @NgModule({declarations: [MyComponent]})
          export class MyModule {}`
      }
    });

    it('should generate the proper update instructions for interpolated properties', () => {
      const files: MockDirectory = getAppFiles(`
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i{{nine}}j"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h{{eight}}i"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g{{seven}}h"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f{{six}}g"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e{{five}}f"></div>
        <div title="a{{one}}b{{two}}c{{three}}d{{four}}e"></div>
        <div title="a{{one}}b{{two}}c{{three}}d"></div>
        <div title="a{{one}}b{{two}}c"></div>
        <div title="a{{one}}b"></div>
        <div title="{{one}}"></div>
      `);

      const template = `
      …
        if (rf & 2) {
          i0.ɵɵselect(0);
          i0.ɵɵpropertyInterpolateV("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e", ctx.five, "f", ctx.six, "g", ctx.seven, "h", ctx.eight, "i", ctx.nine, "j");
          i0.ɵɵselect(1);
          i0.ɵɵpropertyInterpolate8("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e", ctx.five, "f", ctx.six, "g", ctx.seven, "h", ctx.eight, "i");
          i0.ɵɵselect(2);
          i0.ɵɵpropertyInterpolate7("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e", ctx.five, "f", ctx.six, "g", ctx.seven, "h");
          i0.ɵɵselect(3);
          i0.ɵɵpropertyInterpolate6("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e", ctx.five, "f", ctx.six, "g");
          i0.ɵɵselect(4);
          i0.ɵɵpropertyInterpolate5("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e", ctx.five, "f");
          i0.ɵɵselect(5);
          i0.ɵɵpropertyInterpolate4("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d", ctx.four, "e");
          i0.ɵɵselect(6);
          i0.ɵɵpropertyInterpolate3("title", "a", ctx.one, "b", ctx.two, "c", ctx.three, "d");
          i0.ɵɵselect(7);
          i0.ɵɵpropertyInterpolate2("title", "a", ctx.one, "b", ctx.two, "c");
          i0.ɵɵselect(8);
          i0.ɵɵpropertyInterpolate1("title", "a", ctx.one, "b");
          i0.ɵɵselect(9);
          i0.ɵɵpropertyInterpolate("title", ctx.one);
      }
      …
      `;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect handling of interpolated properties');
    });

    it('should keep local ref for host element', () => {
      const files: MockDirectory = getAppFiles(`
        <b ngNonBindable #myRef id="my-id">
          <i>Hello {{ name }}!</i>
        </b>
        {{ myRef.id }}
      `);

      const template = `
        const $_c0$ = ["id", "my-id"];
        const $_c1$ = ["myRef", ""];
        …
        template:function MyComponent_Template(rf, $ctx$){
          if (rf & 1) {
            $i0$.ɵɵelementStart(0, "b", $_c0$, $_c1$);
            $i0$.ɵɵdisableBindings();
            $i0$.ɵɵelementStart(2, "i");
            $i0$.ɵɵtext(3, "Hello {{ name }}!");
            $i0$.ɵɵelementEnd();
            $i0$.ɵɵenableBindings();
            $i0$.ɵɵelementEnd();
            $i0$.ɵɵtext(4);
          }
          if (rf & 2) {
            const $_r0$ = $i0$.ɵɵreference(1);
            $r3$.ɵɵselect(4);
            $i0$.ɵɵtextBinding(4, $i0$.ɵɵinterpolation1(" ", $_r0$.id, " "));
          }
        }
      `;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect handling of local refs for host element');
    });

    it('should not have local refs for nested elements', () => {
      const files: MockDirectory = getAppFiles(`
       <div ngNonBindable>
         <input value="one" #myInput> {{ myInput.value }}
       </div>
      `);

      const template = `
        const $_c0$ = ["value", "one", "#myInput", ""];
        …
        template:function MyComponent_Template(rf, $ctx$){
          if (rf & 1) {
            $i0$.ɵɵelementStart(0, "div");
            $i0$.ɵɵdisableBindings();
            $i0$.ɵɵelement(1, "input", $_c0$);
            $i0$.ɵɵtext(2, " {{ myInput.value }} ");
            $i0$.ɵɵenableBindings();
            $i0$.ɵɵelementEnd();
        }
      `;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect handling of local refs for nested elements');
    });

    it('should not process property bindings and listeners', () => {
      const files: MockDirectory = getAppFiles(`
        <div ngNonBindable>
          <div [id]="my-id" (click)="onclick"></div>
        </div>
      `);

      const template = `
        const $_c0$ = ["[id]", "my-id", "(click)", "onclick"];
        …
        template:function MyComponent_Template(rf, $ctx$){
          if (rf & 1) {
            $i0$.ɵɵelementStart(0, "div");
            $i0$.ɵɵdisableBindings();
            $i0$.ɵɵelement(1, "div", $_c0$);
            $i0$.ɵɵenableBindings();
            $i0$.ɵɵelementEnd();
        }
      `;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect handling of property bindings and listeners');
    });

    it('should not generate extra instructions for elements with no children', () => {
      const files: MockDirectory = getAppFiles(`
        <div ngNonBindable></div>
      `);

      const template = `
        template:function MyComponent_Template(rf, $ctx$){
          if (rf & 1) {
            $i0$.ɵɵelement(0, "div");
          }
        }
      `;
      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect handling of elements with no children');
    });

  });

});
