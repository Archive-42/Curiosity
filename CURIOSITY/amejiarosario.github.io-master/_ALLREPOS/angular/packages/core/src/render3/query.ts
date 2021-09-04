/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// We are temporarily importing the existing viewEngine_from core so we can be sure we are
// correctly implementing its interfaces for backwards compatibility.

import {Type} from '../interface/type';
import {ElementRef as ViewEngine_ElementRef} from '../linker/element_ref';
import {QueryList} from '../linker/query_list';
import {TemplateRef as ViewEngine_TemplateRef} from '../linker/template_ref';
import {assertDataInRange, assertDefined, assertEqual} from '../util/assert';

import {assertPreviousIsParent} from './assert';
import {getNodeInjectable, locateDirectiveOrProvider} from './di';
import {NG_ELEMENT_ID} from './fields';
import {store, ɵɵload} from './instructions/all';
import {storeCleanupWithContext} from './instructions/shared';
import {unusedValueExportToPlacateAjd as unused1} from './interfaces/definition';
import {unusedValueExportToPlacateAjd as unused2} from './interfaces/injector';
import {TContainerNode, TElementContainerNode, TElementNode, TNode, TNodeType, unusedValueExportToPlacateAjd as unused3} from './interfaces/node';
import {LQueries, unusedValueExportToPlacateAjd as unused4} from './interfaces/query';
import {CONTENT_QUERIES, HEADER_OFFSET, LView, QUERIES, TVIEW} from './interfaces/view';
import {getCurrentQueryIndex, getIsParent, getLView, isCreationMode, setCurrentQueryIndex} from './state';
import {createElementRef, createTemplateRef} from './view_engine_compatibility';

const unusedValueToPlacateAjd = unused1 + unused2 + unused3 + unused4;

/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 */
export interface QueryPredicate<T> {
  /**
   * If looking for directives then it contains the directive type.
   */
  type: Type<T>|null;

  /**
   * If selector then contains local names to query for.
   */
  selector: string[]|null;

  /**
   * Indicates which token should be read from DI for this query.
   */
  read: Type<T>|null;
}

/**
 * An object representing a query, which is a combination of:
 * - query predicate to determines if a given element/directive should be included in the query
 * - values collected based on a predicate
 * - `QueryList` to which collected values should be reported
 */
export interface LQuery<T> {
  /**
   * Next query. Used when queries are stored as a linked list in `LQueries`.
   */
  next: LQuery<any>|null;

  /**
   * Destination to which the value should be added.
   */
  list: QueryList<T>;

  /**
   * A predicate which determines if a given element/directive should be included in the query
   * results.
   */
  predicate: QueryPredicate<T>;

  /**
   * Values which have been located.
   *
   * This is what builds up the `QueryList._valuesTree`.
   */
  values: any[];

  /**
   * A pointer to an array that stores collected values from views. This is necessary so we know a
   * container into which to insert nodes collected from views.
   */
  containerValues: any[]|null;
}

export class LQueries_ implements LQueries {
  constructor(
      public parent: LQueries_|null, private shallow: LQuery<any>|null,
      private deep: LQuery<any>|null) {}

  track<T>(queryList: QueryList<T>, predicate: Type<T>|string[], descend?: boolean, read?: Type<T>):
      void {
    if (descend) {
      this.deep = createQuery(this.deep, queryList, predicate, read != null ? read : null);
    } else {
      this.shallow = createQuery(this.shallow, queryList, predicate, read != null ? read : null);
    }
  }

  clone(): LQueries { return new LQueries_(this, null, this.deep); }

  container(): LQueries|null {
    const shallowResults = copyQueriesToContainer(this.shallow);
    const deepResults = copyQueriesToContainer(this.deep);
    return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
  }

  createView(): LQueries|null {
    const shallowResults = copyQueriesToView(this.shallow);
    const deepResults = copyQueriesToView(this.deep);

    return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
  }

  insertView(index: number): void {
    insertView(index, this.shallow);
    insertView(index, this.deep);
  }

  addNode(tNode: TElementNode|TContainerNode|TElementContainerNode): void {
    add(this.deep, tNode, false);
    add(this.shallow, tNode, false);
  }

