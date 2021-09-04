/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TemplateRef} from '@angular/core';

import {AttributeMarker, RenderFlags, ɵɵdefineDirective} from '../../src/render3/index';
import {ɵɵbind, ɵɵdirectiveInject, ɵɵelement, ɵɵelementContainerEnd, ɵɵelementContainerStart, ɵɵelementProperty, ɵɵtemplate, ɵɵtext} from '../../src/render3/instructions/all';

import {NgIf} from './common_with_def';
import {ComponentFixture, createComponent, getDirectiveOnNode} from './render_util';

describe('TemplateRef', () => {

  describe('rootNodes', () => {

    class DirectiveWithTplRef {
      static ngDirectiveDef = ɵɵdefineDirective({
        type: DirectiveWithTplRef,
        selectors: [['', 'tplRef', '']],
        factory: () => new DirectiveWithTplRef(ɵɵdirectiveInject(TemplateRef as any))
      });

      // injecting a ViewContainerRef to create a dynamic container in which embedded views will be
      // created
      constructor(public tplRef: TemplateRef<{}>) {}
    }

    it('should return root render nodes for an embedded view instance', () => {
      let directiveWithTplRef: DirectiveWithTplRef;

      function embeddedTemplate(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelement(0, 'div');
          ɵɵtext(1, 'some text');
          ɵɵelement(2, 'span');
        }
      }

      /*
          <ng-template tplRef>
              <div></div>
              some text
              <span></span>
          </ng-template>
       */
      const AppComponent = createComponent('app-cmp', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, embeddedTemplate, 3, 0, 'ng-template', ['tplRef', '']);
          directiveWithTplRef = getDirectiveOnNode(0, 0);
        }
      }, 1, 0, [DirectiveWithTplRef]);


      const fixture = new ComponentFixture(AppComponent);
      expect(directiveWithTplRef !).toBeDefined();

      const viewRef = directiveWithTplRef !.tplRef.createEmbeddedView({});
      expect(viewRef.rootNodes.length).toBe(3);
    });

    /**
     * This is different as compared to the view engine implementation which returns a comment node
     * in this case:
     * https://stackblitz.com/edit/angular-uiqry6?file=src/app/app.component.ts
     *
     * Returning a comment node for a template ref with no nodes is wrong and should be fixed in
     * ivy.
     */
    it('should return an empty array for embedded view with no nodes', () => {
      let directiveWithTplRef: DirectiveWithTplRef;

      /*
          <ng-template tplRef></ng-template>
       */
      const AppComponent = createComponent('app-cmp', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, () => {}, 0, 0, 'ng-template', ['tplRef', '']);
          directiveWithTplRef = getDirectiveOnNode(0, 0);
        }
      }, 1, 0, [DirectiveWithTplRef]);


      const fixture = new ComponentFixture(AppComponent);
      expect(directiveWithTplRef !).toBeDefined();

      const viewRef = directiveWithTplRef !.tplRef.createEmbeddedView({});
      expect(viewRef.rootNodes.length).toBe(0);
    });

    /**
     * This is somehow surprising but the current view engine don't descend into containers when
     * getting root nodes of an embedded view:
     * https://stackblitz.com/edit/angular-z8zev7?file=src/app/app.component.ts
     */
    it('should not descend into containers when retrieving root nodes', () => {
      let directiveWithTplRef: DirectiveWithTplRef;

      function ngIfTemplate(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtext(0, 'text');
        }
      }

      function embeddedTemplate(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, ngIfTemplate, 1, 0, 'ng-template', [AttributeMarker.Bindings, 'ngIf']);
        }
        if (rf & RenderFlags.Update) {
          ɵɵelementProperty(0, 'ngIf', ɵɵbind(ctx.showing));
        }
      }

      /*
          <ng-template tplRef><ng-template [ngIf]="true">text</ng-template></ng-template>
       */
      const AppComponent = createComponent('app-cmp', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, embeddedTemplate, 1, 1, 'ng-template', ['tplRef', '']);
          directiveWithTplRef = getDirectiveOnNode(0, 0);
        }
      }, 1, 0, [DirectiveWithTplRef, NgIf]);


      const fixture = new ComponentFixture(AppComponent);
      expect(directiveWithTplRef !).toBeDefined();

      const viewRef = directiveWithTplRef !.tplRef.createEmbeddedView({});

      // assert that we've got a comment node (only!) corresponding to <ng-template [ngIf]="true">
      expect(viewRef.rootNodes.length).toBe(1);
      expect(viewRef.rootNodes[0].nodeType).toBe(8);
    });


    /**
     * Contrary to containers (<ng-template>) we _do_ descend into element containers
     * (<ng-container):
     * https://stackblitz.com/edit/angular-yovmmp?file=src/app/app.component.ts
     */
    it('should descend into element containers when retrieving root nodes', () => {
      let directiveWithTplRef: DirectiveWithTplRef;

      function embeddedTemplate(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵelementContainerStart(0);
          { ɵɵtext(1, 'text'); }
          ɵɵelementContainerEnd();
        }
      }

      /*
          <ng-template tplRef><ng-container>text</ng-container></ng-template>
       */
      const AppComponent = createComponent('app-cmp', function(rf: RenderFlags, ctx: any) {
        if (rf & RenderFlags.Create) {
          ɵɵtemplate(0, embeddedTemplate, 2, 0, 'ng-template', ['tplRef', '']);
          directiveWithTplRef = getDirectiveOnNode(0, 0);
        }
      }, 1, 0, [DirectiveWithTplRef]);


      const fixture = new ComponentFixture(AppComponent);
      expect(directiveWithTplRef !).toBeDefined();

      const viewRef = directiveWithTplRef !.tplRef.createEmbeddedView({});

      expect(viewRef.rootNodes.length).toBe(2);
      expect(viewRef.rootNodes[0].nodeType)
          .toBe(8);  // a comment node (only!) corresponding to <ng-container>
      expect(viewRef.rootNodes[1].nodeType).toBe(3);  // a text node
    });
  });
});
