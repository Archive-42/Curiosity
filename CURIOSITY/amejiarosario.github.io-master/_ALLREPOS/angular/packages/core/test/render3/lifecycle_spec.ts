/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ComponentFactoryResolver, OnDestroy, SimpleChange, SimpleChanges, ViewContainerRef} from '../../src/core';
import {AttributeMarker, ComponentTemplate, LifecycleHooksFeature, injectComponentFactoryResolver, ɵɵNgOnChangesFeature, ɵɵdefineComponent, ɵɵdefineDirective} from '../../src/render3/index';
import {markDirty, ɵɵbind, ɵɵcontainer, ɵɵcontainerRefreshEnd, ɵɵcontainerRefreshStart, ɵɵdirectiveInject, ɵɵelement, ɵɵelementEnd, ɵɵelementProperty, ɵɵelementStart, ɵɵembeddedViewEnd, ɵɵembeddedViewStart, ɵɵlistener, ɵɵprojection, ɵɵprojectionDef, ɵɵselect, ɵɵtemplate, ɵɵtext} from '../../src/render3/instructions/all';
import {RenderFlags} from '../../src/render3/interfaces/definition';

import {NgIf} from './common_with_def';
import {ComponentFixture, containerEl, createComponent, renderComponent, renderToHtml, requestAnimationFrame} from './render_util';