  insertNodeBeforeViews(tNode: TElementNode|TContainerNode|TElementContainerNode): void {
    add(this.deep, tNode, true);
    add(this.shallow, tNode, true);
  }

  removeView(): void {
    removeView(this.shallow);
    removeView(this.deep);
  }
}

function copyQueriesToContainer(query: LQuery<any>| null): LQuery<any>|null {
  let result: LQuery<any>|null = null;

  while (query) {
    const containerValues: any[] = [];  // prepare room for views
    query.values.push(containerValues);
    const clonedQuery: LQuery<any> = {
      next: result,
      list: query.list,
      predicate: query.predicate,
      values: containerValues,
      containerValues: null
    };
    result = clonedQuery;
    query = query.next;
  }

  return result;
}

function copyQueriesToView(query: LQuery<any>| null): LQuery<any>|null {
  let result: LQuery<any>|null = null;

  while (query) {
    const clonedQuery: LQuery<any> = {
      next: result,
      list: query.list,
      predicate: query.predicate,
      values: [],
      containerValues: query.values
    };
    result = clonedQuery;
    query = query.next;
  }

  return result;
}

function insertView(index: number, query: LQuery<any>| null) {
  while (query) {
    ngDevMode && assertViewQueryhasPointerToDeclarationContainer(query);
    query.containerValues !.splice(index, 0, query.values);

    // mark a query as dirty only when inserted view had matching modes
    if (query.values.length) {
      query.list.setDirty();
    }

    query = query.next;
  }
}

function removeView(query: LQuery<any>| null) {
  while (query) {
    ngDevMode && assertViewQueryhasPointerToDeclarationContainer(query);

    const containerValues = query.containerValues !;
    const viewValuesIdx = containerValues.indexOf(query.values);
    const removed = containerValues.splice(viewValuesIdx, 1);

    // mark a query as dirty only when removed view had matching modes
    ngDevMode && assertEqual(removed.length, 1, 'removed.length');
    if (removed[0].length) {
      query.list.setDirty();
    }

    query = query.next;
  }
}

function assertViewQueryhasPointerToDeclarationContainer(query: LQuery<any>) {
  assertDefined(query.containerValues, 'View queries need to have a pointer to container values.');
}

/**
 * Iterates over local names for a given node and returns directive index
 * (or -1 if a local name points to an element).
 *
 * @param tNode static data of a node to check
 * @param selector selector to match
 * @returns directive index, -1 or null if a selector didn't match any of the local names
 */
function getIdxOfMatchingSelector(tNode: TNode, selector: string): number|null {
  const localNames = tNode.localNames;
  if (localNames) {
    for (let i = 0; i < localNames.length; i += 2) {
      if (localNames[i] === selector) {
        return localNames[i + 1] as number;
      }
    }
  }
  return null;
}


// TODO: "read" should be an AbstractType (FW-486)
function queryByReadToken(read: any, tNode: TNode, currentView: LView): any {
  const factoryFn = (read as any)[NG_ELEMENT_ID];
  if (typeof factoryFn === 'function') {
    return factoryFn();
  } else {
    const matchingIdx =
        locateDirectiveOrProvider(tNode, currentView, read as Type<any>, false, false);
    if (matchingIdx !== null) {
      return getNodeInjectable(
          currentView[TVIEW].data, currentView, matchingIdx, tNode as TElementNode);
    }
  }
  return null;
}

function queryByTNodeType(tNode: TNode, currentView: LView): any {
  if (tNode.type === TNodeType.Element || tNode.type === TNodeType.ElementContainer) {
    return createElementRef(ViewEngine_ElementRef, tNode, currentView);
  }
  if (tNode.type === TNodeType.Container) {
    return createTemplateRef(ViewEngine_TemplateRef, ViewEngine_ElementRef, tNode, currentView);
  }
  return null;
}

