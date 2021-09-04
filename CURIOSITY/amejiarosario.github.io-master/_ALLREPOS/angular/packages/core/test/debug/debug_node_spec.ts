/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


import {Component, Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostBinding, Injectable, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser/src/dom/debug/by';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {expect} from '@angular/platform-browser/testing/src/matchers';

@Injectable()
class Logger {
  logs: string[];

  constructor() { this.logs = []; }

  add(thing: string) { this.logs.push(thing); }
}

@Directive({selector: '[message]', inputs: ['message']})
class MessageDir {
  logger: Logger;

  constructor(logger: Logger) { this.logger = logger; }

  set message(newMessage: string) { this.logger.add(newMessage); }
}

@Component({
  selector: 'child-comp',
  template: `<div class="child" message="child">
               <span class="childnested" message="nestedchild">Child</span>
             </div>
             <span class="child" [innerHtml]="childBinding"></span>`,
})
class ChildComp {
  childBinding: string;

  constructor() { this.childBinding = 'Original'; }
}

@Component({
  selector: 'parent-comp',
  viewProviders: [Logger],
  template: `<div class="parent" message="parent">
               <span class="parentnested" message="nestedparent">Parent</span>
             </div>
             <span class="parent" [innerHtml]="parentBinding"></span>
             <child-comp class="child-comp-class"></child-comp>`,
})
class ParentComp {
  parentBinding: string;
  constructor() { this.parentBinding = 'OriginalParent'; }
}

@Directive({selector: 'custom-emitter', outputs: ['myevent']})
class CustomEmitter {
  myevent: EventEmitter<any>;

  constructor() { this.myevent = new EventEmitter(); }
}

@Component({
  selector: 'events-comp',
  template: `<button (click)="handleClick()"></button>
             <custom-emitter (myevent)="handleCustom()"></custom-emitter>`,
})
class EventsComp {
  clicked: boolean;
  customed: boolean;

  constructor() {
    this.clicked = false;
    this.customed = false;
  }

  handleClick() { this.clicked = true; }

  handleCustom() { this.customed = true; }
}

@Component({
  selector: 'cond-content-comp',
  viewProviders: [Logger],
  template: `<div class="child" message="child" *ngIf="myBool"><ng-content></ng-content></div>`,
})
class ConditionalContentComp {
  myBool: boolean = false;
}

@Component({
  selector: 'conditional-parent-comp',
  viewProviders: [Logger],
  template: `<span class="parent" [innerHtml]="parentBinding"></span>
            <cond-content-comp class="cond-content-comp-class">
              <span class="from-parent"></span>
            </cond-content-comp>`,
})
class ConditionalParentComp {
  parentBinding: string;
  constructor() { this.parentBinding = 'OriginalParent'; }
}

@Component({
  selector: 'using-for',
  viewProviders: [Logger],
  template: `<span *ngFor="let thing of stuff" [innerHtml]="thing"></span>
            <ul message="list">
              <li *ngFor="let item of stuff" [innerHtml]="item"></li>
            </ul>`,
})
class UsingFor {
  stuff: string[];
  constructor() { this.stuff = ['one', 'two', 'three']; }
}

@Directive({selector: '[mydir]', exportAs: 'mydir'})
class MyDir {
}

@Component({
  selector: 'locals-comp',
  template: `
   <div mydir #alice="mydir"></div>
 `,
})
class LocalsComp {
}

@Component({
  selector: 'bank-account',
  template: `
   Bank Name: {{bank}}
   Account Id: {{id}}
 `,
  host: {
    'class': 'static-class',
    '[class.absent-class]': 'false',
    '[class.present-class]': 'true',
  },
})
class BankAccount {
  // TODO(issue/24571): remove '!'.
  @Input() bank !: string;
  // TODO(issue/24571): remove '!'.
  @Input('account') id !: string;

  // TODO(issue/24571): remove '!'.
  normalizedBankName !: string;
}

@Component({
  template: `
    <div class="content" #content>Some content</div>
 `
})
class SimpleContentComp {
  @ViewChild('content') content !: ElementRef;
}

@Component({
  selector: 'test-app',
  template: `
   <bank-account bank="RBC"
                 account="4747"
                 [style.width.px]="width"
                 [style.color]="color"
                 [class.closed]="isClosed"
                 [class.open]="!isClosed"></bank-account>
 `,
})
class TestApp {
  width = 200;
  color = 'red';
  isClosed = true;
}

@Component({selector: 'test-cmpt', template: ``})
class TestCmpt {
}

@Component({selector: 'host-class-binding', template: ''})
class HostClassBindingCmp {
  @HostBinding('class')
  hostClasses = 'class-one class-two';
}

@Component({selector: 'test-cmpt-vcref', template: `<div></div>`})
class TestCmptWithViewContainerRef {
  constructor(private vcref: ViewContainerRef) {}
}

@Component({
  template: `
  <button
    [disabled]="disabled"
    [tabIndex]="tabIndex"
    [title]="title">Click me</button>
`
})
class TestCmptWithPropBindings {
  disabled = true;
  tabIndex = 1337;
  title = 'hello';
}

{
  describe('debug element', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ChildComp,
          ConditionalContentComp,
          ConditionalParentComp,
          CustomEmitter,
          EventsComp,
          LocalsComp,
          MessageDir,
          MyDir,
          ParentComp,
          TestApp,
          UsingFor,
          BankAccount,
          TestCmpt,
          HostClassBindingCmp,
          TestCmptWithViewContainerRef,
          SimpleContentComp,
          TestCmptWithPropBindings,
        ],
        providers: [Logger],
        schemas: [NO_ERRORS_SCHEMA],
      });
    }));

    it('should list all child nodes', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();
      expect(fixture.debugElement.childNodes.length).toEqual(3);
    });

    it('should list all component child elements', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();
      const childEls = fixture.debugElement.children;

      // The root component has 3 elements in its view.
      expect(childEls.length).toEqual(3);
      expect(getDOM().hasClass(childEls[0].nativeElement, 'parent')).toBe(true);
      expect(getDOM().hasClass(childEls[1].nativeElement, 'parent')).toBe(true);
      expect(getDOM().hasClass(childEls[2].nativeElement, 'child-comp-class')).toBe(true);

      const nested = childEls[0].children;
      expect(nested.length).toEqual(1);
      expect(getDOM().hasClass(nested[0].nativeElement, 'parentnested')).toBe(true);

      const childComponent = childEls[2];

      const childCompChildren = childComponent.children;
      expect(childCompChildren.length).toEqual(2);
      expect(getDOM().hasClass(childCompChildren[0].nativeElement, 'child')).toBe(true);
      expect(getDOM().hasClass(childCompChildren[1].nativeElement, 'child')).toBe(true);

      const childNested = childCompChildren[0].children;
      expect(childNested.length).toEqual(1);
      expect(getDOM().hasClass(childNested[0].nativeElement, 'childnested')).toBe(true);
    });

    it('should list conditional component child elements', () => {
      fixture = TestBed.createComponent(ConditionalParentComp);
      fixture.detectChanges();

      const childEls = fixture.debugElement.children;

      // The root component has 2 elements in its view.
      expect(childEls.length).toEqual(2);
      expect(getDOM().hasClass(childEls[0].nativeElement, 'parent')).toBe(true);
      expect(getDOM().hasClass(childEls[1].nativeElement, 'cond-content-comp-class')).toBe(true);

      const conditionalContentComp = childEls[1];

      expect(conditionalContentComp.children.length).toEqual(0);

      conditionalContentComp.componentInstance.myBool = true;
      fixture.detectChanges();

      expect(conditionalContentComp.children.length).toEqual(1);
    });

    it('should list child elements within viewports', () => {
      fixture = TestBed.createComponent(UsingFor);
      fixture.detectChanges();

      const childEls = fixture.debugElement.children;
      expect(childEls.length).toEqual(4);

      // The 4th child is the <ul>
      const list = childEls[3];

      expect(list.children.length).toEqual(3);
    });

    it('should list element attributes', () => {
      fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();
      const bankElem = fixture.debugElement.children[0];

      expect(bankElem.attributes['bank']).toEqual('RBC');
      expect(bankElem.attributes['account']).toEqual('4747');
    });

    it('should list element classes', () => {
      fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();
      const bankElem = fixture.debugElement.children[0];

      expect(bankElem.classes['closed']).toBe(true);
      expect(bankElem.classes['open']).toBe(false);
    });

    it('should get element classes from host bindings', () => {
      fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();
      const debugElement = fixture.debugElement.children[0];

      expect(debugElement.classes['present-class'])
          .toBe(true, 'Expected bound host CSS class "present-class" to be present');
      expect(debugElement.classes['absent-class'])
          .toBe(false, 'Expected bound host CSS class "absent-class" to be absent');
    });

    it('should list element styles', () => {
      fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();
      const bankElem = fixture.debugElement.children[0];

      expect(bankElem.styles['width']).toEqual('200px');
      expect(bankElem.styles['color']).toEqual('red');
    });

    it('should query child elements by css', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();

      const childTestEls = fixture.debugElement.queryAll(By.css('child-comp'));

      expect(childTestEls.length).toBe(1);
      expect(getDOM().hasClass(childTestEls[0].nativeElement, 'child-comp-class')).toBe(true);
    });

    it('should query child elements by directive', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();

      const childTestEls = fixture.debugElement.queryAll(By.directive(MessageDir));

      expect(childTestEls.length).toBe(4);
      expect(getDOM().hasClass(childTestEls[0].nativeElement, 'parent')).toBe(true);
      expect(getDOM().hasClass(childTestEls[1].nativeElement, 'parentnested')).toBe(true);
      expect(getDOM().hasClass(childTestEls[2].nativeElement, 'child')).toBe(true);
      expect(getDOM().hasClass(childTestEls[3].nativeElement, 'childnested')).toBe(true);
    });

    it('should query projected child elements by directive', () => {
      @Directive({selector: 'example-directive-a'})
      class ExampleDirectiveA {
      }

      @Component({
        selector: 'wrapper-component',
        template: `
          <ng-content select="example-directive-a"></ng-content>
        `
      })
      class WrapperComponent {
      }

      TestBed.configureTestingModule({
        declarations: [
          WrapperComponent,
          ExampleDirectiveA,
        ]
      });

      TestBed.overrideTemplate(TestApp, `<wrapper-component>
        <div></div>
        <example-directive-a></example-directive-a>
       </wrapper-component>`);

      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const debugElement = fixture.debugElement.query(By.directive(ExampleDirectiveA));
      expect(debugElement).toBeTruthy();
    });

    it('should query re-projected child elements by directive', () => {
      @Directive({selector: 'example-directive-a'})
      class ExampleDirectiveA {
      }

      @Component({
        selector: 'proxy-component',
        template: `
          <ng-content></ng-content>
        `
      })
      class ProxyComponent {
      }

      @Component({
        selector: 'wrapper-component',
        template: `
          <proxy-component>
            <ng-content select="div"></ng-content>
            <ng-content select="example-directive-a"></ng-content>
          </proxy-component>
        `
      })
      class WrapperComponent {
      }

      TestBed.configureTestingModule({
        declarations: [
          ProxyComponent,
          WrapperComponent,
          ExampleDirectiveA,
        ]
      });

      TestBed.overrideTemplate(TestApp, `<wrapper-component>
        <div></div>
        <example-directive-a></example-directive-a>
       </wrapper-component>`);

      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const debugElements = fixture.debugElement.queryAll(By.directive(ExampleDirectiveA));
      expect(debugElements.length).toBe(1);
    });

    it('should query directives on containers before directives in a view', () => {
      @Directive({selector: '[text]'})
      class TextDirective {
        @Input() text: string|undefined;
      }

      TestBed.configureTestingModule({declarations: [TextDirective]});
      TestBed.overrideTemplate(
          TestApp,
          `<ng-template text="first" [ngIf]="true"><div text="second"></div></ng-template>`);

      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const debugNodes = fixture.debugElement.queryAllNodes(By.directive(TextDirective));
      expect(debugNodes.length).toBe(2);
      expect(debugNodes[0].injector.get(TextDirective).text).toBe('first');
      expect(debugNodes[1].injector.get(TextDirective).text).toBe('second');
    });

    it('should query directives on views moved in the DOM', () => {
      @Directive({selector: '[text]'})
      class TextDirective {
        @Input() text: string|undefined;
      }

      @Directive({selector: '[moveView]'})
      class ViewManipulatingDirective {
        constructor(private _vcRef: ViewContainerRef, private _tplRef: TemplateRef<any>) {}

        insert() { this._vcRef.createEmbeddedView(this._tplRef); }

        removeFromTheDom() {
          const viewRef = this._vcRef.get(0) as EmbeddedViewRef<any>;
          viewRef.rootNodes.forEach(rootNode => { getDOM().remove(rootNode); });
        }
      }

      TestBed.configureTestingModule({declarations: [TextDirective, ViewManipulatingDirective]});
      TestBed.overrideTemplate(
          TestApp, `<ng-template text="first" moveView><div text="second"></div></ng-template>`);

      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const viewMover =
          fixture.debugElement.queryAllNodes(By.directive(ViewManipulatingDirective))[0]
              .injector.get(ViewManipulatingDirective);

      let debugNodes = fixture.debugElement.queryAllNodes(By.directive(TextDirective));

      // we've got just one directive on <ng-template>
      expect(debugNodes.length).toBe(1);
      expect(debugNodes[0].injector.get(TextDirective).text).toBe('first');

      // insert a view - now we expect to find 2 directive instances
      viewMover.insert();
      fixture.detectChanges();
      debugNodes = fixture.debugElement.queryAllNodes(By.directive(TextDirective));
      expect(debugNodes.length).toBe(2);

      // remove a view from the DOM (equivalent to moving it around)
      // the logical tree is the same but DOM has changed
      viewMover.removeFromTheDom();
      debugNodes = fixture.debugElement.queryAllNodes(By.directive(TextDirective));
      expect(debugNodes.length).toBe(2);
      expect(debugNodes[0].injector.get(TextDirective).text).toBe('first');
      expect(debugNodes[1].injector.get(TextDirective).text).toBe('second');
    });

    it('should list providerTokens', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();

      expect(fixture.debugElement.providerTokens).toContain(Logger);
    });

    it('should list locals', () => {
      fixture = TestBed.createComponent(LocalsComp);
      fixture.detectChanges();

      expect(fixture.debugElement.children[0].references !['alice']).toBeAnInstanceOf(MyDir);
    });

    it('should allow injecting from the element injector', () => {
      fixture = TestBed.createComponent(ParentComp);
      fixture.detectChanges();

      expect((<Logger>(fixture.debugElement.children[0].injector.get(Logger))).logs).toEqual([
        'parent', 'nestedparent', 'child', 'nestedchild'
      ]);
    });

    it('should list event listeners', () => {
      fixture = TestBed.createComponent(EventsComp);
      fixture.detectChanges();

      expect(fixture.debugElement.children[0].listeners.length).toEqual(1);
      expect(fixture.debugElement.children[1].listeners.length).toEqual(1);
    });

    it('should trigger event handlers', () => {
      fixture = TestBed.createComponent(EventsComp);
      fixture.detectChanges();

      expect(fixture.componentInstance.clicked).toBe(false);
      expect(fixture.componentInstance.customed).toBe(false);

      fixture.debugElement.children[0].triggerEventHandler('click', <Event>{});
      expect(fixture.componentInstance.clicked).toBe(true);

      fixture.debugElement.children[1].triggerEventHandler('myevent', <Event>{});
      expect(fixture.componentInstance.customed).toBe(true);

    });

    it('should include classes in properties.className', () => {
      fixture = TestBed.createComponent(HostClassBindingCmp);
      fixture.detectChanges();

      const debugElement = fixture.debugElement;

      expect(debugElement.properties.className).toBe('class-one class-two');

      fixture.componentInstance.hostClasses = 'class-three';
      fixture.detectChanges();

      expect(debugElement.properties.className).toBe('class-three');

      fixture.componentInstance.hostClasses = '';
      fixture.detectChanges();

      expect(debugElement.properties.className).toBeFalsy();
    });

    it('should preserve the type of the property values', () => {
      const fixture = TestBed.createComponent(TestCmptWithPropBindings);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.properties).toEqual({disabled: true, tabIndex: 1337, title: 'hello'});
    });

    describe('componentInstance on DebugNode', () => {

      it('should return component associated with a node if a node is a component host', () => {
        TestBed.overrideTemplate(TestCmpt, `<parent-comp></parent-comp>`);
        fixture = TestBed.createComponent(TestCmpt);

        const debugEl = fixture.debugElement.children[0];
        expect(debugEl.componentInstance).toBeAnInstanceOf(ParentComp);
      });

      it('should return component associated with a node if a node is a component host (content projection)',
         () => {
           TestBed.overrideTemplate(
               TestCmpt, `<parent-comp><child-comp></child-comp></parent-comp>`);
           fixture = TestBed.createComponent(TestCmpt);

           const debugEl = fixture.debugElement.query(By.directive(ChildComp));
           expect(debugEl.componentInstance).toBeAnInstanceOf(ChildComp);
         });

      it('should return host component instance if a node has no associated component and there is no component projecting this node',
         () => {
           TestBed.overrideTemplate(TestCmpt, `<div></div>`);
           fixture = TestBed.createComponent(TestCmpt);

           const debugEl = fixture.debugElement.children[0];
           expect(debugEl.componentInstance).toBeAnInstanceOf(TestCmpt);
         });

      it('should return host component instance if a node has no associated component and there is no component projecting this node (nested embedded views)',
         () => {
           TestBed.overrideTemplate(TestCmpt, `
                <ng-template [ngIf]="true">
                  <ng-template [ngIf]="true">
                    <div mydir></div>
                  </ng-template>
                </ng-template>`);
           fixture = TestBed.createComponent(TestCmpt);
           fixture.detectChanges();

           const debugEl = fixture.debugElement.query(By.directive(MyDir));
           expect(debugEl.componentInstance).toBeAnInstanceOf(TestCmpt);
         });

      it('should return component instance that projects a given node if a node has no associated component',
         () => {
           TestBed.overrideTemplate(
               TestCmpt, `<parent-comp><span><div></div></span></parent-comp>`);
           fixture = TestBed.createComponent(TestCmpt);

           const debugEl = fixture.debugElement.children[0].children[0].children[0];  // <div>
           expect(debugEl.componentInstance).toBeAnInstanceOf(ParentComp);
         });
    });

    it('should be able to query for elements that are not in the same DOM tree anymore', () => {
      fixture = TestBed.createComponent(SimpleContentComp);
      fixture.detectChanges();

      const parent = getDOM().parentElement(fixture.nativeElement) !;
      const content = fixture.componentInstance.content.nativeElement;

      // Move the content element outside the component
      // so that it can't be reached via querySelector.
      getDOM().appendChild(parent, content);

      expect(fixture.debugElement.query(By.css('.content'))).toBeTruthy();

      getDOM().remove(content);
    });

    it('should support components with ViewContainerRef', () => {
      fixture = TestBed.createComponent(TestCmptWithViewContainerRef);

      const divEl = fixture.debugElement.query(By.css('div'));
      expect(divEl).not.toBeNull();
    });

    it('should support querying on any debug element', () => {
      TestBed.overrideTemplate(TestCmpt, `<span><div id="a"><div id="b"></div></div></span>`);
      fixture = TestBed.createComponent(TestCmpt);

      const divA = fixture.debugElement.query(By.css('div'));
      expect(divA.nativeElement.getAttribute('id')).toBe('a');

      const divB = divA.query(By.css('div'));
      expect(divB.nativeElement.getAttribute('id')).toBe('b');
    });

  });
}
