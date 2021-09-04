/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵRenderFlags, ɵrenderComponent as renderComponent, ɵɵcontainer, ɵɵcontainerRefreshEnd, ɵɵcontainerRefreshStart, ɵɵdefineComponent, ɵɵelementEnd, ɵɵelementStart, ɵɵelementStyleProp, ɵɵelementStyling, ɵɵembeddedViewEnd, ɵɵembeddedViewStart, ɵɵinterpolation1, ɵɵtext, ɵɵtextBinding} from '@angular/core';

import {bindAction, profile} from '../../util';
import {createDom, destroyDom, detectChanges} from '../render3/tree';
import {TreeNode, emptyTree} from '../util';

function noop() {}

export class TreeFunction {
  data: TreeNode = emptyTree;

  /** @nocollapse */
  static ngComponentDef = ɵɵdefineComponent({
    type: TreeFunction,
    selectors: [['tree']],
    consts: 5,
    vars: 1,
    template: function(rf: ɵRenderFlags, ctx: TreeFunction) {
      // bit of a hack
      TreeTpl(rf, ctx.data);
    },
    factory: () => new TreeFunction,
    inputs: {data: 'data'}
  });
}

const c1 = ['background-color'];
export function TreeTpl(rf: ɵRenderFlags, ctx: TreeNode) {
  if (rf & ɵRenderFlags.Create) {
    ɵɵelementStart(0, 'tree');
    {
      ɵɵelementStart(1, 'span');
      ɵɵelementStyling(null, c1);
      { ɵɵtext(2); }
      ɵɵelementEnd();
      ɵɵcontainer(3);
      ɵɵcontainer(4);
    }
    ɵɵelementEnd();
  }
  if (rf & ɵRenderFlags.Update) {
    ɵɵelementStyleProp(1, 0, ctx.depth % 2 ? '' : 'grey');
    ɵɵtextBinding(2, ɵɵinterpolation1(' ', ctx.value, ' '));
    ɵɵcontainerRefreshStart(3);
    {
      if (ctx.left != null) {
        let rf0 = ɵɵembeddedViewStart(0, 5, 1);
        { TreeTpl(rf0, ctx.left); }
        ɵɵembeddedViewEnd();
      }
    }
    ɵɵcontainerRefreshEnd();
    ɵɵcontainerRefreshStart(4);
    {
      if (ctx.right != null) {
        let rf0 = ɵɵembeddedViewStart(0, 5, 1);
        { TreeTpl(rf0, ctx.right); }
        ɵɵembeddedViewEnd();
      }
    }
    ɵɵcontainerRefreshEnd();
  }
}

let component: TreeFunction;
if (typeof window !== 'undefined') {
  component = renderComponent(TreeFunction);
  bindAction('#createDom', () => createDom(component as any));
  bindAction('#destroyDom', () => destroyDom(component as any));
  bindAction('#detectChanges', () => detectChanges(component as any));
  bindAction(
      '#detectChangesProfile',
      profile(() => detectChanges(component as any), noop, 'detectChanges'));
  bindAction('#updateDomProfile', profile(() => createDom(component as any), noop, 'update'));
  bindAction(
      '#createDomProfile',
      profile(() => createDom(component as any), () => destroyDom(component as any), 'create'));
}