function queryByTemplateRef(
    templateRefToken: ViewEngine_TemplateRef<any>, tNode: TNode, currentView: LView,
    read: any): any {
  const templateRefResult = (templateRefToken as any)[NG_ELEMENT_ID]();
  if (read) {
    return templateRefResult ? queryByReadToken(read, tNode, currentView) : null;
  }
  return templateRefResult;
}

function queryRead(tNode: TNode, currentView: LView, read: any, matchingIdx: number): any {
  if (read) {
    return queryByReadToken(read, tNode, currentView);
  }
  if (matchingIdx > -1) {
    return getNodeInjectable(
        currentView[TVIEW].data, currentView, matchingIdx, tNode as TElementNode);
  }
  // if read token and / or strategy is not specified,
  // detect it using appropriate tNode type
  return queryByTNodeType(tNode, currentView);
}

/**
 * Add query matches for a given node.
 *
 * @param query The first query in the linked list
 * @param tNode The TNode to match against queries
 * @param insertBeforeContainer Whether or not we should add matches before the last
 * container array. This mode is necessary if the query container had to be created
 * out of order (e.g. a view was created in a constructor)
 */
function add(
    query: LQuery<any>| null, tNode: TElementNode | TContainerNode | TElementContainerNode,
    insertBeforeContainer: boolean) {
  const currentView = getLView();

  while (query) {
    const predicate = query.predicate;
    const type = predicate.type as any;
    if (type) {
      let result = null;
      if (type === ViewEngine_TemplateRef) {
        result = queryByTemplateRef(type, tNode, currentView, predicate.read);
      } else {
        const matchingIdx = locateDirectiveOrProvider(tNode, currentView, type, false, false);
        if (matchingIdx !== null) {
          result = queryRead(tNode, currentView, predicate.read, matchingIdx);
        }
      }
      if (result !== null) {
        addMatch(query, result, insertBeforeContainer);
      }
    } else {
      const selector = predicate.selector !;
      for (let i = 0; i < selector.length; i++) {
        const matchingIdx = getIdxOfMatchingSelector(tNode, selector[i]);
        if (matchingIdx !== null) {
          const result = queryRead(tNode, currentView, predicate.read, matchingIdx);
          if (result !== null) {
            addMatch(query, result, insertBeforeContainer);
          }
        }
      }
    }
    query = query.next;
  }
}

function addMatch(query: LQuery<any>, matchingValue: any, insertBeforeViewMatches: boolean): void {
  // Views created in constructors may have their container values created too early. In this case,
  // ensure template node results are spliced before container results. Otherwise, results inside
  // embedded views will appear before results on parent template nodes when flattened.
  insertBeforeViewMatches ? query.values.splice(-1, 0, matchingValue) :
                            query.values.push(matchingValue);
  query.list.setDirty();
}

function createPredicate<T>(predicate: Type<T>| string[], read: Type<T>| null): QueryPredicate<T> {
  const isArray = Array.isArray(predicate);
  return {
    type: isArray ? null : predicate as Type<T>,
    selector: isArray ? predicate as string[] : null,
    read: read
  };
}

function createQuery<T>(
    previous: LQuery<any>| null, queryList: QueryList<T>, predicate: Type<T>| string[],
    read: Type<T>| null): LQuery<T> {
  return {
    next: previous,
    list: queryList,
    predicate: createPredicate(predicate, read),
    values: (queryList as any as QueryList_<T>)._valuesTree,
    containerValues: null
  };
}

type QueryList_<T> = QueryList<T>& {_valuesTree: any[], _static: boolean};

/**
 * Creates and returns a QueryList.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 */
export function query<T>(
    // TODO: "read" should be an AbstractType (FW-486)
    predicate: Type<any>| string[], descend: boolean, read: any): QueryList<T> {
  ngDevMode && assertPreviousIsParent(getIsParent());
  const lView = getLView();
  const queryList = new QueryList<T>() as QueryList_<T>;
  const queries = lView[QUERIES] || (lView[QUERIES] = new LQueries_(null, null, null));
  queryList._valuesTree = [];
  queryList._static = false;
  queries.track(queryList, predicate, descend, read);
  storeCleanupWithContext(lView, queryList, queryList.destroy);
  return queryList;
}

