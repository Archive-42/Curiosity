/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AttributeMarker, ViewEncapsulation} from '@angular/compiler/src/core';
import {setup} from '@angular/compiler/test/aot/test_util';
import {compile, expectEmit} from './mock_compile';

describe('compiler compliance: styling', () => {
  const angularFiles = setup({
    compileAngular: false,
    compileFakeCore: true,
    compileAnimations: false,
  });

  describe('@Component.styles', () => {
    it('should pass in the component metadata styles into the component definition and shim them using style encapsulation',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: "my-component",
                  styles: ["div.foo { color: red; }", ":host p:nth-child(even) { --webkit-transition: 1s linear all; }"],
                  template: "..."
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template =
             'styles: ["div.foo[_ngcontent-%COMP%] { color: red; }", "[_nghost-%COMP%]   p[_ngcontent-%COMP%]:nth-child(even) { --webkit-transition: 1s linear all; }"]';
         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should pass in styles, but skip shimming the styles if the view encapsulation signals not to',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule, ViewEncapsulation} from '@angular/core';

                @Component({
                  selector: "my-component",
                  encapsulation: ViewEncapsulation.None,
                  styles: ["div.tall { height: 123px; }", ":host.small p { height:5px; }"],
                  template: "..."
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = 'div.tall { height: 123px; }", ":host.small p { height:5px; }';
         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should pass in the component metadata styles into the component definition but skip shimming when style encapsulation is set to native',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule, ViewEncapsulation} from '@angular/core';

                @Component({
                  encapsulation: ViewEncapsulation.Native,
                  selector: "my-component",
                  styles: ["div.cool { color: blue; }", ":host.nice p { color: gold; }"],
                  template: "..."
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
         MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
           …
           styles: ["div.cool { color: blue; }", ":host.nice p { color: gold; }"],
           encapsulation: 1
         })
         `;
         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });
  });

  describe('@Component.animations', () => {
    it('should pass in the component metadata animations into the component definition', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: "my-component",
                  animations: [{name: 'foo123'}, {name: 'trigger123'}],
                  template: ""
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
        MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
          type: MyComponent,
          selectors:[["my-component"]],
          factory:function MyComponent_Factory(t){
            return new (t || MyComponent)();
          },
          consts: 0,
          vars: 0,
          template:  function MyComponent_Template(rf, $ctx$) {
          },
          encapsulation: 2,
          data: {
            animation: [{name: 'foo123'}, {name: 'trigger123'}]
          }
        });
      `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should include animations even if the provided array is empty', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: "my-component",
                  animations: [],
                  template: ""
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
        MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
          type: MyComponent,
          selectors:[["my-component"]],
          factory:function MyComponent_Factory(t){
            return new (t || MyComponent)();
          },
          consts: 0,
          vars: 0,
          template:  function MyComponent_Template(rf, $ctx$) {
          },
          encapsulation: 2,
          data: {
            animation: []
          }
        });
      `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should generate any animation triggers into the component template', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: "my-component",
                  template: \`
                    <div [@foo]='exp'></div>
                    <div @bar></div>
                    <div [@baz]></div>\`,
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
        …
        MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
          …
          consts: 3,
          vars: 3,
          template:  function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelement(0, "div");
              $r3$.ɵɵelement(1, "div");
              $r3$.ɵɵelement(2, "div");
            }
            if (rf & 2) {
              $r3$.ɵɵselect(0);
              $r3$.ɵɵproperty("@foo", ctx.exp);
              $r3$.ɵɵselect(1);
              $r3$.ɵɵproperty("@bar", undefined);
              $r3$.ɵɵselect(2);
              $r3$.ɵɵproperty("@baz", undefined);
            }
          },
          encapsulation: 2
        });
      `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should generate animation listeners', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Component, NgModule} from '@angular/core';

            @Component({
              selector: 'my-cmp',
              template: \`
                <div [@myAnimation]="exp"
                  (@myAnimation.start)="onStart($event)"
                  (@myAnimation.done)="onDone($event)"></div>
              \`,
              animations: [trigger(
                   'myAnimation',
                   [transition(
                       '* => state',
                       [style({'opacity': '0'}), animate(500, style({'opacity': '1'}))])])],
            })
            class MyComponent {
              exp: any;
              startEvent: any;
              doneEvent: any;
              onStart(event: any) { this.startEvent = event; }
              onDone(event: any) { this.doneEvent = event; }
            }

            @NgModule({declarations: [MyComponent]})
            export class MyModule {}
          `
        }
      };

      const template = `
        …
        MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
          …
          consts: 1,
          vars: 1,
          template: function MyComponent_Template(rf, ctx) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵlistener("@myAnimation.start", function MyComponent_Template_div_animation_myAnimation_start_0_listener($event) { return ctx.onStart($event); });
              $r3$.ɵɵlistener("@myAnimation.done", function MyComponent_Template_div_animation_myAnimation_done_0_listener($event) { return ctx.onDone($event); });
              $r3$.ɵɵelementEnd();
            } if (rf & 2) {
              $r3$.ɵɵselect(0);
              $r3$.ɵɵproperty("@myAnimation", ctx.exp);
            }
          },
          encapsulation: 2,
          …
        });
      `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should generate animation host binding and listener code for directives', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Directive, Component, NgModule} from '@angular/core';

            @Directive({
              selector: '[my-anim-dir]',
              animations: [
                {name: 'myAnim'}
              ],
              host: {
                '[@myAnim]': 'myAnimState',
                '(@myAnim.start)': 'onStart()',
                '(@myAnim.done)': 'onDone()'
              }
            })
            class MyAnimDir {
              onStart() {}
              onDone() {}
              myAnimState = '123';
            }

            @Component({
              selector: 'my-cmp',
              template: \`
                <div my-anim-dir></div>
              \`
            })
            class MyComponent {
            }

            @NgModule({declarations: [MyComponent, MyAnimDir]})
            export class MyModule {}
          `
        }
      };

      const template = `
        MyAnimDir.ngDirectiveDef = $r3$.ɵɵdefineDirective({
          …
          hostBindings: function MyAnimDir_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵallocHostVars(1);
              $r3$.ɵɵcomponentHostSyntheticListener("@myAnim.start", function MyAnimDir_animation_myAnim_start_HostBindingHandler($event) { return ctx.onStart(); });
              $r3$.ɵɵcomponentHostSyntheticListener("@myAnim.done", function MyAnimDir_animation_myAnim_done_HostBindingHandler($event) { return ctx.onDone(); });
            } if (rf & 2) {
              $r3$.ɵɵcomponentHostSyntheticProperty(elIndex, "@myAnim", $r3$.ɵɵbind(ctx.myAnimState), null, true);
            }
          }
          …
        });
      `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });
  });

  describe('[style] and [style.prop]', () => {
    it('should create style instructions on the element', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div [style]="myStyleExp"></div>\`
                })
                export class MyComponent {
                  myStyleExp = [{color:'red'}, {color:'blue', duration:1000}]
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          template: function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling(null, null, $r3$.ɵɵdefaultStyleSanitizer);
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, null, $ctx$.myStyleExp);
              $r3$.ɵɵelementStylingApply(0);
            }
          }
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should correctly count the total slots required when style/class bindings include interpolation',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component-with-interpolation',
                  template: \`
                    <div class="foo foo-{{ fooId }}"></div>
                  \`
                })
                export class MyComponentWithInterpolation {
                  fooId = '123';
                }

                @Component({
                  selector: 'my-component-with-muchos-interpolation',
                  template: \`
                    <div class="foo foo-{{ fooId }}-{{ fooUsername }}"></div>
                  \`
                })
                export class MyComponentWithMuchosInterpolation {
                  fooId = '123';
                  fooUsername = 'superfoo';
                }

                @Component({
                  selector: 'my-component-without-interpolation',
                  template: \`
                    <div [class]="exp"></div>
                  \`
                })
                export class MyComponentWithoutInterpolation {
                  exp = 'bar';
                }

                @NgModule({declarations: [MyComponentWithInterpolation, MyComponentWithMuchosInterpolation, MyComponentWithoutInterpolation]})
                export class MyModule {}
            `
           }
         };

         const template = `
        …
          consts: 1,
          vars: 1,
          template: function MyComponentWithInterpolation_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling();
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $r3$.ɵɵinterpolation1("foo foo-", $ctx$.fooId, ""));
              $r3$.ɵɵelementStylingApply(0);
            }
          }
        …
          consts: 1,
          vars: 2,
          template: function MyComponentWithMuchosInterpolation_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling();
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $r3$.ɵɵinterpolation2("foo foo-", $ctx$.fooId, "-", $ctx$.fooUsername, ""));
              $r3$.ɵɵelementStylingApply(0);
            }
          }
        …
          consts: 1,
          vars: 0,
          template: function MyComponentWithoutInterpolation_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling();
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $ctx$.exp);
              $r3$.ɵɵelementStylingApply(0);
            }
          }
          `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should place initial, multi, singular and application followed by attribute style instructions in the template code in that order',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div style="opacity:1"
                                   [attr.style]="'border-width: 10px'"
                                   [style.width]="myWidth"
                                   [style]="myStyleExp"
                                   [style.height]="myHeight"></div>\`
                })
                export class MyComponent {
                  myStyleExp = [{color:'red'}, {color:'blue', duration:1000}]
                  myWidth = '100px';
                  myHeight = '100px';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
          const $_c0$ = [${AttributeMarker.Styles}, "opacity", "1", ${AttributeMarker.Bindings}, "style"];
          const $_c1$ = ["width", "height"];
          …
          MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
              type: MyComponent,
              selectors:[["my-component"]],
              factory:function MyComponent_Factory(t){
                return new (t || MyComponent)();
              },
              consts: 1,
              vars: 1,
              template:  function MyComponent_Template(rf, $ctx$) {
                if (rf & 1) {
                  $r3$.ɵɵelementStart(0, "div", $_c0$);
                  $r3$.ɵɵelementStyling(null, $_c1$, $r3$.ɵɵdefaultStyleSanitizer);
                  $r3$.ɵɵelementEnd();
                }
                if (rf & 2) {
                  $r3$.ɵɵelementStylingMap(0, null, $ctx$.myStyleExp);
                  $r3$.ɵɵelementStyleProp(0, 0, $ctx$.myWidth);
                  $r3$.ɵɵelementStyleProp(0, 1, $ctx$.myHeight);
                  $r3$.ɵɵelementStylingApply(0);
                  $r3$.ɵɵselect(0);
                  $r3$.ɵɵelementAttribute(0, "style", $r3$.ɵɵbind("border-width: 10px"), $r3$.ɵɵsanitizeStyle);
                }
              },
              encapsulation: 2
            });
        `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should assign a sanitizer instance to the element style allocation instruction if any url-based properties are detected',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div [style.background-image]="myImage">\`
                })
                export class MyComponent {
                  myImage = 'url(foo.jpg)';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
          const $_c0$ = ["background-image"];
          export class MyComponent {
              constructor() {
                  this.myImage = 'url(foo.jpg)';
              }
          }

          MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
            type: MyComponent,
            selectors: [["my-component"]],
            factory: function MyComponent_Factory(t) {
              return new (t || MyComponent)();
            },
            consts: 1,
            vars: 0,
            template:  function MyComponent_Template(rf, ctx) {
              if (rf & 1) {
                $r3$.ɵɵelementStart(0, "div");
                $r3$.ɵɵelementStyling(null, _c0, $r3$.ɵɵdefaultStyleSanitizer);
                $r3$.ɵɵelementEnd();
              }
              if (rf & 2) {
                $r3$.ɵɵelementStyleProp(0, 0, ctx.myImage);
                $r3$.ɵɵelementStylingApply(0);
              }
            },
            encapsulation: 2
          });
        `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should support [style.foo.suffix] style bindings with a suffix', () => {
      const files = {
        app: {
          'spec.ts': `
             import {Component, NgModule} from '@angular/core';

             @Component({
               selector: 'my-component',
               template: \`<div [style.font-size.px]="12">\`
             })
             export class MyComponent {
             }

             @NgModule({declarations: [MyComponent]})
             export class MyModule {}
         `
        }
      };

      const template = `
          const $e0_styles$ = ["font-size"];
          …
          template:  function MyComponent_Template(rf, ctx) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling(null, _c0);
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStyleProp(0, 0, 12, "px");
              $r3$.ɵɵelementStylingApply(0);
            }
          }
     `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');

    });

    it('should not create instructions for empty style bindings', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Component, NgModule} from '@angular/core';

            @Component({
              selector: 'my-component',
              template: \`<div [style.color]></div>\`
            })
            export class MyComponent {
            }

            @NgModule({declarations: [MyComponent]})
            export class MyModule {}
          `
        }
      };

      const result = compile(files, angularFiles);
      expect(result.source).not.toContain('elementStyling');
    });

  });

  describe('[class]', () => {
    it('should create class styling instructions on the element', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div [class]="myClassExp"></div>\`
                })
                export class MyComponent {
                  myClassExp = {'foo':true}
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          template: function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling();
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0,$ctx$.myClassExp);
              $r3$.ɵɵelementStylingApply(0);
            }
          }
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should place initial, multi, singular and application followed by attribute class instructions in the template code in that order',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div class="grape"
                                   [attr.class]="'banana'"
                                   [class.apple]="yesToApple"
                                   [class]="myClassExp"
                                   [class.orange]="yesToOrange"></div>\`
                })
                export class MyComponent {
                  myClassExp = {a:true, b:true};
                  yesToApple = true;
                  yesToOrange = true;
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
          const $e0_attrs$ = [${AttributeMarker.Classes}, "grape", ${AttributeMarker.Bindings}, "class"];
          const $e0_bindings$ = ["apple", "orange"];
          …
          MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
              type: MyComponent,
              selectors:[["my-component"]],
              factory:function MyComponent_Factory(t){
                return new (t || MyComponent)();
              },
              consts: 1,
              vars: 1,
              template:  function MyComponent_Template(rf, $ctx$) {
                if (rf & 1) {
                  $r3$.ɵɵelementStart(0, "div", $e0_attrs$);
                  $r3$.ɵɵelementStyling($e0_bindings$);
                  $r3$.ɵɵelementEnd();
                }
                if (rf & 2) {
                  $r3$.ɵɵelementStylingMap(0, $ctx$.myClassExp);
                  $r3$.ɵɵelementClassProp(0, 0, $ctx$.yesToApple);
                  $r3$.ɵɵelementClassProp(0, 1, $ctx$.yesToOrange);
                  $r3$.ɵɵelementStylingApply(0);
                  $r3$.ɵɵselect(0);
                  $r3$.ɵɵelementAttribute(0, "class", $r3$.ɵɵbind("banana"));
                }
              },
              encapsulation: 2
            });
        `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should not generate the styling apply instruction if there are only static style/class attributes',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div class="    foo  "
                                   style="width:100px"
                                   [attr.class]="'round'"
                                   [attr.style]="'height:100px'"></div>\`
                })
                export class MyComponent {}

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
          const $e0_attrs$ = [${AttributeMarker.Classes}, "foo", ${AttributeMarker.Styles}, "width", "100px", ${AttributeMarker.Bindings}, "class", "style"];
          …
          MyComponent.ngComponentDef = $r3$.ɵɵdefineComponent({
              type: MyComponent,
              selectors:[["my-component"]],
              factory:function MyComponent_Factory(t){
                return new (t || MyComponent)();
              },
              consts: 1,
              vars: 2,
              template:  function MyComponent_Template(rf, $ctx$) {
                if (rf & 1) {
                  $r3$.ɵɵelement(0, "div", $e0_attrs$);
                }
                if (rf & 2) {
                  $r3$.ɵɵselect(0);
                  $r3$.ɵɵelementAttribute(0, "class", $r3$.ɵɵbind("round"));
                  $r3$.ɵɵelementAttribute(0, "style", $r3$.ɵɵbind("height:100px"), $r3$.ɵɵsanitizeStyle);
                }
              },
              encapsulation: 2
            });
        `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should not create instructions for empty class bindings', () => {
      const files = {
        app: {
          'spec.ts': `
            import {Component, NgModule} from '@angular/core';

            @Component({
              selector: 'my-component',
              template: \`<div [class.is-open]></div>\`
            })
            export class MyComponent {
            }

            @NgModule({declarations: [MyComponent]})
            export class MyModule {}
          `
        }
      };

      const result = compile(files, angularFiles);
      expect(result.source).not.toContain('elementStyling');
    });

  });

  describe('[style] mixed with [class]', () => {
    it('should combine [style] and [class] bindings into a single instruction', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div [style]="myStyleExp" [class]="myClassExp"></div>\`
                })
                export class MyComponent {
                  myStyleExp = [{color:'red'}, {color:'blue', duration:1000}]
                  myClassExp = 'foo bar apple';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          template: function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling(null, null, $r3$.ɵɵdefaultStyleSanitizer);
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $ctx$.myClassExp, $ctx$.myStyleExp);
              $r3$.ɵɵelementStylingApply(0);
            }
          }
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should stamp out pipe definitions in the creation block if used by styling bindings',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`<div [style]="myStyleExp | stylePipe" [class]="myClassExp | classPipe"></div>\`
                })
                export class MyComponent {
                  myStyleExp = [{color:'red'}, {color:'blue', duration:1000}]
                  myClassExp = 'foo bar apple';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
          template: function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling(null, null, $r3$.ɵɵdefaultStyleSanitizer);
              $r3$.ɵɵpipe(1, "classPipe");
              $r3$.ɵɵpipe(2, "stylePipe");
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $r3$.ɵɵpipeBind1(1, 0, $ctx$.myClassExp), $r3$.ɵɵpipeBind1(2, 2, $ctx$.myStyleExp));
              $r3$.ɵɵelementStylingApply(0);
            }
          }
          `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should properly offset multiple style pipe references for styling bindings', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`
                    <div [class]="{}"
                         [class.foo]="fooExp | pipe:2000"
                         [style]="myStyleExp | pipe:1000"
                         [style.bar]="barExp | pipe:3000"
                         [style.baz]="bazExp | pipe:4000">
                         {{ item }}</div>\`
                })
                export class MyComponent {
                  myStyleExp = {};
                  fooExp = 'foo';
                  barExp = 'bar';
                  bazExp = 'baz';
                  items = [1,2,3];
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          const $e0_classBindings$ = ["foo"];
          const $e0_styleBindings$ = ["bar", "baz"];
          …
          template: function MyComponent_Template(rf, $ctx$) {
            if (rf & 1) {
              $r3$.ɵɵelementStart(0, "div");
              $r3$.ɵɵelementStyling($e0_classBindings$, $e0_styleBindings$, $r3$.ɵɵdefaultStyleSanitizer);
              $r3$.ɵɵpipe(1, "pipe");
              $r3$.ɵɵpipe(2, "pipe");
              $r3$.ɵɵpipe(3, "pipe");
              $r3$.ɵɵpipe(4, "pipe");
              $r3$.ɵɵtext(5);
              $r3$.ɵɵelementEnd();
            }
            if (rf & 2) {
              $r3$.ɵɵelementStylingMap(0, $e2_styling$, $r3$.ɵɵpipeBind2(1, 1, $ctx$.myStyleExp, 1000));
              $r3$.ɵɵelementStyleProp(0, 0, $r3$.ɵɵpipeBind2(2, 4, $ctx$.barExp, 3000));
              $r3$.ɵɵelementStyleProp(0, 1, $r3$.ɵɵpipeBind2(3, 7, $ctx$.bazExp, 4000));
              $r3$.ɵɵelementClassProp(0, 0, $r3$.ɵɵpipeBind2(4, 10, $ctx$.fooExp, 2000));
              $r3$.ɵɵelementStylingApply(0);
              $r3$.ɵɵselect(5);
              $r3$.ɵɵtextBinding(5, $r3$.ɵɵinterpolation1(" ", $ctx$.item, ""));
            }
          }
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });
  });

  describe('@Component host styles/classes', () => {
    it('should generate style/class instructions for a host component creation definition', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule, HostBinding} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: '',
                  host: {
                    'style': 'width:200px; height:500px',
                    'class': 'foo baz'
                  }
                })
                export class MyComponent {
                  @HostBinding('style')
                  myStyle = {width:'100px'};

                  @HostBinding('class')
                  myClass = {bar:false};

                  @HostBinding('style.color')
                  myColorProp = 'red';

                  @HostBinding('class.foo')
                  myFooClass = 'red';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          const $e0_attrs$ = [${AttributeMarker.Classes}, "foo", "baz", ${AttributeMarker.Styles}, "width", "200px", "height", "500px"];
          const $e0_classBindings$ = ["foo"];
          const $e0_styleBindings$ = ["color"];
          …
          hostBindings: function MyComponent_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostAttrs($e0_attrs$);
              $r3$.ɵɵelementHostStyling($e0_classBindings$, $e0_styleBindings$, $r3$.ɵɵdefaultStyleSanitizer);
            }
            if (rf & 2) {
              $r3$.ɵɵelementHostStylingMap(ctx.myClass, ctx.myStyle);
              $r3$.ɵɵelementHostStyleProp(0, ctx.myColorProp);
              $r3$.ɵɵelementHostClassProp(0, ctx.myFooClass);
              $r3$.ɵɵelementHostStylingApply();
            }
          },
          consts: 0,
          vars: 0,
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should generate style/class instructions for multiple host binding definitions', () => {
      const files = {
        app: {
          'spec.ts': `
                import {Component, NgModule, HostBinding} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: '',
                  host: {
                    '[style.height.pt]': 'myHeightProp',
                    '[class.bar]': 'myBarClass'
                  }
                })
                export class MyComponent {
                  myHeightProp = 20;
                  myBarClass = true;

                  @HostBinding('style')
                  myStyle = {};

                  @HostBinding('style.width')
                  myWidthProp = '500px';

                  @HostBinding('class.foo')
                  myFooClass = true;

                  @HostBinding('class')
                  myClasses = {a:true, b:true};
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
        }
      };

      const template = `
          const _c0 = ["bar", "foo"];
          const _c1 = ["height", "width"];
          …
          hostBindings: function MyComponent_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostStyling(_c0, _c1, $r3$.ɵɵdefaultStyleSanitizer);
            }
            if (rf & 2) {
              $r3$.ɵɵelementHostStylingMap(ctx.myClasses, ctx.myStyle);
              $r3$.ɵɵelementHostStyleProp(0, ctx.myHeightProp, "pt");
              $r3$.ɵɵelementHostStyleProp(1, ctx.myWidthProp);
              $r3$.ɵɵelementHostClassProp(0, ctx.myBarClass);
              $r3$.ɵɵelementHostClassProp(1, ctx.myFooClass);
              $r3$.ɵɵelementHostStylingApply();
            }
          },
          consts: 0,
          vars: 0,
          `;

      const result = compile(files, angularFiles);
      expectEmit(result.source, template, 'Incorrect template');
    });

    it('should generate override instructions for only single-level styling bindings when !important is present',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Component, NgModule, HostBinding} from '@angular/core';

                @Component({
                  selector: 'my-component',
                  template: \`
                    <div [style!important]="myStyleExp"
                         [class!important]="myClassExp"
                         [style.height!important]="myHeightExp"
                         [class.bar!important]="myBarClassExp"></div>
                  \`,
                  host: {
                    '[style!important]': 'myStyleExp',
                    '[class!important]': 'myClassExp'
                  }
                })
                export class MyComponent {
                  @HostBinding('class.foo!important')
                  myFooClassExp = true;

                  @HostBinding('style.width!important')
                  myWidthExp = '100px';

                  myBarClassExp = true;
                  myHeightExp = '200px';
                }

                @NgModule({declarations: [MyComponent]})
                export class MyModule {}
            `
           }
         };

         const template = `
            const _c2 = ["bar"];
            const _c3 = ["height"];
            …
            function MyComponent_Template(rf, ctx) {
              if (rf & 1) {
                $r3$.ɵɵelementStart(0, "div");
                $r3$.ɵɵelementStyling(_c2, _c3, $r3$.ɵɵdefaultStyleSanitizer);
                $r3$.ɵɵelementEnd();
              }
              if (rf & 2) {
                $r3$.ɵɵelementStylingMap(0, ctx.myClassExp, ctx.myStyleExp);
                $r3$.ɵɵelementStyleProp(0, 0, ctx.myHeightExp, null, true);
                $r3$.ɵɵelementClassProp(0, 0, ctx.myBarClassExp, true);
                $r3$.ɵɵelementStylingApply(0);
              }
            },
          `;

         const hostBindings = `
            const _c0 = ["foo"];
            const _c1 = ["width"];
            …
            hostBindings: function MyComponent_HostBindings(rf, ctx, elIndex) {
              if (rf & 1) {
                $r3$.ɵɵelementHostStyling(_c0, _c1, $r3$.ɵɵdefaultStyleSanitizer);
              }
              if (rf & 2) {
                $r3$.ɵɵelementHostStylingMap(ctx.myClassExp, ctx.myStyleExp);
                $r3$.ɵɵelementHostStyleProp(0, ctx.myWidthExp, null, true);
                $r3$.ɵɵelementHostClassProp(0, ctx.myFooClassExp, true);
                $r3$.ɵɵelementHostStylingApply();
              }
            },
          `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, hostBindings, 'Incorrect template');
         expectEmit(result.source, template, 'Incorrect template');
       });

    it('should generate styling instructions for multiple directives that contain host binding definitions',
       () => {
         const files = {
           app: {
             'spec.ts': `
                import {Directive, Component, NgModule, HostBinding} from '@angular/core';

                @Directive({selector: '[myClassDir]'})
                export class ClassDirective {
                  @HostBinding('class')
                  myClassMap = {red: true};
                }

                @Directive({selector: '[myWidthDir]'})
                export class WidthDirective {
                  @HostBinding('style.width')
                  myWidth = 200;

                  @HostBinding('class.foo')
                  myFooClass = true;
                }

                @Directive({selector: '[myHeightDir]'})
                export class HeightDirective {
                  @HostBinding('style.height')
                  myHeight = 200;

                  @HostBinding('class.bar')
                  myBarClass = true;
                }

                @Component({
                  selector: 'my-component',
                  template: '<div myWidthDir myHeightDir myClassDir></div>',
                })
                export class MyComponent {
                }

                @NgModule({declarations: [MyComponent, WidthDirective, HeightDirective, ClassDirective]})
                export class MyModule {}
            `
           }
         };

         const template = `
          const $widthDir_classes$ = ["foo"];
          const $widthDir_styles$ = ["width"];
          const $heightDir_classes$ = ["bar"];
          const $heightDir_styles$ = ["height"];
          …
          function ClassDirective_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostStyling();
            }
            if (rf & 2) {
              $r3$.ɵɵelementHostStylingMap(ctx.myClassMap);
              $r3$.ɵɵelementHostStylingApply();
            }
          }
          …
          function WidthDirective_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostStyling($widthDir_classes$, $widthDir_styles$);
            }
            if (rf & 2) {
              $r3$.ɵɵelementHostStyleProp(0, ctx.myWidth);
              $r3$.ɵɵelementHostClassProp(0, ctx.myFooClass);
              $r3$.ɵɵelementHostStylingApply();
            }
          }
          …
          function HeightDirective_HostBindings(rf, ctx, elIndex) {
            if (rf & 1) {
              $r3$.ɵɵelementHostStyling($heightDir_classes$, $heightDir_styles$);
            }
            if (rf & 2) {
              $r3$.ɵɵelementHostStyleProp(0, ctx.myHeight);
              $r3$.ɵɵelementHostClassProp(0, ctx.myBarClass);
              $r3$.ɵɵelementHostStylingApply();
            }
          }
          …
          `;

         const result = compile(files, angularFiles);
         expectEmit(result.source, template, 'Incorrect template');
       });
  });

  it('should count only non-style and non-class host bindings on Components', () => {
    const files = {
      app: {
        'spec.ts': `
          import {Component, NgModule, HostBinding} from '@angular/core';

          @Component({
            selector: 'my-component',
            template: '',
            host: {
              'style': 'width:200px; height:500px',
              'class': 'foo baz',
              'title': 'foo title'
            }
          })
          export class MyComponent {
            @HostBinding('style')
            myStyle = {width:'100px'};

            @HostBinding('class')
            myClass = {bar:false};

            @HostBinding('id')
            id = 'some id';

            @HostBinding('title')
            title = 'some title';

            @Input('name')
            name = '';
          }

          @NgModule({declarations: [MyComponent]})
          export class MyModule {}
        `
      }
    };

    const template = `
      const $_c0$ = ["title", "foo title", ${AttributeMarker.Classes}, "foo", "baz", ${AttributeMarker.Styles}, "width", "200px", "height", "500px"];
      …
      hostBindings: function MyComponent_HostBindings(rf, ctx, elIndex) {
        if (rf & 1) {
          $r3$.ɵɵallocHostVars(2);
          $r3$.ɵɵelementHostAttrs($_c0$);
          $r3$.ɵɵelementHostStyling(null, null, $r3$.ɵɵdefaultStyleSanitizer);
        }
        if (rf & 2) {
          $r3$.ɵɵproperty("id", ctx.id, null, true);
          $r3$.ɵɵproperty("title", ctx.title, null, true);
          $r3$.ɵɵelementHostStylingMap(ctx.myClass, ctx.myStyle);
          $r3$.ɵɵelementHostStylingApply();
        }
      }
    `;

    const result = compile(files, angularFiles);
    expectEmit(result.source, template, 'Incorrect template');
  });

  it('should count only non-style and non-class host bindings on Directives', () => {
    const files = {
      app: {
        'spec.ts': `
          import {Directive, Component, NgModule, HostBinding} from '@angular/core';

          @Directive({selector: '[myWidthDir]'})
          export class WidthDirective {
            @HostBinding('style.width')
            myWidth = 200;

            @HostBinding('class.foo')
            myFooClass = true;

            @HostBinding('id')
            id = 'some id';

            @HostBinding('title')
            title = 'some title';
          }
        `
      }
    };

    const template = `
      const $_c0$ = ["foo"];
      const $_c1$ = ["width"];
      …
      hostBindings: function WidthDirective_HostBindings(rf, ctx, elIndex) {
        if (rf & 1) {
          $r3$.ɵɵallocHostVars(2);
          $r3$.ɵɵelementHostStyling($_c0$, $_c1$);
        }
        if (rf & 2) {
          $r3$.ɵɵproperty("id", ctx.id, null, true);
          $r3$.ɵɵproperty("title", ctx.title, null, true);
          $r3$.ɵɵelementHostStyleProp(0, ctx.myWidth);
          $r3$.ɵɵelementHostClassProp(0, ctx.myFooClass);
          $r3$.ɵɵelementHostStylingApply();
        }
      }
    `;

    const result = compile(files, angularFiles);
    expectEmit(result.source, template, 'Incorrect template');
  });
});
