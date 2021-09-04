/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {EmbeddedViewRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {withBody} from '@angular/private/testing';

import {ChangeDetectionStrategy, ChangeDetectorRef, DoCheck, RendererType2} from '../../src/core';
import {whenRendered} from '../../src/render3/component';
import {LifecycleHooksFeature, getRenderedText, ɵɵNgOnChangesFeature, ɵɵdefineComponent, ɵɵdefineDirective, ɵɵgetCurrentView, ɵɵtemplateRefExtractor} from '../../src/render3/index';
import {detectChanges, markDirty, tick, ɵɵbind, ɵɵcontainer, ɵɵcontainerRefreshEnd, ɵɵcontainerRefreshStart, ɵɵdirectiveInject, ɵɵelement, ɵɵelementEnd, ɵɵelementProperty, ɵɵelementStart, ɵɵembeddedViewEnd, ɵɵembeddedViewStart, ɵɵinterpolation1, ɵɵinterpolation2, ɵɵlistener, ɵɵreference, ɵɵtemplate, ɵɵtext, ɵɵtextBinding} from '../../src/render3/instructions/all';
import {RenderFlags} from '../../src/render3/interfaces/definition';
import {RElement, Renderer3, RendererFactory3} from '../../src/render3/interfaces/renderer';
import {FLAGS, LViewFlags} from '../../src/render3/interfaces/view';

import {ComponentFixture, containerEl, createComponent, renderComponent, requestAnimationFrame} from './render_util';

describe('change detection', () => {
  describe('markDirty, detectChanges, whenRendered, getRenderedText', () => {
    class MyComponent implements DoCheck {
      value: string = 'works';
      doCheckCount = 0;
      ngDoCheck(): void { this.doCheckCount++; }

      static ngComponentDef = ɵɵdefineComponent({
        type: MyComponent,
        selectors: [['my-comp']],
        factory: () => new MyComponent(),
        consts: 2,
        vars: 1,
        template: (rf: RenderFlags, ctx: MyComponent) => {
          if (rf & RenderFlags.Create) {
            ɵɵelementStart(0, 'span');
            ɵɵtext(1);
            ɵɵelementEnd();
          }
          if (rf & RenderFlags.Update) {
            ɵɵtextBinding(1, ɵɵbind(ctx.value));
          }
        }
      });
    }

    it('should mark a component dirty and schedule change detection', withBody('my-comp', () => {
         const myComp = renderComponent(MyComponent, {hostFeatures: [LifecycleHooksFeature]});
         expect(getRenderedText(myComp)).toEqual('works');
         myComp.value = 'updated';
         markDirty(myComp);
         expect(getRenderedText(myComp)).toEqual('works');
         requestAnimationFrame.flush();
         expect(getRenderedText(myComp)).toEqual('updated');
       }));

    it('should detectChanges on a component', withBody('my-comp', () => {
         const myComp = renderComponent(MyComponent, {hostFeatures: [LifecycleHooksFeature]});
         expect(getRenderedText(myComp)).toEqual('works');
         myComp.value = 'updated';
         detectChanges(myComp);
         expect(getRenderedText(myComp)).toEqual('updated');
       }));

    it('should detectChanges only once if markDirty is called multiple times',
       withBody('my-comp', () => {
         const myComp = renderComponent(MyComponent, {hostFeatures: [LifecycleHooksFeature]});
         expect(getRenderedText(myComp)).toEqual('works');
         expect(myComp.doCheckCount).toBe(1);
         myComp.value = 'ignore';
         markDirty(myComp);
         myComp.value = 'updated';
         markDirty(myComp);
         expect(getRenderedText(myComp)).toEqual('works');
         requestAnimationFrame.flush();
         expect(getRenderedText(myComp)).toEqual('updated');
         expect(myComp.doCheckCount).toBe(2);
       }));

    it('should notify whenRendered', withBody('my-comp', async() => {
         const myComp = renderComponent(MyComponent, {hostFeatures: [LifecycleHooksFeature]});
         await whenRendered(myComp);
         myComp.value = 'updated';
         markDirty(myComp);
         setTimeout(requestAnimationFrame.flush, 0);
         await whenRendered(myComp);
         expect(getRenderedText(myComp)).toEqual('updated');
       }));
  });

  describe('onPush', () => {
    let comp: MyComponent;

    class MyComponent implements DoCheck {
      /* @Input() */
      name = 'Nancy';
      doCheckCount = 0;

      ngDoCheck(): void { this.doCheckCount++; }

      onClick() {}

      static ngComponentDef = ɵɵdefineComponent({
        type: MyComponent,
        selectors: [['my-comp']],
        factory: () => comp = new MyComponent(),
        consts: 2,
        vars: 2,
        /**
         * {{ doCheckCount }} - {{ name }}
         * <button (click)="onClick()"></button>
         */
        template: (rf: RenderFlags, ctx: MyComponent) => {
          if (rf & RenderFlags.Create) {
            ɵɵtext(0);
            ɵɵelementStart(1, 'button');
            {
              ɵɵlistener('click', () => { ctx.onClick(); });
            }
            ɵɵelementEnd();
          }
          if (rf & RenderFlags.Update) {
            ɵɵtextBinding(0, ɵɵinterpolation2('', ctx.doCheckCount, ' - ', ctx.name, ''));
          }
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
        inputs: {name: 'name'}
      });
    }

    class MyApp {
      name: string = 'Nancy';

      static ngComponentDef = ɵɵdefineComponent({
        type: MyApp,
        selectors: [['my-app']],
        factory: () => new MyApp(),
        consts: 1,
        vars: 1,
        /** <my-comp [name]="name"></my-comp> */
        template: (rf: RenderFlags, ctx: MyApp) => {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'my-comp');
          }
          if (rf & RenderFlags.Update) {
            ɵɵelementProperty(0, 'name', ɵɵbind(ctx.name));
          }
        },
        directives: () => [MyComponent]
      });
    }

    it('should check OnPush components on initialization', () => {
      const myApp = renderComponent(MyApp);
      expect(getRenderedText(myApp)).toEqual('1 - Nancy');
    });

    it('should call doCheck even when OnPush components are not dirty', () => {
      const myApp = renderComponent(MyApp);

      tick(myApp);
      expect(comp.doCheckCount).toEqual(2);

      tick(myApp);
      expect(comp.doCheckCount).toEqual(3);
    });

    it('should skip OnPush components in update mode when they are not dirty', () => {
      const myApp = renderComponent(MyApp);

      tick(myApp);
      // doCheckCount is 2, but 1 should be rendered since it has not been marked dirty.
      expect(getRenderedText(myApp)).toEqual('1 - Nancy');

      tick(myApp);
      // doCheckCount is 3, but 1 should be rendered since it has not been marked dirty.
      expect(getRenderedText(myApp)).toEqual('1 - Nancy');
    });

    it('should check OnPush components in update mode when inputs change', () => {
      const myApp = renderComponent(MyApp);

      myApp.name = 'Bess';
      tick(myApp);
      expect(comp.doCheckCount).toEqual(2);
      // View should update, as changed input marks view dirty
      expect(getRenderedText(myApp)).toEqual('2 - Bess');

      myApp.name = 'George';
      tick(myApp);
      // View should update, as changed input marks view dirty
      expect(comp.doCheckCount).toEqual(3);
      expect(getRenderedText(myApp)).toEqual('3 - George');

      tick(myApp);
      expect(comp.doCheckCount).toEqual(4);
      // View should not be updated to "4", as inputs have not changed.
      expect(getRenderedText(myApp)).toEqual('3 - George');
    });

    it('should check OnPush components in update mode when component events occur', () => {
      const myApp = renderComponent(MyApp);
      expect(comp.doCheckCount).toEqual(1);
      expect(getRenderedText(myApp)).toEqual('1 - Nancy');

      const button = containerEl.querySelector('button') !;
      button.click();
      requestAnimationFrame.flush();
      // No ticks should have been scheduled.
      expect(comp.doCheckCount).toEqual(1);
      expect(getRenderedText(myApp)).toEqual('1 - Nancy');

      tick(myApp);
      // Because the onPush comp should be dirty, it should update once CD runs
      expect(comp.doCheckCount).toEqual(2);
      expect(getRenderedText(myApp)).toEqual('2 - Nancy');
    });

    it('should not check OnPush components in update mode when parent events occur', () => {
      function noop() {}

      const ButtonParent = createComponent('button-parent', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'my-comp');
          ɵɵelementStart(1, 'button', ['id', 'parent']);
          { ɵɵlistener('click', () => noop()); }
          ɵɵelementEnd();
        }
      }, 2, 0, [MyComponent]);

      const buttonParent = renderComponent(ButtonParent);
      expect(getRenderedText(buttonParent)).toEqual('1 - Nancy');

      const button = containerEl.querySelector('button#parent') !;
      (button as HTMLButtonElement).click();
      tick(buttonParent);
      // The comp should still be clean. So doCheck will run, but the view should display 1.
      expect(comp.doCheckCount).toEqual(2);
      expect(getRenderedText(buttonParent)).toEqual('1 - Nancy');
    });

    it('should check parent OnPush components in update mode when child events occur', () => {
      let parent: ButtonParent;

      class ButtonParent implements DoCheck {
        doCheckCount = 0;
        ngDoCheck(): void { this.doCheckCount++; }

        static ngComponentDef = ɵɵdefineComponent({
          type: ButtonParent,
          selectors: [['button-parent']],
          factory: () => parent = new ButtonParent(),
          consts: 2,
          vars: 1,
          /** {{ doCheckCount }} - <my-comp></my-comp> */
          template: (rf: RenderFlags, ctx: ButtonParent) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
              ɵɵelement(1, 'my-comp');
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.doCheckCount, ' - '));
            }
          },
          directives: () => [MyComponent],
          changeDetection: ChangeDetectionStrategy.OnPush
        });
      }

      const MyButtonApp = createComponent('my-button-app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'button-parent');
        }
      }, 1, 0, [ButtonParent]);

      const myButtonApp = renderComponent(MyButtonApp);
      expect(parent !.doCheckCount).toEqual(1);
      expect(comp !.doCheckCount).toEqual(1);
      expect(getRenderedText(myButtonApp)).toEqual('1 - 1 - Nancy');

      tick(myButtonApp);
      expect(parent !.doCheckCount).toEqual(2);
      // parent isn't checked, so child doCheck won't run
      expect(comp !.doCheckCount).toEqual(1);
      expect(getRenderedText(myButtonApp)).toEqual('1 - 1 - Nancy');

      const button = containerEl.querySelector('button');
      button !.click();
      requestAnimationFrame.flush();
      // No ticks should have been scheduled.
      expect(parent !.doCheckCount).toEqual(2);
      expect(comp !.doCheckCount).toEqual(1);

      tick(myButtonApp);
      expect(parent !.doCheckCount).toEqual(3);
      expect(comp !.doCheckCount).toEqual(2);
      expect(getRenderedText(myButtonApp)).toEqual('3 - 2 - Nancy');
    });

    describe('Manual mode', () => {
      class ManualComponent implements DoCheck {
        /* @Input() */
        name = 'Nancy';
        doCheckCount = 0;

        ngDoCheck(): void { this.doCheckCount++; }

        onClick() {}

        static ngComponentDef = ɵɵdefineComponent({
          type: ManualComponent,
          selectors: [['manual-comp']],
          factory: () => comp = new ManualComponent(),
          consts: 2,
          vars: 2,
          /**
           * {{ doCheckCount }} - {{ name }}
           * <button (click)="onClick()"></button>
           */
          template: (rf: RenderFlags, ctx: ManualComponent) => {
            if (rf & RenderFlags.Create) {
              // This is temporarily the only way to turn on manual change detection
              // because public API has not yet been added.
              const view = ɵɵgetCurrentView() as any;
              view[FLAGS] |= LViewFlags.ManualOnPush;

              ɵɵtext(0);
              ɵɵelementStart(1, 'button');
              {
                ɵɵlistener('click', () => { ctx.onClick(); });
              }
              ɵɵelementEnd();
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵinterpolation2('', ctx.doCheckCount, ' - ', ctx.name, ''));
            }
          },
          changeDetection: ChangeDetectionStrategy.OnPush,
          inputs: {name: 'name'}
        });
      }

      class ManualApp {
        name: string = 'Nancy';

        static ngComponentDef = ɵɵdefineComponent({
          type: ManualApp,
          selectors: [['manual-app']],
          factory: () => new ManualApp(),
          consts: 1,
          vars: 1,
          /** <manual-comp [name]="name"></manual-comp> */
          template: (rf: RenderFlags, ctx: ManualApp) => {
            if (rf & RenderFlags.Create) {
              ɵɵelement(0, 'manual-comp');
            }
            if (rf & RenderFlags.Update) {
              ɵɵelementProperty(0, 'name', ɵɵbind(ctx.name));
            }

          },
          directives: () => [ManualComponent]
        });
      }


      it('should not check OnPush components in update mode when component events occur, unless marked dirty',
         () => {
           const myApp = renderComponent(ManualApp);
           expect(comp.doCheckCount).toEqual(1);
           expect(getRenderedText(myApp)).toEqual('1 - Nancy');

           const button = containerEl.querySelector('button') !;
           button.click();
           requestAnimationFrame.flush();
           // No ticks should have been scheduled.
           expect(comp.doCheckCount).toEqual(1);
           expect(getRenderedText(myApp)).toEqual('1 - Nancy');

           tick(myApp);
           // The comp should still be clean. So doCheck will run, but the view should display 1.
           expect(comp.doCheckCount).toEqual(2);
           expect(getRenderedText(myApp)).toEqual('1 - Nancy');

           markDirty(comp);
           requestAnimationFrame.flush();
           // Now that markDirty has been manually called, the view should be dirty and a tick
           // should be scheduled to check the view.
           expect(comp.doCheckCount).toEqual(3);
           expect(getRenderedText(myApp)).toEqual('3 - Nancy');
         });

      it('should not check parent OnPush components in update mode when child events occur, unless marked dirty',
         () => {
           let parent: ButtonParent;

           class ButtonParent implements DoCheck {
             doCheckCount = 0;
             ngDoCheck(): void { this.doCheckCount++; }

             static ngComponentDef = ɵɵdefineComponent({
               type: ButtonParent,
               selectors: [['button-parent']],
               factory: () => parent = new ButtonParent(),
               consts: 2,
               vars: 1,
               /** {{ doCheckCount }} - <manual-comp></manual-comp> */
               template: (rf: RenderFlags, ctx: ButtonParent) => {
                 if (rf & RenderFlags.Create) {
                   ɵɵtext(0);
                   ɵɵelement(1, 'manual-comp');
                 }
                 if (rf & RenderFlags.Update) {
                   ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.doCheckCount, ' - '));
                 }
               },
               directives: () => [ManualComponent],
               changeDetection: ChangeDetectionStrategy.OnPush
             });
           }

           const MyButtonApp =
               createComponent('my-button-app', function(rf: RenderFlags, ctx: any) {
                 if (rf & RenderFlags.Create) {
                   ɵɵelement(0, 'button-parent');
                 }
               }, 1, 0, [ButtonParent]);

           const myButtonApp = renderComponent(MyButtonApp);
           expect(parent !.doCheckCount).toEqual(1);
           expect(comp !.doCheckCount).toEqual(1);
           expect(getRenderedText(myButtonApp)).toEqual('1 - 1 - Nancy');

           tick(myButtonApp);
           expect(parent !.doCheckCount).toEqual(2);
           // parent isn't checked, so child doCheck won't run
           expect(comp !.doCheckCount).toEqual(1);
           expect(getRenderedText(myButtonApp)).toEqual('1 - 1 - Nancy');

           const button = containerEl.querySelector('button');
           button !.click();
           requestAnimationFrame.flush();
           // No ticks should have been scheduled.
           expect(parent !.doCheckCount).toEqual(2);
           expect(comp !.doCheckCount).toEqual(1);

           tick(myButtonApp);
           expect(parent !.doCheckCount).toEqual(3);
           // parent isn't checked, so child doCheck won't run
           expect(comp !.doCheckCount).toEqual(1);
           expect(getRenderedText(myButtonApp)).toEqual('1 - 1 - Nancy');

           markDirty(comp);
           requestAnimationFrame.flush();
           // Now that markDirty has been manually called, both views should be dirty and a tick
           // should be scheduled to check the view.
           expect(parent !.doCheckCount).toEqual(4);
           expect(comp !.doCheckCount).toEqual(2);
           expect(getRenderedText(myButtonApp)).toEqual('4 - 2 - Nancy');
         });
    });
  });

  describe('ChangeDetectorRef', () => {

    describe('detectChanges()', () => {
      let myComp: MyComp;
      let dir: Dir;

      class MyComp {
        doCheckCount = 0;
        name = 'Nancy';

        constructor(public cdr: ChangeDetectorRef) {}

        ngDoCheck() { this.doCheckCount++; }

        static ngComponentDef = ɵɵdefineComponent({
          type: MyComp,
          selectors: [['my-comp']],
          factory: () => myComp = new MyComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 1,
          vars: 1,
          /** {{ name }} */
          template: (rf: RenderFlags, ctx: MyComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵbind(ctx.name));
            }
          },
          changeDetection: ChangeDetectionStrategy.OnPush
        });
      }

      class ParentComp {
        doCheckCount = 0;

        constructor(public cdr: ChangeDetectorRef) {}

        ngDoCheck() { this.doCheckCount++; }

        static ngComponentDef = ɵɵdefineComponent({
          type: ParentComp,
          selectors: [['parent-comp']],
          factory: () => new ParentComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 2,
          vars: 1,
          /**
           * {{ doCheckCount}} -
           * <my-comp></my-comp>
           */
          template: (rf: RenderFlags, ctx: ParentComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
              ɵɵelement(1, 'my-comp');
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.doCheckCount, ' - '));
            }
          },
          directives: () => [MyComp]
        });
      }

      class Dir {
        constructor(public cdr: ChangeDetectorRef) {}

        static ngDirectiveDef = ɵɵdefineDirective({
          type: Dir,
          selectors: [['', 'dir', '']],
          factory: () => dir = new Dir(ɵɵdirectiveInject(ChangeDetectorRef as any))
        });
      }


      it('should check the component view when called by component (even when OnPush && clean)',
         () => {
           const comp = renderComponent(MyComp, {hostFeatures: [LifecycleHooksFeature]});
           expect(getRenderedText(comp)).toEqual('Nancy');

           comp.name = 'Bess';  // as this is not an Input, the component stays clean
           comp.cdr.detectChanges();
           expect(getRenderedText(comp)).toEqual('Bess');
         });

      it('should NOT call component doCheck when called by a component', () => {
        const comp = renderComponent(MyComp, {hostFeatures: [LifecycleHooksFeature]});
        expect(comp.doCheckCount).toEqual(1);

        // NOTE: in current Angular, detectChanges does not itself trigger doCheck, but you
        // may see doCheck called in some cases bc of the extra CD run triggered by zone.js.
        // It's important not to call doCheck to allow calls to detectChanges in that hook.
        comp.cdr.detectChanges();
        expect(comp.doCheckCount).toEqual(1);
      });

      it('should NOT check the component parent when called by a child component', () => {
        const parentComp = renderComponent(ParentComp, {hostFeatures: [LifecycleHooksFeature]});
        expect(getRenderedText(parentComp)).toEqual('1 - Nancy');

        parentComp.doCheckCount = 100;
        myComp.cdr.detectChanges();
        expect(parentComp.doCheckCount).toEqual(100);
        expect(getRenderedText(parentComp)).toEqual('1 - Nancy');
      });

      it('should check component children when called by component if dirty or check-always',
         () => {
           const parentComp = renderComponent(ParentComp, {hostFeatures: [LifecycleHooksFeature]});
           expect(parentComp.doCheckCount).toEqual(1);

           myComp.name = 'Bess';
           parentComp.cdr.detectChanges();
           expect(parentComp.doCheckCount).toEqual(1);
           expect(myComp.doCheckCount).toEqual(2);
           // OnPush child is not dirty, so its change isn't rendered.
           expect(getRenderedText(parentComp)).toEqual('1 - Nancy');
         });

      it('should not group detectChanges calls (call every time)', () => {
        const parentComp = renderComponent(ParentComp, {hostFeatures: [LifecycleHooksFeature]});
        expect(myComp.doCheckCount).toEqual(1);

        parentComp.cdr.detectChanges();
        parentComp.cdr.detectChanges();
        expect(myComp.doCheckCount).toEqual(3);
      });

      it('should check component view when called by directive on component node', () => {
        /** <my-comp dir></my-comp> */
        const MyApp = createComponent('my-app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'my-comp', ['dir', '']);
          }
        }, 1, 0, [MyComp, Dir]);

        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('Nancy');

        myComp.name = 'George';
        dir !.cdr.detectChanges();
        expect(getRenderedText(app)).toEqual('George');
      });

      it('should check host component when called by directive on element node', () => {
        /**
         * {{ name }}
         * <div dir></div>
         */
        const MyApp = createComponent('my-app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵtext(0);
            ɵɵelement(1, 'div', ['dir', '']);
          }
          if (rf & RenderFlags.Update) {
            ɵɵtextBinding(1, ɵɵbind(ctx.value));
          }
        }, 2, 1, [Dir]);

        const app = renderComponent(MyApp);
        app.value = 'Frank';
        tick(app);
        expect(getRenderedText(app)).toEqual('Frank');

        app.value = 'Joe';
        dir !.cdr.detectChanges();
        expect(getRenderedText(app)).toEqual('Joe');
      });

      it('should check the host component when called from EmbeddedViewRef', () => {
        class MyApp {
          showing = true;
          name = 'Amelia';

          constructor(public cdr: ChangeDetectorRef) {}

          static ngComponentDef = ɵɵdefineComponent({
            type: MyApp,
            selectors: [['my-app']],
            factory: () => new MyApp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
            consts: 2,
            vars: 1,
            /**
             * {{ name}}
             * % if (showing) {
           *   <div dir></div>
           * % }
             */
            template: function(rf: RenderFlags, ctx: MyApp) {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
                ɵɵcontainer(1);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵbind(ctx.name));
                ɵɵcontainerRefreshStart(1);
                {
                  if (ctx.showing) {
                    let rf0 = ɵɵembeddedViewStart(0, 1, 0);
                    if (rf0 & RenderFlags.Create) {
                      ɵɵelement(0, 'div', ['dir', '']);
                    }
                  }
                  ɵɵembeddedViewEnd();
                }
                ɵɵcontainerRefreshEnd();
              }
            },
            directives: [Dir]
          });
        }

        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('Amelia');

        app.name = 'Emerson';
        dir !.cdr.detectChanges();
        expect(getRenderedText(app)).toEqual('Emerson');
      });

      it('should support call in ngOnInit', () => {
        class DetectChangesComp {
          value = 0;

          constructor(public cdr: ChangeDetectorRef) {}

          ngOnInit() {
            this.value++;
            this.cdr.detectChanges();
          }

          static ngComponentDef = ɵɵdefineComponent({
            type: DetectChangesComp,
            selectors: [['detect-changes-comp']],
            factory: () => new DetectChangesComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
            consts: 1,
            vars: 1,
            /** {{ value }} */
            template: (rf: RenderFlags, ctx: DetectChangesComp) => {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵbind(ctx.value));
              }
            }
          });
        }

        const comp = renderComponent(DetectChangesComp, {hostFeatures: [LifecycleHooksFeature]});
        expect(getRenderedText(comp)).toEqual('1');
      });


      ['OnInit', 'AfterContentInit', 'AfterViewInit', 'OnChanges'].forEach(hook => {
        it(`should not go infinite loop when recursively called from children's ng${hook}`, () => {
          class ChildComp {
            // @Input
            inp = '';

            count = 0;
            constructor(public parentComp: ParentComp) {}

            ngOnInit() { this.check('OnInit'); }
            ngAfterContentInit() { this.check('AfterContentInit'); }
            ngAfterViewInit() { this.check('AfterViewInit'); }
            ngOnChanges() { this.check('OnChanges'); }

            check(h: string) {
              if (h === hook) {
                this.count++;
                if (this.count > 1) throw new Error(`ng${hook} should be called only once!`);
                this.parentComp.triggerChangeDetection();
              }
            }

            static ngComponentDef = ɵɵdefineComponent({
              type: ChildComp,
              selectors: [['child-comp']],
              factory: () => new ChildComp(ɵɵdirectiveInject(ParentComp as any)),
              consts: 1,
              vars: 0,
              template: (rf: RenderFlags, ctx: ChildComp) => {
                if (rf & RenderFlags.Create) {
                  ɵɵtext(0, 'foo');
                }
              },
              inputs: {inp: 'inp'},
              features: [ɵɵNgOnChangesFeature]
            });
          }

          class ParentComp {
            constructor(public cdr: ChangeDetectorRef) {}

            triggerChangeDetection() { this.cdr.detectChanges(); }

            static ngComponentDef = ɵɵdefineComponent({
              type: ParentComp,
              selectors: [['parent-comp']],
              factory: () => new ParentComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
              consts: 1,
              vars: 1,
              /** {{ value }} */
              template: (rf: RenderFlags, ctx: ParentComp) => {
                if (rf & RenderFlags.Create) {
                  ɵɵelement(0, 'child-comp');
                }
                if (rf & RenderFlags.Update) {
                  ɵɵelementProperty(0, 'inp', ɵɵbind(true));
                }
              },
              directives: [ChildComp]
            });
          }

          expect(() => renderComponent(ParentComp)).not.toThrow();
        });
      });

      it('should support call in ngDoCheck', () => {
        class DetectChangesComp {
          doCheckCount = 0;

          constructor(public cdr: ChangeDetectorRef) {}

          ngDoCheck() {
            this.doCheckCount++;
            this.cdr.detectChanges();
          }

          static ngComponentDef = ɵɵdefineComponent({
            type: DetectChangesComp,
            selectors: [['detect-changes-comp']],
            factory: () => new DetectChangesComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
            consts: 1,
            vars: 1,
            /** {{ doCheckCount }} */
            template: (rf: RenderFlags, ctx: DetectChangesComp) => {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵbind(ctx.doCheckCount));
              }
            }
          });
        }

        const comp = renderComponent(DetectChangesComp, {hostFeatures: [LifecycleHooksFeature]});
        expect(getRenderedText(comp)).toEqual('1');
      });

      describe('dynamic views', () => {
        let structuralComp: StructuralComp|null = null;

        beforeEach(() => structuralComp = null);

        class StructuralComp {
          tmp !: TemplateRef<any>;
          value = 'one';

          constructor(public vcr: ViewContainerRef) {}

          create() { return this.vcr.createEmbeddedView(this.tmp, this); }

          static ngComponentDef = ɵɵdefineComponent({
            type: StructuralComp,
            selectors: [['structural-comp']],
            factory: () => structuralComp =
                         new StructuralComp(ɵɵdirectiveInject(ViewContainerRef as any)),
            inputs: {tmp: 'tmp'},
            consts: 1,
            vars: 1,
            template: function(rf: RenderFlags, ctx: any) {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵbind(ctx.value));
              }
            }
          });
        }

        it('should support ViewRef.detectChanges()', () => {
          function FooTemplate(rf: RenderFlags, ctx: any) {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵbind(ctx.value));
            }
          }

          /**
           * <ng-template #foo>{{ value }}</ng-template>
           * <structural-comp [tmp]="foo"></structural-comp>
           */
          const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
            if (rf & RenderFlags.Create) {
              ɵɵtemplate(
                  0, FooTemplate, 1, 1, 'ng-template', null, ['foo', ''], ɵɵtemplateRefExtractor);
              ɵɵelement(2, 'structural-comp');
            }
            if (rf & RenderFlags.Update) {
              const foo = ɵɵreference(1) as any;
              ɵɵelementProperty(2, 'tmp', ɵɵbind(foo));
            }
          }, 3, 1, [StructuralComp]);

          const fixture = new ComponentFixture(App);
          fixture.update();
          expect(fixture.html).toEqual('<structural-comp>one</structural-comp>');

          const viewRef: EmbeddedViewRef<any> = structuralComp !.create();
          fixture.update();
          expect(fixture.html).toEqual('<structural-comp>one</structural-comp>one');

          // check embedded view update
          structuralComp !.value = 'two';
          viewRef.detectChanges();
          expect(fixture.html).toEqual('<structural-comp>one</structural-comp>two');

          // check root view update
          structuralComp !.value = 'three';
          fixture.update();
          expect(fixture.html).toEqual('<structural-comp>three</structural-comp>three');
        });

        it('should support ViewRef.detectChanges() directly after creation', () => {
          function FooTemplate(rf: RenderFlags, ctx: any) {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0, 'Template text');
            }
          }

          /**
           * <ng-template #foo>Template text</ng-template>
           * <structural-comp [tmp]="foo"></structural-comp>
           */
          const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
            if (rf & RenderFlags.Create) {
              ɵɵtemplate(
                  0, FooTemplate, 1, 0, 'ng-template', null, ['foo', ''], ɵɵtemplateRefExtractor);
              ɵɵelement(2, 'structural-comp');
            }
            if (rf & RenderFlags.Update) {
              const foo = ɵɵreference(1) as any;
              ɵɵelementProperty(2, 'tmp', ɵɵbind(foo));
            }
          }, 3, 1, [StructuralComp]);

          const fixture = new ComponentFixture(App);
          fixture.update();
          expect(fixture.html).toEqual('<structural-comp>one</structural-comp>');

          const viewRef: EmbeddedViewRef<any> = structuralComp !.create();
          viewRef.detectChanges();
          expect(fixture.html).toEqual('<structural-comp>one</structural-comp>Template text');
        });

      });

    });

    describe('attach/detach', () => {
      let comp: DetachedComp;

      class MyApp {
        constructor(public cdr: ChangeDetectorRef) {}

        static ngComponentDef = ɵɵdefineComponent({
          type: MyApp,
          selectors: [['my-app']],
          factory: () => new MyApp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 1,
          vars: 0,
          /** <detached-comp></detached-comp> */
          template: (rf: RenderFlags, ctx: MyApp) => {
            if (rf & RenderFlags.Create) {
              ɵɵelement(0, 'detached-comp');
            }
          },
          directives: () => [DetachedComp]
        });
      }

      class DetachedComp {
        value = 'one';
        doCheckCount = 0;

        constructor(public cdr: ChangeDetectorRef) {}

        ngDoCheck() { this.doCheckCount++; }

        static ngComponentDef = ɵɵdefineComponent({
          type: DetachedComp,
          selectors: [['detached-comp']],
          factory: () => comp = new DetachedComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 1,
          vars: 1,
          /** {{ value }} */
          template: (rf: RenderFlags, ctx: DetachedComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵbind(ctx.value));
            }
          }
        });
      }

      it('should not check detached components', () => {
        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('one');

        comp.cdr.detach();

        comp.value = 'two';
        tick(app);
        expect(getRenderedText(app)).toEqual('one');
      });

      it('should check re-attached components', () => {
        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('one');

        comp.cdr.detach();
        comp.value = 'two';

        comp.cdr.reattach();
        tick(app);
        expect(getRenderedText(app)).toEqual('two');
      });

      it('should call lifecycle hooks on detached components', () => {
        const app = renderComponent(MyApp);
        expect(comp.doCheckCount).toEqual(1);

        comp.cdr.detach();

        tick(app);
        expect(comp.doCheckCount).toEqual(2);
      });

      it('should check detached component when detectChanges is called', () => {
        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('one');

        comp.cdr.detach();

        comp.value = 'two';
        detectChanges(comp);
        expect(getRenderedText(app)).toEqual('two');
      });

      it('should not check detached component when markDirty is called', () => {
        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('one');

        comp.cdr.detach();

        comp.value = 'two';
        markDirty(comp);
        requestAnimationFrame.flush();

        expect(getRenderedText(app)).toEqual('one');
      });

      it('should detach any child components when parent is detached', () => {
        const app = renderComponent(MyApp);
        expect(getRenderedText(app)).toEqual('one');

        app.cdr.detach();

        comp.value = 'two';
        tick(app);
        expect(getRenderedText(app)).toEqual('one');

        app.cdr.reattach();

        tick(app);
        expect(getRenderedText(app)).toEqual('two');
      });

      it('should detach OnPush components properly', () => {
        let onPushComp: OnPushComp;

        class OnPushComp {
          /** @Input() */
          // TODO(issue/24571): remove '!'.
          value !: string;

          constructor(public cdr: ChangeDetectorRef) {}

          static ngComponentDef = ɵɵdefineComponent({
            type: OnPushComp,
            selectors: [['on-push-comp']],
            factory: () => onPushComp = new OnPushComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
            consts: 1,
            vars: 1,
            /** {{ value }} */
            template: (rf: RenderFlags, ctx: any) => {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵbind(ctx.value));
              }
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            inputs: {value: 'value'}
          });
        }

        /** <on-push-comp [value]="value"></on-push-comp> */
        const OnPushApp = createComponent('on-push-app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'on-push-comp');
          }
          if (rf & RenderFlags.Update) {
            ɵɵelementProperty(0, 'value', ɵɵbind(ctx.value));
          }
        }, 1, 1, [OnPushComp]);

        const app = renderComponent(OnPushApp);
        app.value = 'one';
        tick(app);
        expect(getRenderedText(app)).toEqual('one');

        onPushComp !.cdr.detach();

        app.value = 'two';
        tick(app);
        expect(getRenderedText(app)).toEqual('one');

        onPushComp !.cdr.reattach();

        tick(app);
        expect(getRenderedText(app)).toEqual('two');
      });

    });

    describe('markForCheck()', () => {
      let comp: OnPushComp;

      class OnPushComp {
        value = 'one';

        doCheckCount = 0;

        constructor(public cdr: ChangeDetectorRef) {}

        ngDoCheck() { this.doCheckCount++; }

        static ngComponentDef = ɵɵdefineComponent({
          type: OnPushComp,
          selectors: [['on-push-comp']],
          factory: () => comp = new OnPushComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 1,
          vars: 1,
          /** {{ value }} */
          template: (rf: RenderFlags, ctx: OnPushComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵbind(ctx.value));
            }
          },
          changeDetection: ChangeDetectionStrategy.OnPush
        });
      }

      class OnPushParent {
        value = 'one';

        static ngComponentDef = ɵɵdefineComponent({
          type: OnPushParent,
          selectors: [['on-push-parent']],
          factory: () => new OnPushParent(),
          consts: 2,
          vars: 1,
          /**
           * {{ value }} -
           * <on-push-comp></on-push-comp>
           */
          template: (rf: RenderFlags, ctx: OnPushParent) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
              ɵɵelement(1, 'on-push-comp');
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.value, ' - '));
            }
          },
          directives: () => [OnPushComp],
          changeDetection: ChangeDetectionStrategy.OnPush
        });
      }

      it('should ensure OnPush components are checked', () => {
        const fixture = new ComponentFixture(OnPushParent);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        comp.value = 'two';
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        comp.cdr.markForCheck();

        // Change detection should not have run yet, since markForCheck
        // does not itself schedule change detection.
        expect(fixture.hostElement.textContent).toEqual('one - one');

        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - two');
      });

      it('should never schedule change detection on its own', () => {
        const fixture = new ComponentFixture(OnPushParent);
        expect(comp.doCheckCount).toEqual(1);

        comp.cdr.markForCheck();
        comp.cdr.markForCheck();
        requestAnimationFrame.flush();

        expect(comp.doCheckCount).toEqual(1);
      });

      it('should ensure ancestor OnPush components are checked', () => {
        const fixture = new ComponentFixture(OnPushParent);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        fixture.component.value = 'two';
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        comp.cdr.markForCheck();
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('two - one');

      });

      it('should ensure OnPush components in embedded views are checked', () => {
        class EmbeddedViewParent {
          value = 'one';
          showing = true;

          static ngComponentDef = ɵɵdefineComponent({
            type: EmbeddedViewParent,
            selectors: [['embedded-view-parent']],
            factory: () => new EmbeddedViewParent(),
            consts: 2,
            vars: 1,
            /**
             * {{ value }} -
             * % if (ctx.showing) {
             *   <on-push-comp></on-push-comp>
             * % }
             */
            template: (rf: RenderFlags, ctx: any) => {
              if (rf & RenderFlags.Create) {
                ɵɵtext(0);
                ɵɵcontainer(1);
              }
              if (rf & RenderFlags.Update) {
                ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.value, ' - '));
                ɵɵcontainerRefreshStart(1);
                {
                  if (ctx.showing) {
                    let rf0 = ɵɵembeddedViewStart(0, 1, 0);
                    if (rf0 & RenderFlags.Create) {
                      ɵɵelement(0, 'on-push-comp');
                    }
                    ɵɵembeddedViewEnd();
                  }
                }
                ɵɵcontainerRefreshEnd();
              }
            },
            directives: () => [OnPushComp],
            changeDetection: ChangeDetectionStrategy.OnPush
          });
        }

        const fixture = new ComponentFixture(EmbeddedViewParent);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        comp.value = 'two';
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - one');

        comp.cdr.markForCheck();
        // markForCheck should not trigger change detection on its own.
        expect(fixture.hostElement.textContent).toEqual('one - one');

        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - two');

        fixture.component.value = 'two';
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('one - two');

        comp.cdr.markForCheck();
        tick(fixture.component);
        expect(fixture.hostElement.textContent).toEqual('two - two');
      });

      // TODO(kara): add test for dynamic views once bug fix is in
    });

    describe('checkNoChanges', () => {
      let comp: NoChangesComp;

      class NoChangesComp {
        value = 1;
        doCheckCount = 0;
        contentCheckCount = 0;
        viewCheckCount = 0;

        ngDoCheck() { this.doCheckCount++; }

        ngAfterContentChecked() { this.contentCheckCount++; }

        ngAfterViewChecked() { this.viewCheckCount++; }

        constructor(public cdr: ChangeDetectorRef) {}

        static ngComponentDef = ɵɵdefineComponent({
          type: NoChangesComp,
          selectors: [['no-changes-comp']],
          factory: () => comp = new NoChangesComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 1,
          vars: 1,
          template: (rf: RenderFlags, ctx: NoChangesComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵbind(ctx.value));
            }
          }
        });
      }

      class AppComp {
        value = 1;

        constructor(public cdr: ChangeDetectorRef) {}

        static ngComponentDef = ɵɵdefineComponent({
          type: AppComp,
          selectors: [['app-comp']],
          factory: () => new AppComp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
          consts: 2,
          vars: 1,
          /**
           * {{ value }} -
           * <no-changes-comp></no-changes-comp>
           */
          template: (rf: RenderFlags, ctx: AppComp) => {
            if (rf & RenderFlags.Create) {
              ɵɵtext(0);
              ɵɵelement(1, 'no-changes-comp');
            }
            if (rf & RenderFlags.Update) {
              ɵɵtextBinding(0, ɵɵinterpolation1('', ctx.value, ' - '));
            }
          },
          directives: () => [NoChangesComp]
        });
      }

      it('should throw if bindings in current view have changed', () => {
        const comp = renderComponent(NoChangesComp, {hostFeatures: [LifecycleHooksFeature]});

        expect(() => comp.cdr.checkNoChanges()).not.toThrow();

        comp.value = 2;
        expect(() => comp.cdr.checkNoChanges())
            .toThrowError(
                /ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '1'. Current value: '2'/gi);
      });

      it('should throw if interpolations in current view have changed', () => {
        const app = renderComponent(AppComp);

        expect(() => app.cdr.checkNoChanges()).not.toThrow();

        app.value = 2;
        expect(() => app.cdr.checkNoChanges())
            .toThrowError(
                /ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '1'. Current value: '2'/gi);
      });

      it('should throw if bindings in children of current view have changed', () => {
        const app = renderComponent(AppComp);

        expect(() => app.cdr.checkNoChanges()).not.toThrow();

        comp.value = 2;
        expect(() => app.cdr.checkNoChanges())
            .toThrowError(
                /ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '1'. Current value: '2'/gi);
      });

      it('should throw if bindings in embedded view have changed', () => {
        class EmbeddedViewApp {
          value = 1;
          showing = true;

          constructor(public cdr: ChangeDetectorRef) {}

          static ngComponentDef = ɵɵdefineComponent({
            type: EmbeddedViewApp,
            selectors: [['embedded-view-app']],
            factory: () => new EmbeddedViewApp(ɵɵdirectiveInject(ChangeDetectorRef as any)),
            consts: 1,
            vars: 0,
            /**
             * % if (showing) {
             *  {{ value }}
             * %}
             */
            template: (rf: RenderFlags, ctx: EmbeddedViewApp) => {
              if (rf & RenderFlags.Create) {
                ɵɵcontainer(0);
              }
              if (rf & RenderFlags.Update) {
                ɵɵcontainerRefreshStart(0);
                {
                  if (ctx.showing) {
                    let rf0 = ɵɵembeddedViewStart(0, 1, 1);
                    if (rf0 & RenderFlags.Create) {
                      ɵɵtext(0);
                    }
                    if (rf0 & RenderFlags.Update) {
                      ɵɵtextBinding(0, ɵɵbind(ctx.value));
                    }
                    ɵɵembeddedViewEnd();
                  }
                }
                ɵɵcontainerRefreshEnd();
              }
            }
          });
        }

        const app = renderComponent(EmbeddedViewApp);

        expect(() => app.cdr.checkNoChanges()).not.toThrow();

        app.value = 2;
        expect(() => app.cdr.checkNoChanges())
            .toThrowError(
                /ExpressionChangedAfterItHasBeenCheckedError: .+ Previous value: '1'. Current value: '2'/gi);
      });

      it('should NOT call lifecycle hooks', () => {
        const app = renderComponent(AppComp);
        expect(comp.doCheckCount).toEqual(1);
        expect(comp.contentCheckCount).toEqual(1);
        expect(comp.viewCheckCount).toEqual(1);

        comp.value = 2;
        expect(() => app.cdr.checkNoChanges()).toThrow();
        expect(comp.doCheckCount).toEqual(1);
        expect(comp.contentCheckCount).toEqual(1);
        expect(comp.viewCheckCount).toEqual(1);
      });

      it('should NOT throw if bindings in ancestors of current view have changed', () => {
        const app = renderComponent(AppComp);

        app.value = 2;
        expect(() => comp.cdr.checkNoChanges()).not.toThrow();
      });

    });

  });

  it('should call begin and end when the renderer factory implements them', () => {
    const log: string[] = [];

    const testRendererFactory: RendererFactory3 = {
      createRenderer: (hostElement: RElement | null, rendererType: RendererType2 | null):
                          Renderer3 => { return document; },
      begin: () => log.push('begin'),
      end: () => log.push('end'),
    };

    class MyComponent {
      get value(): string {
        log.push('detect changes');
        return 'works';
      }

      static ngComponentDef = ɵɵdefineComponent({
        type: MyComponent,
        selectors: [['my-comp']],
        factory: () => new MyComponent(),
        consts: 1,
        vars: 1,
        template: (rf: RenderFlags, ctx: MyComponent) => {
          if (rf & RenderFlags.Create) {
            ɵɵtext(0);
          }
          if (rf & RenderFlags.Update) {
            ɵɵtextBinding(0, ɵɵbind(ctx.value));
          }
        }
      });
    }

    const myComp = renderComponent(MyComponent, {rendererFactory: testRendererFactory});
    expect(getRenderedText(myComp)).toEqual('works');
    expect(log).toEqual(['begin', 'detect changes', 'end']);
  });

});
