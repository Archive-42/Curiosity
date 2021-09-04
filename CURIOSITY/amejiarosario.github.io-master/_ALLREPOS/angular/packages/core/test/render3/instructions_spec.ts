/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgForOfContext} from '@angular/common';
import {ɵɵpropertyInterpolate, ɵɵpropertyInterpolate1, ɵɵpropertyInterpolate2, ɵɵpropertyInterpolate3, ɵɵpropertyInterpolate4, ɵɵpropertyInterpolate5, ɵɵpropertyInterpolate6, ɵɵpropertyInterpolate7, ɵɵpropertyInterpolate8, ɵɵpropertyInterpolateV} from '@angular/core/src/render3/instructions/all';

import {ɵɵdefineComponent} from '../../src/render3/definition';
import {RenderFlags, ɵɵbind, ɵɵelement, ɵɵelementAttribute, ɵɵelementEnd, ɵɵelementProperty, ɵɵelementStart, ɵɵelementStyleProp, ɵɵelementStyling, ɵɵelementStylingApply, ɵɵelementStylingMap, ɵɵinterpolation1, ɵɵproperty, ɵɵselect, ɵɵtemplate, ɵɵtext, ɵɵtextBinding} from '../../src/render3/index';
import {AttributeMarker} from '../../src/render3/interfaces/node';
import {bypassSanitizationTrustHtml, bypassSanitizationTrustResourceUrl, bypassSanitizationTrustScript, bypassSanitizationTrustStyle, bypassSanitizationTrustUrl} from '../../src/sanitization/bypass';
import {ɵɵdefaultStyleSanitizer, ɵɵsanitizeHtml, ɵɵsanitizeResourceUrl, ɵɵsanitizeScript, ɵɵsanitizeStyle, ɵɵsanitizeUrl} from '../../src/sanitization/sanitization';
import {Sanitizer, SecurityContext} from '../../src/sanitization/security';
import {StyleSanitizeFn} from '../../src/sanitization/style_sanitizer';

import {NgForOf} from './common_with_def';
import {ComponentFixture, TemplateFixture} from './render_util';