/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 *
 * @returns `true` if a query got dirty during change detection or if this is a static query
 * resolving in creation mode, `false` otherwise.
 *
 * @codeGenApi
 */
export function ɵɵqueryRefresh(queryList: QueryList<any>): boolean {
  const queryListImpl = (queryList as any as QueryList_<any>);
  const creationMode = isCreationMode();

  // if creation mode and static or update mode and not static
  if (queryList.dirty && creationMode === queryListImpl._static) {
    queryList.reset(queryListImpl._valuesTree || []);
    queryList.notifyOnChanges();
    return true;
  }
  return false;
}

/**
 * Creates new QueryList for a static view query.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export function ɵɵstaticViewQuery<T>(
    // TODO(FW-486): "read" should be an AbstractType
    predicate: Type<any>| string[], descend: boolean, read: any): void {
  const queryList = ɵɵviewQuery(predicate, descend, read) as QueryList_<T>;
  const tView = getLView()[TVIEW];
  queryList._static = true;
  if (!tView.staticViewQueries) {
    tView.staticViewQueries = true;
  }
}

/**
 * Creates new QueryList, stores the reference in LView and returns QueryList.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export function ɵɵviewQuery<T>(
    // TODO(FW-486): "read" should be an AbstractType
    predicate: Type<any>| string[], descend: boolean, read: any): QueryList<T> {
  const lView = getLView();
  const tView = lView[TVIEW];
  if (tView.firstTemplatePass) {
    tView.expandoStartIndex++;
  }
  const index = getCurrentQueryIndex();
  const viewQuery: QueryList<T> = query<T>(predicate, descend, read);
  store(index - HEADER_OFFSET, viewQuery);
  setCurrentQueryIndex(index + 1);
  return viewQuery;
}

/**
 * Loads current View Query and moves the pointer/index to the next View Query in LView.
 *
 * @codeGenApi
 */
export function ɵɵloadViewQuery<T>(): T {
  const index = getCurrentQueryIndex();
  setCurrentQueryIndex(index + 1);
  return ɵɵload<T>(index - HEADER_OFFSET);
}

/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export function ɵɵcontentQuery<T>(
    directiveIndex: number, predicate: Type<any>| string[], descend: boolean,
    // TODO(FW-486): "read" should be an AbstractType
    read: any): QueryList<T> {
  const lView = getLView();
  const tView = lView[TVIEW];
  const contentQuery: QueryList<T> = query<T>(predicate, descend, read);
  (lView[CONTENT_QUERIES] || (lView[CONTENT_QUERIES] = [])).push(contentQuery);
  if (tView.firstTemplatePass) {
    const tViewContentQueries = tView.contentQueries || (tView.contentQueries = []);
    const lastSavedDirectiveIndex =
        tView.contentQueries.length ? tView.contentQueries[tView.contentQueries.length - 1] : -1;
    if (directiveIndex !== lastSavedDirectiveIndex) {
      tViewContentQueries.push(directiveIndex);
    }
  }
  return contentQuery;
}

/**
 * Registers a QueryList, associated with a static content query, for later refresh
 * (part of a view refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export function ɵɵstaticContentQuery<T>(
    directiveIndex: number, predicate: Type<any>| string[], descend: boolean,
    // TODO(FW-486): "read" should be an AbstractType
    read: any): void {
  const queryList = ɵɵcontentQuery(directiveIndex, predicate, descend, read) as QueryList_<T>;
  const tView = getLView()[TVIEW];
  queryList._static = true;
  if (!tView.staticContentQueries) {
    tView.staticContentQueries = true;
  }
}

/**
 *
 * @codeGenApi
 */
export function ɵɵloadContentQuery<T>(): QueryList<T> {
  const lView = getLView();
  ngDevMode &&
      assertDefined(
          lView[CONTENT_QUERIES], 'Content QueryList array should be defined if reading a query.');

  const index = getCurrentQueryIndex();
  ngDevMode && assertDataInRange(lView[CONTENT_QUERIES] !, index);

  setCurrentQueryIndex(index + 1);
  return lView[CONTENT_QUERIES] ![index];
}
