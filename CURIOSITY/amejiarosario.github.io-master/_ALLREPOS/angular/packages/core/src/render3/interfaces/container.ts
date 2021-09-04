/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TNode} from './node';
import {LQueries} from './query';
import {RComment, RElement} from './renderer';
import {StylingContext} from './styling';
import {HOST, LView, NEXT, PARENT, QUERIES, T_HOST} from './view';


/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
export const TYPE = 1;
/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
export const ACTIVE_INDEX = 2;
// PARENT, NEXT, QUERIES and T_HOST are indices 3, 4, 5 and 6.
// As we already have these constants in LView, we don't need to re-create them.
export const NATIVE = 7;
export const VIEWS = 8;

/**
 * The state associated with a container.
 *
 * This is an array so that its structure is closer to LView. This helps
 * when traversing the view tree (which is a mix of containers and component
 * views), so we can jump to viewOrContainer[NEXT] in the same way regardless
 * of type.
 */
export interface LContainer extends Array<any> {
  /**
   * The host element of this LContainer.
   *
   * The host could be an LView if this container is on a component node.
   * In that case, the component LView is its HOST.
   *
   * It could also be a styling context if this is a node with a style/class
   * binding.
   */
  readonly[HOST]: RElement|RComment|StylingContext|LView;

  /**
   * This is a type field which allows us to differentiate `LContainer` from `StylingContext` in an
   * efficient way. The value is always set to `true`
   */
  [TYPE]: true;

  /**
   * The next active index in the views array to read or write to. This helps us
   * keep track of where we are in the views array.
   * In the case the LContainer is created for a ViewContainerRef,
   * it is set to null to identify this scenario, as indices are "absolute" in that case,
   * i.e. provided directly by the user of the ViewContainerRef API.
   */
  [ACTIVE_INDEX]: number;

  /**
   * Access to the parent view is necessary so we can propagate back
   * up from inside a container to parent[NEXT].
   */
  [PARENT]: LView;

  /**
   * This allows us to jump from a container to a sibling container or component
   * view with the same parent, so we can remove listeners efficiently.
   */
  [NEXT]: LView|LContainer|null;

  /**
   * Queries active for this container - all the views inserted to / removed from
   * this container are reported to queries referenced here.
   */
  [QUERIES]: LQueries|null;  // TODO(misko): This is abuse of `LContainer` since we are storing
  // `[QUERIES]` in it which are not needed for `LContainer` (only needed for Template)

  /**
   * Pointer to the `TNode` which represents the host of the container.
   */
  [T_HOST]: TNode;

  /** The comment element that serves as an anchor for this LContainer. */
  readonly[NATIVE]:
      RComment;  // TODO(misko): remove as this value can be gotten by unwrapping `[HOST]`

  /**
*A list of the container's currently active child views. Views will be inserted
*here as they are added and spliced from here when they are removed. We need
*to keep a record of current views so we know which views are already in the DOM
*(and don't need to be re-added) and so we can remove views from the DOM when they
*are no longer required.
*/
  [VIEWS]: LView[];
}

// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const unusedValueExportToPlacateAjd = 1;