describe('instructions', () => {
  function createAnchor() {
    ɵɵelementStart(0, 'a');
    ɵɵelementStyling();
    ɵɵelementEnd();
  }

  function createDiv(
      initialClasses?: string[] | null, classBindingNames?: string[] | null,
      initialStyles?: string[] | null, styleBindingNames?: string[] | null,
      styleSanitizer?: StyleSanitizeFn) {
    const attrs: any[] = [];
    if (initialClasses) {
      attrs.push(AttributeMarker.Classes, ...initialClasses);
    }
    if (initialStyles) {
      attrs.push(AttributeMarker.Styles, ...initialStyles);
    }
    ɵɵelementStart(0, 'div', attrs);
    ɵɵelementStyling(classBindingNames || null, styleBindingNames || null, styleSanitizer);
    ɵɵelementEnd();
  }

  function createScript() { ɵɵelement(0, 'script'); }

  describe('bind', () => {
    it('should update bindings when value changes', () => {
      const t = new TemplateFixture(createAnchor, () => {}, 1, 1);

      t.update(() => ɵɵelementProperty(0, 'title', ɵɵbind('Hello')));
      expect(t.html).toEqual('<a title="Hello"></a>');

      t.update(() => ɵɵelementProperty(0, 'title', ɵɵbind('World')));
      expect(t.html).toEqual('<a title="World"></a>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for hostElement + 1 for the template under test
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 2
      });
    });

    it('should not update bindings when value does not change', () => {
      const idempotentUpdate = () => ɵɵelementProperty(0, 'title', ɵɵbind('Hello'));
      const t = new TemplateFixture(createAnchor, idempotentUpdate, 1, 1);

      t.update();
      expect(t.html).toEqual('<a title="Hello"></a>');

      t.update();
      expect(t.html).toEqual('<a title="Hello"></a>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for hostElement + 1 for the template under test
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 1
      });
    });
  });

  describe('element', () => {
    it('should create an element', () => {
      const t = new TemplateFixture(() => {
        ɵɵelement(0, 'div', ['id', 'test', 'title', 'Hello']);
      }, () => {}, 1);

      const div = (t.hostElement as HTMLElement).querySelector('div') !;
      expect(div.id).toEqual('test');
      expect(div.title).toEqual('Hello');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
      });
    });

    it('should allow setting namespaced attributes', () => {
      const t = new TemplateFixture(() => {
        ɵɵelement(0, 'div', [
          // id="test"
          'id',
          'test',
          // test:foo="bar"
          AttributeMarker.NamespaceURI,
          'http://someuri.com/2018/test',
          'test:foo',
          'bar',
          // title="Hello"
          'title',
          'Hello',
        ]);
      }, () => {}, 1);

      const div = (t.hostElement as HTMLElement).querySelector('div') !;
      const attrs: any = div.attributes;

      expect(attrs['id'].name).toEqual('id');
      expect(attrs['id'].namespaceURI).toEqual(null);
      expect(attrs['id'].value).toEqual('test');

      expect(attrs['test:foo'].name).toEqual('test:foo');
      expect(attrs['test:foo'].namespaceURI).toEqual('http://someuri.com/2018/test');
      expect(attrs['test:foo'].value).toEqual('bar');

      expect(attrs['title'].name).toEqual('title');
      expect(attrs['title'].namespaceURI).toEqual(null);
      expect(attrs['title'].value).toEqual('Hello');

      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetAttribute: 3
      });
    });
  });

  describe('elementAttribute', () => {
    it('should use sanitizer function', () => {
      const t = new TemplateFixture(createDiv, () => {}, 1);

      t.update(() => ɵɵelementAttribute(0, 'title', 'javascript:true', ɵɵsanitizeUrl));
      expect(t.html).toEqual('<div title="unsafe:javascript:true"></div>');

      t.update(
          () => ɵɵelementAttribute(
              0, 'title', bypassSanitizationTrustUrl('javascript:true'), ɵɵsanitizeUrl));
      expect(t.html).toEqual('<div title="javascript:true"></div>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetAttribute: 2
      });
    });
  });

  describe('ɵɵselect', () => {
    it('should error in DevMode if index is out of range', () => {
      // Only one constant added, meaning only index `0` is valid.
      const t = new TemplateFixture(createDiv, () => {}, 1, 0);
      expect(() => { t.update(() => { ɵɵselect(-1); }); }).toThrow();
      expect(() => { t.update(() => { ɵɵselect(1); }); }).toThrow();
      expect(() => { t.update(() => { ɵɵselect(0); }); }).not.toThrow();
    });
  });

  describe('property', () => {
    // TODO(benlesh): Replace with TestBed tests once the instruction is being generated.
    it('should set properties of the ɵɵselected element', () => {
      // <div [title]="title"></div>
      const t = new TemplateFixture(createDiv, () => {}, 1, 1);
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'one');
      });
      expect(t.html).toEqual('<div title="one"></div>');
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'two');
      });
      expect(t.html).toEqual('<div title="two"></div>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 2,
      });
    });

    // TODO(benlesh): Replace with TestBed tests once the instruction is being generated.
    it('should chain', () => {
      // <div [title]="title" [accesskey]="key"></div>
      const t = new TemplateFixture(createDiv, () => {}, 1, 2);
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'one')('accessKey', 'A');
      });
      expect(t.html).toEqual('<div accesskey="A" title="one"></div>');
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'two')('accessKey', 'B');
      });
      expect(t.html).toEqual('<div accesskey="B" title="two"></div>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 4,
      });
    });

    // TODO(benlesh): Replace with TestBed tests once the instruction is being generated.
    it('should diff value changes', () => {
      // <div [title]="title" [accesskey]="key"></div>
      const t = new TemplateFixture(createDiv, () => {}, 1, 2);
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'one')('accessKey', 'A');
      });
      expect(t.html).toEqual('<div accesskey="A" title="one"></div>');
      t.update(() => {
        ɵɵselect(0);
        ɵɵproperty('title', 'two')('accessKey', 'A');  // Notice: only changing the title.
      });
      expect(t.html).toEqual('<div accesskey="A" title="two"></div>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 3,
      });
    });

    it('should error in dev mode if ɵɵselect was not called prior', () => {
      const t = new TemplateFixture(createDiv, () => {}, 1, 1);
      expect(() => { t.update(() => { ɵɵproperty('title', 'test'); }); }).toThrow();
      expect(() => {
        t.update(() => {
          ɵɵselect(0);
          ɵɵproperty('title', 'test');
        });
      }).not.toThrow();
    });
  });

  /**
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * TODO: REMOVE ALL OF THESE TemplateFixture TESTS FOR TestBed TESTS AFTER COMPILER IS UPDATED
   * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   */
  describe('ɵɵpropertyInterpolate instructions', () => {
    describe('ɵɵpropertyInterpolate', () => {
      it('should interpolate one value', () => {
        // <div title="{{123}}"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 1);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate('title', 123);
        });
        expect(t.html).toEqual('<div title="123"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate('title', 'abc');
        });
        expect(t.html).toEqual('<div title="abc"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="{{123}}" accesskey="{{'A'}}"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 2);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate('title', 123)('accessKey', 'A');
        });
        expect(t.html).toEqual('<div accesskey="A" title="123"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate('title', 'abc')('accessKey', 'B');
        });
        expect(t.html).toEqual('<div accesskey="B" title="abc"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 1);
        expect(() => { t.update(() => { ɵɵpropertyInterpolate('title', 123); }); }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => { ɵɵpropertyInterpolate('title', 123); });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate1', () => {
      it('should interpolate one value', () => {
        // <div title="start{{123}}end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 1);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate1('title', 'start', 123, 'end');
        });
        expect(t.html).toEqual('<div title="start123end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate1('title', 'start', 'abc', 'end');
        });
        expect(t.html).toEqual('<div title="startabcend"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start{{123}}end" data-teststartstart{{'A'}}end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 2);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate1('title', 'start', 123, 'end')('accessKey', 'start', 'A', 'end');
        });
        expect(t.html).toEqual('<div accesskey="startAend" title="start123end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate1('title', 'start', 'abc', 'end')('accessKey', 'start', 'B', 'end');
        });
        expect(t.html).toEqual('<div accesskey="startBend" title="startabcend"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 1);
        expect(() => {
          t.update(() => { ɵɵpropertyInterpolate1('title', 'start', 'whatever', 'end'); });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => { ɵɵpropertyInterpolate1('title', 'start', 'whatever', 'end'); });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate2', () => {
      it('should interpolate two values', () => {
        // <div title="start: {{v0}}, 1: {{v1}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 2);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate2('title', 'start: ', 0, ', 1: ', 1, ', end');
        });
        expect(t.html).toEqual('<div title="start: 0, 1: 1, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate2('title', 'start: ', 'A', ', 1: ', 'B', ', end');
        });
        expect(t.html).toEqual('<div title="start: A, 1: B, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}}, end" accesskey="start: {{v0}}, 1: {{v1}},
        // end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 4);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate2('title', 'start: ', 0, ', 1: ', 1, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, end" title="start: 0, 1: 1, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate2('title', 'start: ', 'A', ', 1: ', 'B', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, end" title="start: A, 1: B, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 2);
        expect(() => {
          t.update(() => { ɵɵpropertyInterpolate2('title', '', '', '', '', ''); });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => { ɵɵpropertyInterpolate2('title', '', '', '', '', ''); });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate3', () => {
      it('should interpolate three values', () => {
        // <div title="start: {{v0}}, 1: {{v1}}, 2: {{v2}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 3);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate3('title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', end');
        });
        expect(t.html).toEqual('<div title="start: 0, 1: 1, 2: 2, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate3('title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', end');
        });
        expect(t.html).toEqual('<div title="start: A, 1: B, 2: C, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}}, end" accesskey="start: {{v0}}, 1: {{v1}},
        // 2: {{v2}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 6);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate3('title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, end" title="start: 0, 1: 1, 2: 2, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate3('title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, end" title="start: A, 1: B, 2: C, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 3);
        expect(() => {
          t.update(() => { ɵɵpropertyInterpolate3('title', '', '', '', '', '', '', ''); });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => { ɵɵpropertyInterpolate3('title', '', '', '', '', '', '', ''); });
        }).not.toThrow();
      });
    });


    describe('ɵɵpropertyInterpolate4', () => {
      it('should interpolate four values', () => {
        // <div title="start: {{v0}}, 1: {{v1}}, 2: {{v2}}, 3: {{v3}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 4);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate4(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', end');
        });
        expect(t.html).toEqual('<div title="start: 0, 1: 1, 2: 2, 3: 3, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate4(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', end');
        });
        expect(t.html).toEqual('<div title="start: A, 1: B, 2: C, 3: D, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}}, end" accesskey="start: {{v0}} 1:
        // {{v1}} 2: {{v2}} 3: {{v3}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 8);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate4(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, end" title="start: 0, 1: 1, 2: 2, 3: 3, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate4(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, end" title="start: A, 1: B, 2: C, 3: D, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 4);
        expect(() => {
          t.update(() => { ɵɵpropertyInterpolate4('title', '', '', '', '', '', '', '', '', ''); });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => { ɵɵpropertyInterpolate4('title', '', '', '', '', '', '', '', '', ''); });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate5', () => {
      it('should interpolate five values', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 5);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate5(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', end');
        });
        expect(t.html).toEqual('<div title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate5(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', end');
        });
        expect(t.html).toEqual('<div title="start: A, 1: B, 2: C, 3: D, 4: E, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, end" accesskey="start:
        // {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 10);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate5(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, end" title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate5(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, 4: E, end" title="start: A, 1: B, 2: C, 3: D, 4: E, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 5);
        expect(() => {
          t.update(() => {
            ɵɵpropertyInterpolate5('title', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => {
            ɵɵpropertyInterpolate5('title', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate6', () => {
      it('should interpolate six values', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, 5: {{v5}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 6);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate6(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', end');
        });
        expect(t.html).toEqual('<div title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate6(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', end');
        });
        expect(t.html).toEqual('<div title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, 5: {{v5}}, end"
        // accesskey="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}}, 5: {{v5}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 12);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate6(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, end" title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate6(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, end" title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 6);
        expect(() => {
          t.update(() => {
            ɵɵpropertyInterpolate6('title', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => {
            ɵɵpropertyInterpolate6('title', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate7', () => {
      it('should interpolate seven values', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 7);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate7(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', end');
        });
        expect(t.html).toEqual(
            '<div title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate7(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', end');
        });
        expect(t.html).toEqual(
            '<div title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // 7: {{v7}} end" accesskey="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5:
        // {{v5}}, 6: {{v6}}, end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 14);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate7(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, end" title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate7(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, end" title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 7);
        expect(() => {
          t.update(() => {
            ɵɵpropertyInterpolate7(
                'title', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => {
            ɵɵpropertyInterpolate7(
                'title', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).not.toThrow();
      });
    });

    describe('ɵɵpropertyInterpolate8', () => {
      it('should interpolate eight values', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // 7: {{v7}} end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 8);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate8(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', 7: ', 7, ', end');
        });
        expect(t.html).toEqual(
            '<div title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate8(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', 7: ', 'H', ', end');
        });
        expect(t.html).toEqual(
            '<div title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // 7: {{v7}} end" accesskey="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5:
        // {{v5}}, 6: {{v6}}, 7: {{v7}} end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 16);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate8(
              'title', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', 7: ', 7, ', end')(
              'accessKey', 'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5,
              ', 6: ', 6, ', 7: ', 7, ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, end" title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolate8(
              'title', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', 7: ', 'H', ', end')(
              'accessKey', 'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E',
              ', 5: ', 'F', ', 6: ', 'G', ', 7: ', 'H', ', end');
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, end" title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 8);
        expect(() => {
          t.update(() => {
            ɵɵpropertyInterpolate8(
                'title', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => {
            ɵɵpropertyInterpolate8(
                'title', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          });
        }).not.toThrow();
      });
    });


    describe('ɵɵpropertyInterpolateV', () => {
      it('should interpolate eight or more values', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // 7: {{v7}}, 8: {{v8}} end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 9);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolateV('title', [
            'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5, ', 6: ', 6,
            ', 7: ', 7, ', 8: ', 8, ', end'
          ]);
        });
        expect(t.html).toEqual(
            '<div title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolateV('title', [
            'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E', ', 5: ', 'F',
            ', 6: ', 'G', ', 7: ', 'H', ', 8: ', 'I', ', end'
          ]);
        });
        expect(t.html).toEqual(
            '<div title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, 8: I, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 2,
        });
      });

      it('should chain', () => {
        // <div title="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5: {{v5}}, 6: {{v6}},
        // 7: {{v7}} end" accesskey="start: {{v0}} 1: {{v1}} 2: {{v2}} 3: {{v3}} 4: {{v4}} 5:
        // {{v5}}, 6: {{v6}}, 7: {{v7}}, 8: {{v8}} end"></div>
        const t = new TemplateFixture(createDiv, () => {}, 1, 18);
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolateV(
              'title',
              [
                'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5, ', 6: ',
                6, ', 7: ', 7, ', 8: ', 8, ', end'
              ])(
              'accessKey', [
                'start: ', 0, ', 1: ', 1, ', 2: ', 2, ', 3: ', 3, ', 4: ', 4, ', 5: ', 5, ', 6: ',
                6, ', 7: ', 7, ', 8: ', 8, ', end'
              ]);
        });
        expect(t.html).toEqual(
            '<div accesskey="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, end" title="start: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, end"></div>');
        t.update(() => {
          ɵɵselect(0);
          ɵɵpropertyInterpolateV(
              'title',
              [
                'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E', ', 5: ',
                'F', ', 6: ', 'G', ', 7: ', 'H', ', 8: ', 'I', ', end'
              ])(
              'accessKey', [
                'start: ', 'A', ', 1: ', 'B', ', 2: ', 'C', ', 3: ', 'D', ', 4: ', 'E', ', 5: ',
                'F', ', 6: ', 'G', ', 7: ', 'H', ', 8: ', 'I', ', end'
              ]);
        });
        expect(t.html).toEqual(
            '<div accesskey="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, 8: I, end" title="start: A, 1: B, 2: C, 3: D, 4: E, 5: F, 6: G, 7: H, 8: I, end"></div>');
        expect(ngDevMode).toHaveProperties({
          firstTemplatePass: 1,
          tNode: 2,  // 1 for div, 1 for host element
          tView: 2,  // 1 for rootView + 1 for the template view
          rendererCreateElement: 1,
          rendererSetProperty: 4,
        });
      });

      it('should error if called without ɵɵselect called first', () => {
        const t = new TemplateFixture(createDiv, () => {}, 1, 9);
        expect(() => {
          t.update(() => {
            ɵɵpropertyInterpolateV(
                'title',
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
          });
        }).toThrow();
        expect(() => {
          ɵɵselect(0);
          t.update(() => {
            ɵɵpropertyInterpolateV(
                'title',
                ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
          });
        }).not.toThrow();
      });
    });
  });

  describe('elementProperty', () => {
    it('should use sanitizer function when available', () => {
      const t = new TemplateFixture(createDiv, () => {}, 1);

      t.update(() => ɵɵelementProperty(0, 'title', 'javascript:true', ɵɵsanitizeUrl));
      expect(t.html).toEqual('<div title="unsafe:javascript:true"></div>');

      t.update(
          () => ɵɵelementProperty(
              0, 'title', bypassSanitizationTrustUrl('javascript:false'), ɵɵsanitizeUrl));
      expect(t.html).toEqual('<div title="javascript:false"></div>');
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
      });
    });

    it('should not stringify non string values', () => {
      const t = new TemplateFixture(() => { ɵɵelement(0, 'input'); }, () => {}, 1);

      // Note: don't use 'hidden' here because IE10 does not support the hidden property
      t.update(() => ɵɵelementProperty(0, 'required', false));
      // The required property would be true if `false` was stringified into `"false"`.
      expect((t.hostElement as HTMLElement).querySelector('input') !.required).toEqual(false);
      expect(ngDevMode).toHaveProperties({
        firstTemplatePass: 1,
        tNode: 2,  // 1 for div, 1 for host element
        tView: 2,  // 1 for rootView + 1 for the template view
        rendererCreateElement: 1,
        rendererSetProperty: 1
      });
    });
  });

  describe('elementStyleProp', () => {
    it('should automatically sanitize unless a bypass operation is applied', () => {
      const t = new TemplateFixture(() => {
        return createDiv(null, null, null, ['background-image'], ɵɵdefaultStyleSanitizer);
      }, () => {}, 1);
      t.update(() => {
        ɵɵelementStyleProp(0, 0, 'url("http://server")');
        ɵɵelementStylingApply(0);
      });
      // nothing is set because sanitizer suppresses it.
      expect(t.html).toEqual('<div></div>');

      t.update(() => {
        ɵɵelementStyleProp(0, 0, bypassSanitizationTrustStyle('url("http://server2")'));
        ɵɵelementStylingApply(0);
      });
      expect((t.hostElement.firstChild as HTMLElement).style.getPropertyValue('background-image'))
          .toEqual('url("http://server2")');
    });

    it('should not re-apply the style value even if it is a newly bypassed again', () => {
      const sanitizerInterceptor = new MockSanitizerInterceptor();
      const t = createTemplateFixtureWithSanitizer(
          () => createDiv(
              null, null, null, ['background-image'], sanitizerInterceptor.getStyleSanitizer()),
          1, sanitizerInterceptor);

      t.update(() => {
        ɵɵelementStyleProp(0, 0, bypassSanitizationTrustStyle('apple'));
        ɵɵelementStylingApply(0);
      });

      expect(sanitizerInterceptor.lastValue !).toEqual('apple');
      sanitizerInterceptor.lastValue = null;

      t.update(() => {
        ɵɵelementStyleProp(0, 0, bypassSanitizationTrustStyle('apple'));
        ɵɵelementStylingApply(0);
      });
      expect(sanitizerInterceptor.lastValue).toEqual(null);
    });
  });

  describe('elementStyleMap', () => {
    function createDivWithStyle() {
      ɵɵelementStart(0, 'div', [AttributeMarker.Styles, 'height', '10px']);
      ɵɵelementStyling([], ['height']);
      ɵɵelementEnd();
    }

    it('should add style', () => {
      const fixture = new TemplateFixture(createDivWithStyle, () => {}, 1);
      fixture.update(() => {
        ɵɵelementStylingMap(0, null, {'background-color': 'red'});
        ɵɵelementStylingApply(0);
      });
      expect(fixture.html).toEqual('<div style="background-color: red; height: 10px;"></div>');
    });

    it('should sanitize new styles that may contain `url` properties', () => {
      const detectedValues: string[] = [];
      const sanitizerInterceptor =
          new MockSanitizerInterceptor(value => { detectedValues.push(value); });
      const fixture = createTemplateFixtureWithSanitizer(
          () => createDiv(null, null, null, null, sanitizerInterceptor.getStyleSanitizer()), 1,
          sanitizerInterceptor);

      fixture.update(() => {
        ɵɵelementStylingMap(0, null, {
          'background-image': 'background-image',
          'background': 'background',
          'border-image': 'border-image',
          'list-style': 'list-style',
          'list-style-image': 'list-style-image',
          'filter': 'filter',
          'width': 'width'
        });
        ɵɵelementStylingApply(0);
      });

      const props = detectedValues.sort();
      expect(props).toEqual([
        'background', 'background-image', 'border-image', 'filter', 'list-style', 'list-style-image'
      ]);
    });
  });

  describe('elementClass', () => {
    function createDivWithStyling() {
      ɵɵelementStart(0, 'div');
      ɵɵelementStyling();
      ɵɵelementEnd();
    }

    it('should add class', () => {
      const fixture = new TemplateFixture(createDivWithStyling, () => {}, 1);
      fixture.update(() => {
        ɵɵelementStylingMap(0, 'multiple classes');
        ɵɵelementStylingApply(0);
      });
      expect(fixture.html).toEqual('<div class="multiple classes"></div>');
    });
  });

  describe('performance counters', () => {
    it('should create tViews only once for each nested level', () => {
      const _c0 = [AttributeMarker.Template, 'ngFor', 'ngForOf'];
      const _c1 = [AttributeMarker.Template, 'ngFor', 'ngForOf'];

      function ToDoAppComponent_NgForOf_Template_0(rf: RenderFlags, ctx0: NgForOfContext<any>) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'ul');
          ɵɵtemplate(1, ToDoAppComponent_NgForOf_NgForOf_Template_1, 2, 1, 'li', _c1);
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          const row_r2 = ctx0.$implicit;
          ɵɵelementProperty(1, 'ngForOf', ɵɵbind(row_r2));
        }
      }

      function ToDoAppComponent_NgForOf_NgForOf_Template_1(
          rf: RenderFlags, ctx1: NgForOfContext<any>) {
        if (rf & RenderFlags.Create) {
          ɵɵelementStart(0, 'li');
          ɵɵtext(1);
          ɵɵelementEnd();
        }
        if (rf & RenderFlags.Update) {
          const col_r3 = ctx1.$implicit;
          ɵɵtextBinding(1, ɵɵinterpolation1('', col_r3, ''));
        }
      }

      /**
       * <ul *ngFor="let row of rows">
       *   <li *ngFor="let col of row.cols">{{col}}</li>
       * </ul>
       */
      class NestedLoops {
        rows = [['a', 'b'], ['A', 'B'], ['a', 'b'], ['A', 'B']];

        static ngComponentDef = ɵɵdefineComponent({
          type: NestedLoops,
          selectors: [['nested-loops']],
          factory: function ToDoAppComponent_Factory() { return new NestedLoops(); },
          consts: 1,
          vars: 1,
          template: function ToDoAppComponent_Template(rf: RenderFlags, ctx: NestedLoops) {
            if (rf & RenderFlags.Create) {
              ɵɵtemplate(0, ToDoAppComponent_NgForOf_Template_0, 2, 1, 'ul', _c0);
            }
            if (rf & RenderFlags.Update) {
              ɵɵelementProperty(0, 'ngForOf', ɵɵbind(ctx.rows));
            }
          },
          directives: [NgForOf]
        });
      }
      const fixture = new ComponentFixture(NestedLoops);
      expect(ngDevMode).toHaveProperties({
        // Expect: fixture view/Host view + component + ngForRow + ngForCol
        tView: 4,  // should be: 4,
      });

    });
  });

  describe('sanitization injection compatibility', () => {
    it('should work for url sanitization', () => {
      const s = new LocalMockSanitizer(value => `${value}-sanitized`);
      const t = new TemplateFixture(createAnchor, undefined, 1, 0, null, null, s);
      const inputValue = 'http://foo';
      const outputValue = 'http://foo-sanitized';

      t.update(() => ɵɵelementAttribute(0, 'href', inputValue, ɵɵsanitizeUrl));
      expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
      expect(s.lastSanitizedValue).toEqual(outputValue);
    });

    it('should bypass url sanitization if marked by the service', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createAnchor, undefined, 1, 0, null, null, s);
      const inputValue = s.bypassSecurityTrustUrl('http://foo');
      const outputValue = 'http://foo';

      t.update(() => ɵɵelementAttribute(0, 'href', inputValue, ɵɵsanitizeUrl));
      expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should bypass ivy-level url sanitization if a custom sanitizer is used', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createAnchor, undefined, 1, 0, null, null, s);
      const inputValue = bypassSanitizationTrustUrl('http://foo');
      const outputValue = 'http://foo-ivy';

      t.update(() => ɵɵelementAttribute(0, 'href', inputValue, ɵɵsanitizeUrl));
      expect(t.html).toEqual(`<a href="${outputValue}"></a>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should work for style sanitization', () => {
      const s = new LocalMockSanitizer(value => `color:blue`);
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = 'color:red';
      const outputValue = 'color:blue';

      t.update(() => ɵɵelementAttribute(0, 'style', inputValue, ɵɵsanitizeStyle));
      expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
      expect(s.lastSanitizedValue).toEqual(outputValue);
    });

    it('should bypass style sanitization if marked by the service', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = s.bypassSecurityTrustStyle('color:maroon');
      const outputValue = 'color:maroon';

      t.update(() => ɵɵelementAttribute(0, 'style', inputValue, ɵɵsanitizeStyle));
      expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should bypass ivy-level style sanitization if a custom sanitizer is used', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = bypassSanitizationTrustStyle('font-family:foo');
      const outputValue = 'font-family:foo-ivy';

      t.update(() => ɵɵelementAttribute(0, 'style', inputValue, ɵɵsanitizeStyle));
      expect(stripStyleWsCharacters(t.html)).toEqual(`<div style="${outputValue}"></div>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should work for resourceUrl sanitization', () => {
      const s = new LocalMockSanitizer(value => `${value}-sanitized`);
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = 'http://resource';
      const outputValue = 'http://resource-sanitized';

      t.update(() => ɵɵelementAttribute(0, 'src', inputValue, ɵɵsanitizeResourceUrl));
      expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
      expect(s.lastSanitizedValue).toEqual(outputValue);
    });

    it('should bypass resourceUrl sanitization if marked by the service', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = s.bypassSecurityTrustResourceUrl('file://all-my-secrets.pdf');
      const outputValue = 'file://all-my-secrets.pdf';

      t.update(() => ɵɵelementAttribute(0, 'src', inputValue, ɵɵsanitizeResourceUrl));
      expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should bypass ivy-level resourceUrl sanitization if a custom sanitizer is used', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = bypassSanitizationTrustResourceUrl('file://all-my-secrets.pdf');
      const outputValue = 'file://all-my-secrets.pdf-ivy';

      t.update(() => ɵɵelementAttribute(0, 'src', inputValue, ɵɵsanitizeResourceUrl));
      expect(t.html).toEqual(`<script src="${outputValue}"></script>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should work for script sanitization', () => {
      const s = new LocalMockSanitizer(value => `${value} //sanitized`);
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = 'fn();';
      const outputValue = 'fn(); //sanitized';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeScript));
      expect(t.html).toEqual(`<script>${outputValue}</script>`);
      expect(s.lastSanitizedValue).toEqual(outputValue);
    });

    it('should bypass script sanitization if marked by the service', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = s.bypassSecurityTrustScript('alert("bar")');
      const outputValue = 'alert("bar")';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeScript));
      expect(t.html).toEqual(`<script>${outputValue}</script>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should bypass ivy-level script sanitization if a custom sanitizer is used', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createScript, undefined, 1, 0, null, null, s);
      const inputValue = bypassSanitizationTrustScript('alert("bar")');
      const outputValue = 'alert("bar")-ivy';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeScript));
      expect(t.html).toEqual(`<script>${outputValue}</script>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should work for html sanitization', () => {
      const s = new LocalMockSanitizer(value => `${value} <!--sanitized-->`);
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = '<header></header>';
      const outputValue = '<header></header> <!--sanitized-->';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeHtml));
      expect(t.html).toEqual(`<div>${outputValue}</div>`);
      expect(s.lastSanitizedValue).toEqual(outputValue);
    });

    it('should bypass html sanitization if marked by the service', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = s.bypassSecurityTrustHtml('<div onclick="alert(123)"></div>');
      const outputValue = '<div onclick="alert(123)"></div>';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeHtml));
      expect(t.html).toEqual(`<div>${outputValue}</div>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });

    it('should bypass ivy-level script sanitization if a custom sanitizer is used', () => {
      const s = new LocalMockSanitizer(value => '');
      const t = new TemplateFixture(createDiv, undefined, 1, 0, null, null, s);
      const inputValue = bypassSanitizationTrustHtml('<div onclick="alert(123)"></div>');
      const outputValue = '<div onclick="alert(123)"></div>-ivy';

      t.update(() => ɵɵelementProperty(0, 'innerHTML', inputValue, ɵɵsanitizeHtml));
      expect(t.html).toEqual(`<div>${outputValue}</div>`);
      expect(s.lastSanitizedValue).toBeFalsy();
    });
  });
});

class LocalSanitizedValue {
  constructor(public value: any) {}

  toString() { return this.value; }
}

class LocalMockSanitizer implements Sanitizer {
  // TODO(issue/24571): remove '!'.
  public lastSanitizedValue !: string | null;

  constructor(private _interceptor: (value: string|null|any) => string) {}

  sanitize(context: SecurityContext, value: LocalSanitizedValue|string|null|any): string|null {
    if (value instanceof String) {
      return value.toString() + '-ivy';
    }

    if (value instanceof LocalSanitizedValue) {
      return value.toString();
    }

    return this.lastSanitizedValue = this._interceptor(value);
  }

  bypassSecurityTrustHtml(value: string) { return new LocalSanitizedValue(value); }

  bypassSecurityTrustStyle(value: string) { return new LocalSanitizedValue(value); }

  bypassSecurityTrustScript(value: string) { return new LocalSanitizedValue(value); }

  bypassSecurityTrustUrl(value: string) { return new LocalSanitizedValue(value); }

  bypassSecurityTrustResourceUrl(value: string) { return new LocalSanitizedValue(value); }
}

class MockSanitizerInterceptor {
  public lastValue: string|null = null;
  constructor(private _interceptorFn?: ((value: any) => any)|null) {}
  getStyleSanitizer() { return ɵɵdefaultStyleSanitizer; }
  sanitize(context: SecurityContext, value: LocalSanitizedValue|string|null|any): string|null {
    if (this._interceptorFn) {
      this._interceptorFn(value);
    }
    return this.lastValue = value;
  }
}

function stripStyleWsCharacters(value: string): string {
  // color: blue; => color:blue
  return value.replace(/;/g, '').replace(/:\s+/g, ':');
}

function createTemplateFixtureWithSanitizer(
    buildFn: () => any, consts: number, sanitizer: Sanitizer) {
  return new TemplateFixture(buildFn, () => {}, consts, 0, null, null, sanitizer);
}