describe('lifecycles', () => {

  function getParentTemplate(name: string) {
    return (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵelement(0, name);
      }
      if (rf & RenderFlags.Update) {
        ɵɵelementProperty(0, 'val', ɵɵbind(ctx.val));
      }
    };
  }

  describe('onInit', () => {
    let events: string[];

    beforeEach(() => { events = []; });

    let Comp = createOnInitComponent('comp', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, 'div');
        { ɵɵprojection(1); }
        ɵɵelementEnd();
      }
    }, 2);
    let Parent = createOnInitComponent('parent', getParentTemplate('comp'), 1, 1, [Comp]);
    let ProjectedComp = createOnInitComponent('projected', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵtext(0, 'content');
      }
    }, 1);

    function createOnInitComponent(
        name: string, template: ComponentTemplate<any>, consts: number, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        val: string = '';
        ngOnInit() {
          if (!this.val) this.val = '';
          events.push(`${name}${this.val}`);
        }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          consts: consts,
          vars: vars,
          factory: () => new Component(),
          inputs: {val: 'val'}, template,
          directives: directives
        });
      };
    }

    class Directive {
      ngOnInit() { events.push('dir'); }

      static ngDirectiveDef = ɵɵdefineDirective(
          {type: Directive, selectors: [['', 'dir', '']], factory: () => new Directive()});
    }

    const directives = [Comp, Parent, ProjectedComp, Directive, NgIf];

    it('should call onInit method after inputs are set in creation mode (and not in update mode)',
       () => {
         /** <comp [val]="val"></comp> */
         const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
           if (rf & RenderFlags.Create) {
             ɵɵelement(0, 'comp');
           }
           if (rf & RenderFlags.Update) {
             ɵɵelementProperty(0, 'val', ɵɵbind(ctx.val));
           }
         }, 1, 1, directives);

         const fixture = new ComponentFixture(App);
         fixture.update();
         expect(events).toEqual(['comp']);

         fixture.component.val = '2';
         fixture.update();
         expect(events).toEqual(['comp']);
       });

    it('should be called on root component in creation mode', () => {
      const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
      expect(events).toEqual(['comp']);

      markDirty(comp);
      requestAnimationFrame.flush();
      expect(events).toEqual(['comp']);
    });

    it('should call parent onInit before child onInit', () => {
      /**
       * <parent></parent>
       * parent temp: <comp></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['parent', 'comp']);
    });

    it('should call all parent onInits across view before calling children onInits', () => {
      /**
       * <parent [val]="1"></parent>
       * <parent [val]="2"></parent>
       *
       * parent temp: <comp [val]="val"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵelement(1, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 2);
        }
      }, 2, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['parent1', 'parent2', 'comp1', 'comp2']);
    });


    it('should call onInit every time a new view is created (if block)', () => {
      /**
       * % if (!skip) {
       *   <comp></comp>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp']);

      fixture.component.skip = false;
      fixture.update();
      expect(events).toEqual(['comp', 'comp']);
    });


    it('should call onInit every time a new view is created (ngIf)', () => {

      function IfTemplate(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
      }

      /** <comp *ngIf="showing"></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, IfTemplate, 1, 0, 'comp', [AttributeMarker.Template, 'ngIf']);
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'ngIf', ɵɵbind(ctx.showing));
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);

      fixture.component.showing = true;
      fixture.update();
      expect(events).toEqual(['comp']);

      fixture.component.showing = false;
      fixture.update();
      expect(events).toEqual(['comp']);

      fixture.component.showing = true;
      fixture.update();
      expect(events).toEqual(['comp', 'comp']);
    });

    it('should call onInit for children of dynamically created components', () => {
      let viewContainerComp !: ViewContainerComp;

      class ViewContainerComp {
        constructor(public vcr: ViewContainerRef, public cfr: ComponentFactoryResolver) {}

        static ngComponentDef = ɵɵdefineComponent({
          type: ViewContainerComp,
          selectors: [['view-container-comp']],
          factory:
              () => viewContainerComp = new ViewContainerComp(
                  ɵɵdirectiveInject(ViewContainerRef as any), injectComponentFactoryResolver()),
          consts: 0,
          vars: 0,
          template: (rf: RenderFlags, ctx: ViewContainerComp) => {}
        });
      }

      const DynamicComp = createComponent('dynamic-comp', (rf: RenderFlags, ctx: any) => {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
      }, 1, 0, [Comp]);

      const fixture = new ComponentFixture(ViewContainerComp);
      expect(events).toEqual([]);

      viewContainerComp.vcr.createComponent(
          viewContainerComp.cfr.resolveComponentFactory(DynamicComp));
      fixture.update();
      expect(events).toEqual(['comp']);
    });

    it('should call onInit in hosts before their content children', () => {
      /**
       * <comp>
       *   <projected></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelementStart(1, 'projected'); }
          ɵɵelementEnd();
        }
      }, 2, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp', 'projected']);
    });

    it('should call onInit in host and its content children before next host', () => {
      /**
       * <comp [val]="1">
       *   <projected [val]="1"></projected>
       * </comp>
       * <comp [val]="2">
       *   <projected [val]="1"></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelementStart(1, 'projected'); }
          ɵɵelementEnd();
          ɵɵelementStart(2, 'comp');
          { ɵɵelementStart(3, 'projected'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 2);
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val', 2);
        }
      }, 4, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp1', 'projected1', 'comp2', 'projected2']);
    });

    it('should be called on directives after component', () => {
      /** <comp directive></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp', ['dir', '']);
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp', 'dir']);

      fixture.update();
      expect(events).toEqual(['comp', 'dir']);
    });

    it('should be called on directives on an element', () => {
      /** <div directive></div> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'div', ['dir', '']);
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['dir']);

      fixture.update();
      expect(events).toEqual(['dir']);
    });

    it('should call onInit properly in for loop', () => {
      /**
       *  <comp [val]="1"></comp>
       * % for (let j = 2; j < 5; j++) {
       *   <comp [val]="j"></comp>
       * % }
       *  <comp [val]="5"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
          ɵɵcontainer(1);
          ɵɵelement(2, 'comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 5);
          ɵɵcontainerRefreshStart(1);
          {
            for (let j = 2; j < 5; j++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', j);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 0, directives);

      const fixture = new ComponentFixture(App);
      // onInit is called top to bottom, so top level comps (1 and 5) are called
      // before the comps inside the for loop's embedded view (2, 3, and 4)
      expect(events).toEqual(['comp1', 'comp5', 'comp2', 'comp3', 'comp4']);
    });

    it('should call onInit properly in for loop with children', () => {
      /**
       *  <parent [val]="1"></parent>
       * % for (let j = 2; j < 5; j++) {
       *   <parent [val]="j"></parent>
       * % }
       *  <parent [val]="5"></parent>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵcontainer(1);
          ɵɵelement(2, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 5);
          ɵɵcontainerRefreshStart(1);
          {
            for (let j = 2; j < 5; j++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'parent');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', j);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 0, directives);

      const fixture = new ComponentFixture(App);
      // onInit is called top to bottom, so top level comps (1 and 5) are called
      // before the comps inside the for loop's embedded view (2, 3, and 4)
      expect(events).toEqual([
        'parent1', 'parent5', 'parent2', 'comp2', 'parent3', 'comp3', 'parent4', 'comp4', 'comp1',
        'comp5'
      ]);
    });

  });

  describe('doCheck', () => {
    let events: string[];
    let allEvents: string[];

    beforeEach(() => {
      events = [];
      allEvents = [];
    });

    let Comp = createDoCheckComponent('comp', (rf: RenderFlags, ctx: any) => {});
    let Parent = createDoCheckComponent('parent', getParentTemplate('comp'), 1, 1, [Comp]);

    function createDoCheckComponent(
        name: string, template: ComponentTemplate<any>, consts: number = 0, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        ngDoCheck() {
          events.push(name);
          allEvents.push('check ' + name);
        }

        ngOnInit() { allEvents.push('init ' + name); }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          factory: () => new Component(), template,
          consts: consts,
          vars: vars,
          directives: directives,
          inputs: {val: 'val'}
        });
      };
    }

    class Directive {
      ngDoCheck() { events.push('dir'); }

      static ngDirectiveDef = ɵɵdefineDirective(
          {type: Directive, selectors: [['', 'dir', '']], factory: () => new Directive()});
    }

    const directives = [Comp, Parent, Directive];

    it('should call doCheck on every refresh', () => {
      /** <comp></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.update();
      expect(events).toEqual(['comp', 'comp']);
    });

    it('should be called on root component', () => {
      const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
      expect(events).toEqual(['comp']);

      markDirty(comp);
      requestAnimationFrame.flush();
      expect(events).toEqual(['comp', 'comp']);
    });

    it('should call parent doCheck before child doCheck', () => {
      /**
       * <parent></parent>
       * parent temp: <comp></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['parent', 'comp']);
    });

    it('should call ngOnInit before ngDoCheck if creation mode', () => {
      /** <comp></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(allEvents).toEqual(['init comp', 'check comp']);

      fixture.update();
      expect(allEvents).toEqual(['init comp', 'check comp', 'check comp']);
    });

    it('should be called on directives after component', () => {
      /** <comp directive></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp', ['dir', '']);
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp', 'dir']);

      fixture.update();
      expect(events).toEqual(['comp', 'dir', 'comp', 'dir']);
    });

    it('should be called on directives on an element', () => {
      /** <div directive></div> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'div', ['dir', '']);
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['dir']);

      fixture.update();
      expect(events).toEqual(['dir', 'dir']);
    });

  });

  describe('afterContentInit', () => {
    let events: string[];
    let allEvents: string[];

    beforeEach(() => {
      events = [];
      allEvents = [];
    });

    let Comp = createAfterContentInitComp('comp', function(rf: RenderFlags, ctx: any) {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    }, 1);

    let Parent = createAfterContentInitComp('parent', function(rf: RenderFlags, ctx: any) {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, 'comp');
        { ɵɵprojection(1); }
        ɵɵelementEnd();
      }
      if (rf & RenderFlags.Update) {
        ɵɵelementProperty(0, 'val', ɵɵbind(ctx.val));
      }
    }, 2, 1, [Comp]);

    let ProjectedComp = createAfterContentInitComp('projected', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    }, 1);

    function createAfterContentInitComp(
        name: string, template: ComponentTemplate<any>, consts: number = 0, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        val: string = '';
        ngAfterContentInit() {
          events.push(`${name}${this.val}`);
          allEvents.push(`${name}${this.val} init`);
        }
        ngAfterContentChecked() { allEvents.push(`${name}${this.val} check`); }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          factory: () => new Component(),
          consts: consts,
          vars: vars,
          inputs: {val: 'val'},
          template: template,
          directives: directives
        });
      };
    }

    class Directive {
      ngAfterContentInit() { events.push('init'); }
      ngAfterContentChecked() { events.push('check'); }

      static ngDirectiveDef = ɵɵdefineDirective(
          {type: Directive, selectors: [['', 'dir', '']], factory: () => new Directive()});
    }

    function ForLoopWithChildrenTemplate(rf: RenderFlags, ctx: any) {
      if (rf & RenderFlags.Create) {
        ɵɵelementStart(0, 'parent');
        { ɵɵtext(1, 'content'); }
        ɵɵelementEnd();
        ɵɵcontainer(2);
        ɵɵelementStart(3, 'parent');
        { ɵɵtext(4, 'content'); }
        ɵɵelementEnd();
      }
      if (rf & RenderFlags.Update) {
        ɵɵelementProperty(0, 'val', 1);
        ɵɵselect(3);
        ɵɵelementProperty(3, 'val', 4);
        ɵɵcontainerRefreshStart(2);
        {
          for (let i = 2; i < 4; i++) {
            let rf1 = ɵɵembeddedViewStart(0, 2, 0);
            if (rf1 & RenderFlags.Create) {
              ɵɵelementStart(0, 'parent');
              { ɵɵtext(1, 'content'); }
              ɵɵelementEnd();
            }
            if (rf1 & RenderFlags.Update) {
              ɵɵelementProperty(0, 'val', i);
            }
            ɵɵembeddedViewEnd();
          }
        }
        ɵɵcontainerRefreshEnd();
      }
    }

    const directives = [Comp, Parent, ProjectedComp, Directive];

    it('should be called only in creation mode', () => {
      /** <comp>content</comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵtext(1, 'content'); }
          ɵɵelementEnd();
        }
      }, 2, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.update();
      expect(events).toEqual(['comp']);
    });

    it('should be called on root component in creation mode', () => {
      const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
      expect(events).toEqual(['comp']);

      markDirty(comp);
      requestAnimationFrame.flush();
      expect(events).toEqual(['comp']);
    });

    it('should be called on every init (if blocks)', () => {
      /**
       * % if (!skip) {
       *   <comp>content</comp>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 2, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelementStart(0, 'comp');
                { ɵɵtext(1, 'content'); }
                ɵɵelementEnd();
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp']);

      fixture.component.skip = false;
      fixture.update();
      expect(events).toEqual(['comp', 'comp']);
    });

    it('should be called in parents before children', () => {
      /**
       * <parent>content</parent>
       *
       * parent template: <comp><ng-content></ng-content></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'parent');
          { ɵɵtext(1, 'content'); }
          ɵɵelementEnd();
        }
      }, 2, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['parent', 'comp']);
    });

    it('should be called breadth-first in entire parent subtree before any children', () => {
      /**
       * <parent [val]="1">content</parent>
       * <parent [val]="2">content</parent>
       *
       * parent template: <comp [val]="val"><ng-content></ng-content></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'parent');
          { ɵɵtext(1, 'content'); }
          ɵɵelementEnd();
          ɵɵelementStart(2, 'parent');
          { ɵɵtext(3, 'content'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 2);
        }
      }, 4, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['parent1', 'parent2', 'comp1', 'comp2']);
    });

    it('should be called in projected components before their hosts', () => {
      /**
       * <parent>
       *   <projected>content</projected>
       * </parent>
       *
       * parent template:
       * <comp><ng-content></ng-content></comp>
       *
       * projected comp: <ng-content></ng-content>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'parent');
          {
            ɵɵelementStart(1, 'projected');
            { ɵɵtext(2, 'content'); }
            ɵɵelementEnd();
          }
          ɵɵelementEnd();
        }
      }, 3, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['projected', 'parent', 'comp']);
    });

    it('should be called in projected components and hosts before children', () => {
      /**
       * <parent [val]="1">
       *   <projected [val]="1">content</projected>
       * </parent>
       * * <parent [val]="2">
       *   <projected [val]="2">content</projected>
       * </parent>
       *
       * parent template:
       * <comp [val]="val"><ng-content></ng-content></comp>
       *
       * projected comp: <ng-content></ng-content>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'parent');
          {
            ɵɵelementStart(1, 'projected');
            { ɵɵtext(2, 'content'); }
            ɵɵelementEnd();
          }
          ɵɵelementEnd();
          ɵɵelementStart(3, 'parent');
          {
            ɵɵelementStart(4, 'projected');
            { ɵɵtext(5, 'content'); }
            ɵɵelementEnd();
          }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 1);
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val', 2);
          ɵɵselect(4);
          ɵɵelementProperty(4, 'val', 2);
        }
      }, 6, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['projected1', 'parent1', 'projected2', 'parent2', 'comp1', 'comp2']);
    });

    it('should be called in correct order in a for loop', () => {
      /**
       * <comp [val]="1">content</comp>
       * % for(let i = 2; i < 4; i++) {
       *   <comp [val]="i">content</comp>
       * % }
       * <comp [val]="4">content</comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵtext(1, 'content'); }
          ɵɵelementEnd();
          ɵɵcontainer(2);
          ɵɵelementStart(3, 'comp');
          { ɵɵtext(4, 'content'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val', 4);
          ɵɵcontainerRefreshStart(2);
          {
            for (let i = 2; i < 4; i++) {
              let rf1 = ɵɵembeddedViewStart(0, 2, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelementStart(0, 'comp');
                { ɵɵtext(1, 'content'); }
                ɵɵelementEnd();
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', i);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 5, 0, directives);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp2', 'comp3', 'comp1', 'comp4']);
    });

    it('should be called in correct order in a for loop with children', () => {
      /**
       * <parent [val]="1">content</parent>
       * % for(let i = 2; i < 4; i++) {
       *   <parent [val]="i">content</parent>
       * % }
       * <parent [val]="4">content</parent>
       */

      renderToHtml(ForLoopWithChildrenTemplate, {}, 5, 0, directives);
      expect(events).toEqual(
          ['parent2', 'comp2', 'parent3', 'comp3', 'parent1', 'parent4', 'comp1', 'comp4']);
    });

    describe('ngAfterContentChecked', () => {

      it('should be called every change detection run after afterContentInit', () => {
        /** <comp>content</comp> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelementStart(0, 'comp');
            { ɵɵtext(1, 'content'); }
            ɵɵelementEnd();
          }
        }, 2, 0, directives);

        const fixture = new ComponentFixture(App);
        expect(allEvents).toEqual(['comp init', 'comp check']);

        fixture.update();
        expect(allEvents).toEqual(['comp init', 'comp check', 'comp check']);
      });

      it('should be called on root component', () => {
        const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
        expect(allEvents).toEqual(['comp init', 'comp check']);

        markDirty(comp);
        requestAnimationFrame.flush();
        expect(allEvents).toEqual(['comp init', 'comp check', 'comp check']);
      });

    });

    describe('directives', () => {
      it('should be called on directives after component', () => {
        /** <comp directive></comp> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'comp', ['dir', '']);
          }
        }, 1, 0, directives);

        const fixture = new ComponentFixture(App);
        expect(events).toEqual(['comp', 'init', 'check']);
      });

      it('should be called on directives on an element', () => {
        /** <div directive></div> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'div', ['dir', '']);
          }
        }, 1, 0, directives);

        const fixture = new ComponentFixture(App);
        expect(events).toEqual(['init', 'check']);
      });
    });
  });

  describe('afterViewInit', () => {
    let events: string[];
    let allEvents: string[];

    beforeEach(() => {
      events = [];
      allEvents = [];
    });

    let Comp = createAfterViewInitComponent('comp', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, 'div');
        { ɵɵprojection(1); }
        ɵɵelementEnd();
      }
    }, 2);
    let Parent = createAfterViewInitComponent('parent', getParentTemplate('comp'), 1, 1, [Comp]);

    let ProjectedComp = createAfterViewInitComponent('projected', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵtext(0, 'content');
      }
    }, 1);

    function createAfterViewInitComponent(
        name: string, template: ComponentTemplate<any>, consts: number, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        val: string = '';
        ngAfterViewInit() {
          if (!this.val) this.val = '';
          events.push(`${name}${this.val}`);
          allEvents.push(`${name}${this.val} init`);
        }
        ngAfterViewChecked() { allEvents.push(`${name}${this.val} check`); }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          consts: consts,
          vars: vars,
          factory: () => new Component(),
          inputs: {val: 'val'},
          template: template,
          directives: directives
        });
      };
    }

    class Directive {
      ngAfterViewInit() { events.push('init'); }
      ngAfterViewChecked() { events.push('check'); }

      static ngDirectiveDef = ɵɵdefineDirective(
          {type: Directive, selectors: [['', 'dir', '']], factory: () => new Directive()});
    }

    const defs = [Comp, Parent, ProjectedComp, Directive];

    it('should be called on init and not in update mode', () => {
      /** <comp></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.update();
      expect(events).toEqual(['comp']);
    });

    it('should be called on root component in creation mode', () => {
      const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
      expect(events).toEqual(['comp']);

      markDirty(comp);
      requestAnimationFrame.flush();
      expect(events).toEqual(['comp']);
    });

    it('should be called every time a view is initialized (if block)', () => {
      /*
      * % if (!skip) {
      *   <comp></comp>
      * % }
      */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp']);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp']);

      fixture.component.skip = false;
      fixture.update();
      expect(events).toEqual(['comp', 'comp']);

    });

    it('should be called in children before parents', () => {
      /**
       * <parent></parent>
       *
       * parent temp: <comp></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp', 'parent']);
    });

    it('should be called for entire subtree before being called in any parent view comps', () => {
      /**
       * <parent [val]="1"></parent>
       * <parent [val]="2"></parent>
       *
       *  parent temp: <comp [val]="val"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵelement(1, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 2);
        }
      }, 2, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp1', 'comp2', 'parent1', 'parent2']);

    });

    it('should be called in projected components before their hosts', () => {
      /**
       * <comp>
       *   <projected></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelement(1, 'projected'); }
          ɵɵelementEnd();
        }
      }, 2, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['projected', 'comp']);
    });

    it('should call afterViewInit in content children and host before next host', () => {
      /**
       * <comp [val]="1">
       *   <projected [val]="1"></projected>
       * </comp>
       * <comp [val]="2">
       *   <projected [val]="2"></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelement(1, 'projected'); }
          ɵɵelementEnd();
          ɵɵelementStart(2, 'comp');
          { ɵɵelement(3, 'projected'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 2);
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val', 2);
        }
      }, 4, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['projected1', 'comp1', 'projected2', 'comp2']);
    });

    it('should call afterViewInit in content children and hosts before parents', () => {
      /*
       * <comp [val]="val">
       *   <projected [val]="val"></projected>
       * </comp>
       */
      const ParentComp = createAfterViewInitComponent('parent', (rf: RenderFlags, ctx: any) => {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelement(1, 'projected'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', ɵɵbind(ctx.val));
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', ɵɵbind(ctx.val));
        }
      }, 2, 2, [Comp, ProjectedComp]);

      /**
       * <parent [val]="1"></parent>
       * <parent [val]="2"></parent>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵelement(1, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 2);
        }
      }, 2, 0, [ParentComp]);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['projected1', 'comp1', 'projected2', 'comp2', 'parent1', 'parent2']);
    });

    it('should be called in correct order with for loops', () => {
      /**
       * <comp [val]="1"></comp>
       * % for (let i = 0; i < 4; i++) {
       *  <comp [val]="i"></comp>
       * % }
       * <comp [val]="4"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
          ɵɵcontainer(1);
          ɵɵelement(2, 'comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 4);
          ɵɵcontainerRefreshStart(1);
          {
            for (let i = 2; i < 4; i++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', i);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(['comp2', 'comp3', 'comp1', 'comp4']);

    });

    it('should be called in correct order with for loops with children', () => {
      /**
       * <parent [val]="1"></parent>
       * % for(let i = 0; i < 4; i++) {
       *  <parent [val]="i"></parent>
       * % }
       * <parent [val]="4"></parent>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵcontainer(1);
          ɵɵelement(2, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', 4);
          ɵɵcontainerRefreshStart(1);
          {
            for (let i = 2; i < 4; i++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'parent');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', i);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 0, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual(
          ['comp2', 'parent2', 'comp3', 'parent3', 'comp1', 'comp4', 'parent1', 'parent4']);

    });

    describe('ngAfterViewChecked', () => {

      it('should call ngAfterViewChecked every update', () => {
        /** <comp></comp> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'comp');
          }
        }, 1, 0, defs);

        const fixture = new ComponentFixture(App);
        expect(allEvents).toEqual(['comp init', 'comp check']);

        fixture.update();
        expect(allEvents).toEqual(['comp init', 'comp check', 'comp check']);
      });

      it('should be called on root component', () => {
        const comp = renderComponent(Comp, {hostFeatures: [LifecycleHooksFeature]});
        expect(allEvents).toEqual(['comp init', 'comp check']);

        markDirty(comp);
        requestAnimationFrame.flush();
        expect(allEvents).toEqual(['comp init', 'comp check', 'comp check']);
      });

      it('should call ngAfterViewChecked with bindings', () => {
        /** <comp [val]="myVal"></comp> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'comp');
          }
          if (rf & RenderFlags.Update) {
            ɵɵelementProperty(0, 'val', ɵɵbind(ctx.myVal));
          }
        }, 1, 1, defs);

        const fixture = new ComponentFixture(App);
        expect(allEvents).toEqual(['comp init', 'comp check']);

        fixture.component.myVal = 2;
        fixture.update();
        expect(allEvents).toEqual(['comp init', 'comp check', 'comp2 check']);
      });

      it('should be called in correct order with for loops with children', () => {
        /**
         * <parent [val]="1"></parent>
         * % for(let i = 0; i < 4; i++) {
       *  <parent [val]="i"></parent>
       * % }
         * <parent [val]="4"></parent>
         */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'parent');
            ɵɵcontainer(1);
            ɵɵelement(2, 'parent');
          }
          if (rf & RenderFlags.Update) {
            ɵɵelementProperty(0, 'val', 1);
            ɵɵselect(2);
            ɵɵelementProperty(2, 'val', 4);
            ɵɵcontainerRefreshStart(1);
            {
              for (let i = 2; i < 4; i++) {
                let rf1 = ɵɵembeddedViewStart(0, 1, 0);
                if (rf1 & RenderFlags.Create) {
                  ɵɵelement(0, 'parent');
                }
                if (rf1 & RenderFlags.Update) {
                  ɵɵelementProperty(0, 'val', i);
                }
                ɵɵembeddedViewEnd();
              }
            }
            ɵɵcontainerRefreshEnd();
          }
        }, 3, 0, defs);

        const fixture = new ComponentFixture(App);
        expect(allEvents).toEqual([
          'comp2 init', 'comp2 check', 'parent2 init', 'parent2 check', 'comp3 init', 'comp3 check',
          'parent3 init', 'parent3 check', 'comp1 init', 'comp1 check', 'comp4 init', 'comp4 check',
          'parent1 init', 'parent1 check', 'parent4 init', 'parent4 check'
        ]);

      });

    });

    describe('directives', () => {
      it('should be called on directives after component', () => {
        /** <comp directive></comp> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'comp', ['dir', '']);
          }
        }, 1, 0, defs);

        const fixture = new ComponentFixture(App);
        expect(events).toEqual(['comp', 'init', 'check']);
      });

      it('should be called on directives on an element', () => {
        /** <div directive></div> */
        const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
          if (rf & RenderFlags.Create) {
            ɵɵelement(0, 'div', ['dir', '']);
          }
        }, 1, 0, defs);

        const fixture = new ComponentFixture(App);
        expect(events).toEqual(['init', 'check']);
      });
    });
  });

  describe('onDestroy', () => {
    let events: string[];

    beforeEach(() => { events = []; });

    let Comp = createOnDestroyComponent('comp', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    }, 1);
    let Parent = createOnDestroyComponent('parent', getParentTemplate('comp'), 1, 1, [Comp]);

    function createOnDestroyComponent(
        name: string, template: ComponentTemplate<any>, consts: number = 0, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        val: string = '';
        ngOnDestroy() { events.push(`${name}${this.val}`); }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          factory: () => new Component(),
          consts: consts,
          vars: vars,
          inputs: {val: 'val'},
          template: template,
          directives: directives
        });
      };
    }

    let Grandparent = createOnDestroyComponent('grandparent', function(rf: RenderFlags, ctx: any) {
      if (rf & RenderFlags.Create) {
        ɵɵelement(0, 'parent');
      }
    }, 1, 0, [Parent]);

    const ProjectedComp = createOnDestroyComponent('projected', (rf: RenderFlags, ctx: any) => {});

    class Directive {
      ngOnDestroy() { events.push('dir'); }

      static ngDirectiveDef = ɵɵdefineDirective(
          {type: Directive, selectors: [['', 'dir', '']], factory: () => new Directive()});
    }

    const defs = [Comp, Parent, Grandparent, ProjectedComp, Directive];

    it('should call destroy when view is removed', () => {
      /**
       * % if (!skip) {
       *   <comp></comp>
       * % }
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp']);
    });

    it('should call destroy when multiple views are removed', () => {
      /**
       * % if (!skip) {
       *   <comp [val]="1"></comp>
       *   <comp [val]="2"></comp>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 2, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
                ɵɵelement(1, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', ɵɵbind('1'));
                ɵɵselect(1);
                ɵɵelementProperty(1, 'val', ɵɵbind('2'));
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp1', 'comp2']);
    });

    it('should be called in child components before parent components', () => {
      /**
       * % if (!skip) {
       *   <parent></parent>
       * % }
       *
       * parent template: <comp></comp>
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'parent');
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp', 'parent']);
    });

    it('should be called bottom up with children nested 2 levels deep', () => {
      /**
       * % if (!skip) {
       *   <grandparent></grandparent>
       * % }
       *
       * grandparent template: <parent></parent>
       * parent template: <comp></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'grandparent');
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['comp', 'parent', 'grandparent']);
    });

    it('should be called in projected components before their hosts', () => {
      /**
       * % if (!skip) {
       *   <comp [val]="1">
       *     <projected [val]="1"></projected>
       *   </comp>
       *   <comp [val]="2">
       *     <projected [val]="2"></projected>
       *   </comp>
       * }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (!ctx.skip) {
              let rf1 = ɵɵembeddedViewStart(0, 4, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelementStart(0, 'comp');
                { ɵɵelement(1, 'projected'); }
                ɵɵelementEnd();
                ɵɵelementStart(2, 'comp');
                { ɵɵelement(3, 'projected'); }
                ɵɵelementEnd();
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', 1);
                ɵɵselect(1);
                ɵɵelementProperty(1, 'val', 1);
                ɵɵselect(2);
                ɵɵelementProperty(2, 'val', 2);
                ɵɵselect(3);
                ɵɵelementProperty(3, 'val', 2);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      fixture.component.skip = true;
      fixture.update();
      expect(events).toEqual(['projected1', 'comp1', 'projected2', 'comp2']);
    });


    it('should be called in consistent order if views are removed and re-added', () => {
      /**
       * % if (condition) {
       *   <comp [val]="1"></comp>
       *   % if (condition2) {
       *     <comp [val]="2"></comp>
       *   % }
       *   <comp [val]="3"></comp>
       * % }
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 3, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
                ɵɵcontainer(1);
                ɵɵelement(2, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', ɵɵbind('1'));
                ɵɵselect(2);
                ɵɵelementProperty(2, 'val', ɵɵbind('3'));
                ɵɵcontainerRefreshStart(1);
                {
                  if (ctx.condition2) {
                    let rf2 = ɵɵembeddedViewStart(0, 1, 1);
                    if (rf2 & RenderFlags.Create) {
                      ɵɵelement(0, 'comp');
                    }
                    if (rf2 & RenderFlags.Update) {
                      ɵɵelementProperty(0, 'val', ɵɵbind('2'));
                    }
                    ɵɵembeddedViewEnd();
                  }
                }
                ɵɵcontainerRefreshEnd();
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      fixture.component.condition = true;
      fixture.component.condition2 = true;
      fixture.update();

      // remove all views
      fixture.component.condition = false;
      fixture.update();

      /**
       * Current angular will process in this same order (root is the top-level removed view):
       *
       * root.child (comp1 view) onDestroy: null
       * root.child.next (container) -> embeddedView
       * embeddedView.child (comp2 view) onDestroy: null
       * embeddedView onDestroy: [comp2]
       * root.child.next.next (comp3 view) onDestroy: null
       * root onDestroy: [comp1, comp3]
       */
      expect(events).toEqual(['comp2', 'comp1', 'comp3']);

      events = [];
      // remove inner view
      fixture.component.condition = true;
      fixture.component.condition2 = false;
      fixture.update();

      // remove outer view
      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['comp1', 'comp3']);

      events = [];
      // restore both views
      fixture.component.condition = true;
      fixture.component.condition2 = true;
      fixture.update();

      // remove both views
      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['comp2', 'comp1', 'comp3']);
    });

    it('should be called in every iteration of a destroyed for loop', () => {
      /**
       * % if (condition) {
       *   <comp [val]="1"></comp>
       *   % for (let i = 2; i < len; i++) {
       *       <comp [val]="i"></comp>
       *   % }
       *   <comp [val]="5"></comp>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 3, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
                ɵɵcontainer(1);
                ɵɵelement(2, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val', ɵɵbind('1'));
                ɵɵselect(2);
                ɵɵelementProperty(2, 'val', ɵɵbind('5'));
                ɵɵcontainerRefreshStart(1);
                {
                  for (let j = 2; j < ctx.len; j++) {
                    let rf2 = ɵɵembeddedViewStart(0, 1, 1);
                    if (rf2 & RenderFlags.Create) {
                      ɵɵelement(0, 'comp');
                    }
                    if (rf2 & RenderFlags.Update) {
                      ɵɵelementProperty(0, 'val', ɵɵbind(j));
                    }
                    ɵɵembeddedViewEnd();
                  }
                }
                ɵɵcontainerRefreshEnd();
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      fixture.component.condition = true;
      fixture.component.len = 5;
      fixture.update();

      fixture.component.condition = false;
      fixture.update();

      /**
       * Current angular will process in this same order (root is the top-level removed view):
       *
       * root.child (comp1 view) onDestroy: null
       * root.child.next (container) -> embeddedView (children[0].data)
       * embeddedView.child (comp2 view) onDestroy: null
       * embeddedView onDestroy: [comp2]
       * embeddedView.next.child (comp3 view) onDestroy: null
       * embeddedView.next onDestroy: [comp3]
       * embeddedView.next.next.child (comp4 view) onDestroy: null
       * embeddedView.next.next onDestroy: [comp4]
       * embeddedView.next.next -> container -> root
       * root onDestroy: [comp1, comp5]
       */
      expect(events).toEqual(['comp2', 'comp3', 'comp4', 'comp1', 'comp5']);

      events = [];
      fixture.component.condition = true;
      fixture.component.len = 4;
      fixture.update();

      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['comp2', 'comp3', 'comp1', 'comp5']);

      events = [];
      fixture.component.condition = true;
      fixture.component.len = 5;
      fixture.update();

      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['comp2', 'comp3', 'comp4', 'comp1', 'comp5']);
    });

    it('should call destroy properly if view also has listeners', () => {
      /**
       * % if (condition) {
       *   <button (click)="onClick()">Click me</button>
       *   <comp></comp>
       *   <button (click)="onClick()">Click me</button>
       * % }
       */
      function Template(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 5, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelementStart(0, 'button');
                {
                  ɵɵlistener('click', ctx.onClick.bind(ctx));
                  ɵɵtext(1, 'Click me');
                }
                ɵɵelementEnd();
                ɵɵelement(2, 'comp');
                ɵɵelementStart(3, 'button');
                {
                  ɵɵlistener('click', ctx.onClick.bind(ctx));
                  ɵɵtext(4, 'Click me');
                }
                ɵɵelementEnd();
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }

      class App {
        counter = 0;
        condition = true;
        onClick() { this.counter++; }
      }

      const ctx: {counter: number} = new App();
      renderToHtml(Template, ctx, 1, 0, defs);

      const buttons = containerEl.querySelectorAll('button') !;
      buttons[0].click();
      expect(ctx.counter).toEqual(1);
      buttons[1].click();
      expect(ctx.counter).toEqual(2);

      renderToHtml(Template, {condition: false}, 1, 0, defs);

      buttons[0].click();
      buttons[1].click();
      expect(events).toEqual(['comp']);
      expect(ctx.counter).toEqual(2);
    });

    it('should be called on directives after component', () => {
      /**
       * % if (condition) {
       *   <comp></comp>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp', ['dir', '']);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      fixture.component.condition = true;
      fixture.update();
      expect(events).toEqual([]);

      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['comp', 'dir']);

    });

    it('should be called on directives on an element', () => {
      /**
       * % if (condition) {
       *   <div directive></div>
       * % }
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 0);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'div', ['dir', '']);
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);
      fixture.component.condition = true;
      fixture.update();
      expect(events).toEqual([]);

      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual(['dir']);
    });

  });

  describe('onChanges', () => {
    let events: ({type: string, name: string, [key: string]: any})[];

    beforeEach(() => { events = []; });

    /**
     * <div>
     *  <ng-content/>
     * </div>
     */
    const Comp = createOnChangesComponent('comp', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, 'div');
        { ɵɵprojection(1); }
        ɵɵelementEnd();
      }
    }, 2);

    /**
     * <comp [val1]="a" [publicVal2]="b"/>
     */
    const Parent = createOnChangesComponent('parent', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵelement(0, 'comp');
      }
      if (rf & RenderFlags.Update) {
        ɵɵelementProperty(0, 'val1', ɵɵbind(ctx.a));
        ɵɵelementProperty(0, 'publicVal2', ɵɵbind(ctx.b));
      }
    }, 1, 2, [Comp]);

    const ProjectedComp = createOnChangesComponent('projected', (rf: RenderFlags, ctx: any) => {
      if (rf & RenderFlags.Create) {
        ɵɵtext(0, 'content');
      }
    }, 1);


    function createOnChangesComponent(
        name: string, template: ComponentTemplate<any>, consts: number = 0, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        // @Input() val1: string;
        // @Input('publicVal2') val2: string;
        a: string = 'wasVal1BeforeMinification';
        b: string = 'wasVal2BeforeMinification';
        ngOnChanges(changes: SimpleChanges) {
          if (changes.a && this.a !== changes.a.currentValue) {
            throw Error(
                `SimpleChanges invalid expected this.a ${this.a} to equal currentValue ${changes.a.currentValue}`);
          }
          if (changes.b && this.b !== changes.b.currentValue) {
            throw Error(
                `SimpleChanges invalid expected this.b ${this.b} to equal currentValue ${changes.b.currentValue}`);
          }
          events.push({type: 'onChanges', name: 'comp - ' + name, changes});
        }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          factory: () => new Component(),
          consts: consts,
          vars: vars,
          inputs: {a: 'val1', b: ['publicVal2', 'val2']}, template,
          directives: directives,
          features: [ɵɵNgOnChangesFeature()],
        });
      };
    }

    class Directive {
      // @Input() val1: string;
      // @Input('publicVal2') val2: string;
      a: string = 'wasVal1BeforeMinification';
      b: string = 'wasVal2BeforeMinification';
      ngOnChanges(changes: SimpleChanges) {
        events.push({type: 'onChanges', name: 'dir - dir', changes});
      }

      static ngDirectiveDef = ɵɵdefineDirective({
        type: Directive,
        selectors: [['', 'dir', '']],
        factory: () => new Directive(),
        inputs: {a: 'val1', b: ['publicVal2', 'val2']},
        features: [ɵɵNgOnChangesFeature()],
      });
    }

    const defs = [Comp, Parent, Directive, ProjectedComp];

    it('should call onChanges method after inputs are set in creation and update mode', () => {
      /** <comp [val1]="val1" [publicVal2]="val2"></comp> */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(ctx.val1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(ctx.val2));
        }
      }, 1, 2, defs);

      // First changes happen here.
      const fixture = new ComponentFixture(App);

      events = [];
      fixture.component.val1 = '1';
      fixture.component.val2 = 'a';
      fixture.update();
      expect(events).toEqual([{
        type: 'onChanges',
        name: 'comp - comp',
        changes: {
          'val1': new SimpleChange(
              undefined, '1', false),  // we cleared `events` above, this is the second change
          'val2': new SimpleChange(undefined, 'a', false),
        }
      }]);

      events = [];
      fixture.component.val1 = '2';
      fixture.component.val2 = 'b';
      fixture.update();
      expect(events).toEqual([{
        type: 'onChanges',
        name: 'comp - comp',
        changes: {
          'val1': new SimpleChange('1', '2', false),
          'val2': new SimpleChange('a', 'b', false),
        }
      }]);
    });

    it('should call parent onChanges before child onChanges', () => {
      /**
       * <parent></parent>
       * parent temp: <comp></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(ctx.val1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(ctx.val2));
        }
      }, 1, 2, defs);

      const fixture = new ComponentFixture(App);

      // We're clearing events after the first change here
      events = [];
      fixture.component.val1 = '1';
      fixture.component.val2 = 'a';
      fixture.update();

      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, '1', false),
            'val2': new SimpleChange(undefined, 'a', false),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, '1', false),
            'val2': new SimpleChange(undefined, 'a', false),
          }
        },
      ]);
    });

    it('should call all parent onChanges across view before calling children onChanges', () => {
      /**
       * <parent [val1]="1"></parent>
       * <parent [val1]="2"></parent>
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵelement(1, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val1', ɵɵbind(2));
          ɵɵelementProperty(1, 'publicVal2', ɵɵbind(2));
        }
      }, 2, 4, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
      ]);
    });


    it('should call onChanges every time a new view is created (if block)', () => {
      /**
       * % if (condition) {
       *   <comp></comp>
       * % }
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵcontainer(0);
        }
        if (rf & RenderFlags.Update) {
          ɵɵcontainerRefreshStart(0);
          {
            if (ctx.condition) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val1', ɵɵbind(1));
                ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 1, 0, defs);

      const fixture = new ComponentFixture(App);

      // Show the `comp` component, causing it to initialize. (first change is true)
      fixture.component.condition = true;
      fixture.update();
      expect(events).toEqual([{
        type: 'onChanges',
        name: 'comp - comp',
        changes: {
          'val1': new SimpleChange(undefined, 1, true),
          'val2': new SimpleChange(undefined, 1, true),
        }
      }]);

      // Hide the `comp` component, no onChanges should fire
      fixture.component.condition = false;
      fixture.update();
      expect(events).toEqual([{
        type: 'onChanges',
        name: 'comp - comp',
        changes: {
          'val1': new SimpleChange(undefined, 1, true),
          'val2': new SimpleChange(undefined, 1, true),
        }
      }]);

      // Show the `comp` component, it initializes again. (first change is true)
      fixture.component.condition = true;
      fixture.update();
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        }
      ]);
    });

    it('should call onChanges in hosts before their content children', () => {
      /**
       * <comp>
       *   <projected></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelementStart(1, 'projected'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val1', ɵɵbind(2));
          ɵɵelementProperty(1, 'publicVal2', ɵɵbind(2));
        }
      }, 2, 4, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - projected',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
      ]);
    });

    it('should call onChanges in host and its content children before next host', () => {
      /**
       * <comp [val1]="1" [publicVal2]="1">
       *   <projected [val1]="2" [publicVal2]="2"></projected>
       * </comp>
       * <comp [val1]="3" [publicVal2]="3">
       *   <projected [val1]="4" [publicVal2]="4"></projected>
       * </comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'comp');
          { ɵɵelementStart(1, 'projected'); }
          ɵɵelementEnd();
          ɵɵelementStart(2, 'comp');
          { ɵɵelementStart(3, 'projected'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val1', ɵɵbind(2));
          ɵɵelementProperty(1, 'publicVal2', ɵɵbind(2));
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val1', ɵɵbind(3));
          ɵɵelementProperty(2, 'publicVal2', ɵɵbind(3));
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val1', ɵɵbind(4));
          ɵɵelementProperty(3, 'publicVal2', ɵɵbind(4));
        }
      }, 4, 8, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - projected',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 3, true),
            'val2': new SimpleChange(undefined, 3, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - projected',
          changes: {
            'val1': new SimpleChange(undefined, 4, true),
            'val2': new SimpleChange(undefined, 4, true),
          }
        },
      ]);
    });

    it('should be called on directives after component', () => {
      /**
       * <comp dir [val1]="1" [publicVal2]="1"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp', ['dir', '']);
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
        }
      }, 1, 2, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'dir - dir',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
      ]);

      // Update causes no changes to be fired, since the bindings didn't change.
      events = [];
      fixture.update();
      expect(events).toEqual([]);

    });

    it('should be called on directives on an element', () => {
      /**
       * <div dir [val]="1" [publicVal2]="1"></div>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'div', ['dir', '']);
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
        }
      }, 1, 2, defs);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([{
        type: 'onChanges',
        name: 'dir - dir',
        changes: {
          'val1': new SimpleChange(undefined, 1, true),
          'val2': new SimpleChange(undefined, 1, true),
        }
      }]);

      events = [];
      fixture.update();
      expect(events).toEqual([]);
    });

    it('should call onChanges properly in for loop', () => {
      /**
       *  <comp [val1]="1" [publicVal2]="1"></comp>
       * % for (let j = 2; j < 5; j++) {
       *   <comp [val1]="j" [publicVal2]="j"></comp>
       * % }
       *  <comp [val1]="5" [publicVal2]="5"></comp>
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
          ɵɵcontainer(1);
          ɵɵelement(2, 'comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val1', ɵɵbind(5));
          ɵɵelementProperty(2, 'publicVal2', ɵɵbind(5));
          ɵɵcontainerRefreshStart(1);
          {
            for (let j = 2; j < 5; j++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'comp');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val1', ɵɵbind(j));
                ɵɵelementProperty(0, 'publicVal2', ɵɵbind(j));
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 4, defs);

      const fixture = new ComponentFixture(App);

      // onChanges is called top to bottom, so top level comps (1 and 5) are called
      // before the comps inside the for loop's embedded view (2, 3, and 4)
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 5, true),
            'val2': new SimpleChange(undefined, 5, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 3, true),
            'val2': new SimpleChange(undefined, 3, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 4, true),
            'val2': new SimpleChange(undefined, 4, true),
          }
        },
      ]);
    });

    it('should call onChanges properly in for loop with children', () => {
      /**
       *  <parent [val1]="1" [publicVal2]="1"></parent>
       * % for (let j = 2; j < 5; j++) {
       *   <parent [val1]="j" [publicVal2]="j"></parent>
       * % }
       *  <parent [val1]="5" [publicVal2]="5"></parent>
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵcontainer(1);
          ɵɵelement(2, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val1', ɵɵbind(1));
          ɵɵelementProperty(0, 'publicVal2', ɵɵbind(1));
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val1', ɵɵbind(5));
          ɵɵelementProperty(2, 'publicVal2', ɵɵbind(5));
          ɵɵcontainerRefreshStart(1);
          {
            for (let j = 2; j < 5; j++) {
              let rf1 = ɵɵembeddedViewStart(0, 1, 2);
              if (rf1 & RenderFlags.Create) {
                ɵɵelement(0, 'parent');
              }
              if (rf1 & RenderFlags.Update) {
                ɵɵelementProperty(0, 'val1', ɵɵbind(j));
                ɵɵelementProperty(0, 'publicVal2', ɵɵbind(j));
              }
              ɵɵembeddedViewEnd();
            }
          }
          ɵɵcontainerRefreshEnd();
        }
      }, 3, 4, defs);

      const fixture = new ComponentFixture(App);

      // onChanges is called top to bottom, so top level comps (1 and 5) are called
      // before the comps inside the for loop's embedded view (2, 3, and 4)
      expect(events).toEqual([
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 5, true),
            'val2': new SimpleChange(undefined, 5, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 2, true),
            'val2': new SimpleChange(undefined, 2, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 3, true),
            'val2': new SimpleChange(undefined, 3, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 3, true),
            'val2': new SimpleChange(undefined, 3, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - parent',
          changes: {
            'val1': new SimpleChange(undefined, 4, true),
            'val2': new SimpleChange(undefined, 4, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 4, true),
            'val2': new SimpleChange(undefined, 4, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 1, true),
            'val2': new SimpleChange(undefined, 1, true),
          }
        },
        {
          type: 'onChanges',
          name: 'comp - comp',
          changes: {
            'val1': new SimpleChange(undefined, 5, true),
            'val2': new SimpleChange(undefined, 5, true),
          }
        },
      ]);
    });

    it('should not call onChanges if props are set directly', () => {
      let events: SimpleChanges[] = [];
      let compInstance: MyComp;
      class MyComp {
        value = 0;

        ngOnChanges(changes: SimpleChanges) { events.push(changes); }

        static ngComponentDef = ɵɵdefineComponent({
          type: MyComp,
          factory: () => {
            // Capture the instance so we can test setting the property directly
            compInstance = new MyComp();
            return compInstance;
          },
          template: (rf: RenderFlags, ctx: any) => {
            if (rf & RenderFlags.Create) {
              ɵɵelement(0, 'div');
            }
            if (rf & RenderFlags.Update) {
              ɵɵelementProperty(0, 'id', ɵɵbind(ctx.a));
            }
          },
          selectors: [['my-comp']],
          inputs: {
            value: 'value',
          },
          consts: 1,
          vars: 1,
        });
      }

      /**
       *  <my-comp [value]="1"></my-comp>
       */

      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'my-comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'value', ɵɵbind(1));
        }
      }, 1, 1, [MyComp]);

      const fixture = new ComponentFixture(App);
      events = [];

      // Try setting the property directly
      compInstance !.value = 2;

      fixture.update();
      expect(events).toEqual([]);
    });

  });

  describe('hook order', () => {
    let events: string[];

    beforeEach(() => { events = []; });

    function createAllHooksComponent(
        name: string, template: ComponentTemplate<any>, consts: number = 0, vars: number = 0,
        directives: any[] = []) {
      return class Component {
        val: string = '';

        ngOnChanges() { events.push(`changes ${name}${this.val}`); }

        ngOnInit() { events.push(`init ${name}${this.val}`); }
        ngDoCheck() { events.push(`check ${name}${this.val}`); }

        ngAfterContentInit() { events.push(`contentInit ${name}${this.val}`); }
        ngAfterContentChecked() { events.push(`contentCheck ${name}${this.val}`); }

        ngAfterViewInit() { events.push(`viewInit ${name}${this.val}`); }
        ngAfterViewChecked() { events.push(`viewCheck ${name}${this.val}`); }

        static ngComponentDef = ɵɵdefineComponent({
          type: Component,
          selectors: [[name]],
          factory: () => new Component(),
          consts: consts,
          vars: vars,
          inputs: {val: 'val'}, template,
          directives: directives,
          features: [ɵɵNgOnChangesFeature()],
        });
      };
    }

    it('should call all hooks in correct order', () => {
      const Comp = createAllHooksComponent('comp', (rf: RenderFlags, ctx: any) => {});

      /**
       * <comp [val]="1"></comp>
       * <comp [val]="2"></comp>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
          ɵɵelement(1, 'comp');
        }
        // This template function is a little weird in that the `elementProperty` calls
        // below are directly setting values `1` and `2`, where normally there would be
        // a call to `bind()` that would do the work of seeing if something changed.
        // This means when `fixture.update()` is called below, ngOnChanges should fire,
        // even though the *value* itself never changed.
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 2);
        }
      }, 2, 0, [Comp]);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        'changes comp1', 'init comp1', 'check comp1', 'changes comp2', 'init comp2', 'check comp2',
        'contentInit comp1', 'contentCheck comp1', 'contentInit comp2', 'contentCheck comp2',
        'viewInit comp1', 'viewCheck comp1', 'viewInit comp2', 'viewCheck comp2'
      ]);

      events = [];
      fixture.update();  // Changes are made due to lack of `bind()` call in template fn.
      expect(events).toEqual([
        'changes comp1', 'check comp1', 'changes comp2', 'check comp2', 'contentCheck comp1',
        'contentCheck comp2', 'viewCheck comp1', 'viewCheck comp2'
      ]);
    });

    it('should call all hooks in correct order with children', () => {
      const Comp = createAllHooksComponent('comp', (rf: RenderFlags, ctx: any) => {});

      /** <comp [val]="val"></comp> */
      const Parent = createAllHooksComponent('parent', (rf: RenderFlags, ctx: any) => {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'comp');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', ɵɵbind(ctx.val));
        }
      }, 1, 1, [Comp]);

      /**
       * <parent [val]="1"></parent>
       * <parent [val]="2"></parent>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'parent');
          ɵɵelement(1, 'parent');
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', 1);
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', 2);
        }
      }, 2, 0, [Parent]);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        'changes parent1',      'init parent1',         'check parent1',
        'changes parent2',      'init parent2',         'check parent2',
        'contentInit parent1',  'contentCheck parent1', 'contentInit parent2',
        'contentCheck parent2', 'changes comp1',        'init comp1',
        'check comp1',          'contentInit comp1',    'contentCheck comp1',
        'viewInit comp1',       'viewCheck comp1',      'changes comp2',
        'init comp2',           'check comp2',          'contentInit comp2',
        'contentCheck comp2',   'viewInit comp2',       'viewCheck comp2',
        'viewInit parent1',     'viewCheck parent1',    'viewInit parent2',
        'viewCheck parent2'
      ]);

      events = [];
      fixture.update();
      expect(events).toEqual([
        'changes parent1', 'check parent1', 'changes parent2', 'check parent2',
        'contentCheck parent1', 'contentCheck parent2', 'check comp1', 'contentCheck comp1',
        'viewCheck comp1', 'check comp2', 'contentCheck comp2', 'viewCheck comp2',
        'viewCheck parent1', 'viewCheck parent2'
      ]);

    });

    // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-ng
    it('should call all hooks in correct order with view and content', () => {
      const Content = createAllHooksComponent('content', (rf: RenderFlags, ctx: any) => {});

      const View = createAllHooksComponent('view', (rf: RenderFlags, ctx: any) => {});

      /** <ng-content></ng-content><view [val]="val"></view> */
      const Parent = createAllHooksComponent('parent', (rf: RenderFlags, ctx: any) => {
        if (rf & RenderFlags.Create) {
          ɵɵprojectionDef();
          ɵɵprojection(0);
          ɵɵelement(1, 'view');
        }
        if (rf & RenderFlags.Update) {
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', ɵɵbind(ctx.val));
        }
      }, 2, 1, [View]);

      /**
       * <parent [val]="1">
       *   <content [val]="1"></content>
       * </parent>
       * <parent [val]="2">
       *   <content [val]="2"></content>
       * </parent>
       */
      const App = createComponent('app', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'parent');
          { ɵɵelement(1, 'content'); }
          ɵɵelementEnd();
          ɵɵelementStart(2, 'parent');
          { ɵɵelement(3, 'content'); }
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'val', ɵɵbind(1));
          ɵɵselect(1);
          ɵɵelementProperty(1, 'val', ɵɵbind(1));
          ɵɵselect(2);
          ɵɵelementProperty(2, 'val', ɵɵbind(2));
          ɵɵselect(3);
          ɵɵelementProperty(3, 'val', ɵɵbind(2));
        }
      }, 4, 4, [Parent, Content]);

      const fixture = new ComponentFixture(App);
      expect(events).toEqual([
        'changes parent1',      'init parent1',
        'check parent1',        'changes content1',
        'init content1',        'check content1',
        'changes parent2',      'init parent2',
        'check parent2',        'changes content2',
        'init content2',        'check content2',
        'contentInit content1', 'contentCheck content1',
        'contentInit parent1',  'contentCheck parent1',
        'contentInit content2', 'contentCheck content2',
        'contentInit parent2',  'contentCheck parent2',
        'changes view1',        'init view1',
        'check view1',          'contentInit view1',
        'contentCheck view1',   'viewInit view1',
        'viewCheck view1',      'changes view2',
        'init view2',           'check view2',
        'contentInit view2',    'contentCheck view2',
        'viewInit view2',       'viewCheck view2',
        'viewInit content1',    'viewCheck content1',
        'viewInit parent1',     'viewCheck parent1',
        'viewInit content2',    'viewCheck content2',
        'viewInit parent2',     'viewCheck parent2'
      ]);

      events = [];
      fixture.update();
      expect(events).toEqual([
        'check parent1', 'check content1', 'check parent2', 'check content2',
        'contentCheck content1', 'contentCheck parent1', 'contentCheck content2',
        'contentCheck parent2', 'check view1', 'contentCheck view1', 'viewCheck view1',
        'check view2', 'contentCheck view2', 'viewCheck view2', 'viewCheck content1',
        'viewCheck parent1', 'viewCheck content2', 'viewCheck parent2'
      ]);

    });

  });

  describe('non-regression', () => {

    it('should call lifecycle hooks for directives active on <ng-template>', () => {
      let destroyed = false;

      class OnDestroyDirective implements OnDestroy {
        ngOnDestroy() { destroyed = true; }

        static ngDirectiveDef = ɵɵdefineDirective({
          type: OnDestroyDirective,
          selectors: [['', 'onDestroyDirective', '']],
          factory: () => new OnDestroyDirective()
        });
      }


      function conditionTpl(rf: RenderFlags, ctx: Cmpt) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(
              0, null, 0, 1, 'ng-template', [AttributeMarker.Bindings, 'onDestroyDirective']);
        }
      }

      /**
       * <ng-template [ngIf]="condition">
       *  <ng-template onDestroyDirective></ng-template>
       * </ng-template>
       */
      function cmptTpl(rf: RenderFlags, cmpt: Cmpt) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, conditionTpl, 1, 1, 'ng-template', [AttributeMarker.Bindings, 'ngIf']);
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'ngIf', ɵɵbind(cmpt.showing));
        }
      }

      class Cmpt {
        showing = true;
        static ngComponentDef = ɵɵdefineComponent({
          type: Cmpt,
          factory: () => new Cmpt(),
          selectors: [['cmpt']],
          consts: 1,
          vars: 1,
          template: cmptTpl,
          directives: [NgIf, OnDestroyDirective]
        });
      }

      const fixture = new ComponentFixture(Cmpt);
      expect(destroyed).toBeFalsy();

      fixture.component.showing = false;
      fixture.update();
      expect(destroyed).toBeTruthy();
    });
  });

});
