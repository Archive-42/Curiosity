/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Injector} from '../../di';
import {ErrorHandler} from '../../error_handler';
import {Type} from '../../interface/type';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SchemaMetadata} from '../../metadata/schema';
import {validateAgainstEventProperties} from '../../sanitization/sanitization';
import {Sanitizer} from '../../sanitization/security';
import {assertDataInRange, assertDefined, assertDomNode, assertEqual, assertLessThan, assertNotEqual} from '../../util/assert';
import {normalizeDebugBindingName, normalizeDebugBindingValue} from '../../util/ng_reflect';
import {assertLView, assertPreviousIsParent} from '../assert';
import {attachPatchData, getComponentViewByInstance} from '../context_discovery';
import {attachLContainerDebug, attachLViewDebug} from '../debug';
import {diPublicInInjector, getNodeInjectable, getOrCreateNodeInjectorForNode} from '../di';
import {throwMultipleComponentError} from '../errors';
import {executeHooks, executePreOrderHooks, registerPreOrderHooks} from '../hooks';
import {ACTIVE_INDEX, LContainer, VIEWS} from '../interfaces/container';
import {ComponentDef, ComponentTemplate, DirectiveDef, DirectiveDefListOrFactory, PipeDefListOrFactory, RenderFlags, ViewQueriesFunction} from '../interfaces/definition';
import {INJECTOR_BLOOM_PARENT_SIZE, NodeInjectorFactory} from '../interfaces/injector';
import {AttributeMarker, InitialInputData, InitialInputs, LocalRefExtractor, PropertyAliasValue, PropertyAliases, TAttributes, TContainerNode, TElementContainerNode, TElementNode, TIcuContainerNode, TNode, TNodeFlags, TNodeProviderIndexes, TNodeType, TProjectionNode, TViewNode} from '../interfaces/node';
import {LQueries} from '../interfaces/query';
import {RComment, RElement, RText, Renderer3, RendererFactory3, isProceduralRenderer} from '../interfaces/renderer';
import {SanitizerFn} from '../interfaces/sanitization';
import {StylingContext} from '../interfaces/styling';
import {BINDING_INDEX, CHILD_HEAD, CHILD_TAIL, CLEANUP, CONTEXT, DECLARATION_VIEW, ExpandoInstructions, FLAGS, HEADER_OFFSET, HOST, INJECTOR, InitPhaseState, LView, LViewFlags, NEXT, PARENT, QUERIES, RENDERER, RENDERER_FACTORY, RootContext, RootContextFlags, SANITIZER, TData, TVIEW, TView, T_HOST} from '../interfaces/view';
import {assertNodeOfPossibleTypes, assertNodeType} from '../node_assert';
import {isNodeMatchingSelectorList} from '../node_selector_matcher';
import {enterView, getBindingsEnabled, getCheckNoChangesMode, getIsParent, getLView, getNamespace, getPreviousOrParentTNode, getSelectedIndex, incrementActiveDirectiveId, isCreationMode, leaveView, resetComponentState, setActiveHostElement, setBindingRoot, setCheckNoChangesMode, setCurrentDirectiveDef, setCurrentQueryIndex, setIsParent, setPreviousOrParentTNode, setSelectedIndex, ɵɵnamespaceHTML} from '../state';
import {initializeStaticContext as initializeStaticStylingContext} from '../styling/class_and_style_bindings';
import {ANIMATION_PROP_PREFIX, isAnimationProp} from '../styling/util';
import {NO_CHANGE} from '../tokens';
import {attrsStylingIndexOf} from '../util/attrs_utils';
import {INTERPOLATION_DELIMITER, stringifyForError} from '../util/misc_utils';
import {getLViewParent, getRootContext} from '../util/view_traversal_utils';
import {getComponentViewByIndex, getNativeByIndex, getNativeByTNode, getTNode, isComponent, isComponentDef, isContentQueryHost, isRootView, readPatchedLView, resetPreOrderHookFlags, unwrapRNode, viewAttachedToChangeDetector} from '../util/view_utils';



/**
 * A permanent marker promise which signifies that the current CD tree is
 * clean.
 */
const _CLEAN_PROMISE = Promise.resolve(null);

export const enum BindingDirection {
  Input,
  Output,
}

/**
 * Refreshes the view, executing the following steps in that order:
 * triggers init hooks, refreshes dynamic embedded views, triggers content hooks, sets host
 * bindings, refreshes child components.
 * Note: view hooks are triggered later when leaving the view.
 */
export function refreshDescendantViews(lView: LView) {
  const tView = lView[TVIEW];
  const creationMode = isCreationMode(lView);

  // This needs to be set before children are processed to support recursive components
  tView.firstTemplatePass = false;

  // Resetting the bindingIndex of the current LView as the next steps may trigger change detection.
  lView[BINDING_INDEX] = tView.bindingStartIndex;

  // If this is a creation pass, we should not call lifecycle hooks or evaluate bindings.
  // This will be done in the update pass.
  if (!creationMode) {
    const checkNoChangesMode = getCheckNoChangesMode();

    executePreOrderHooks(lView, tView, checkNoChangesMode, undefined);

    refreshDynamicEmbeddedViews(lView);

    // Content query results must be refreshed before content hooks are called.
    refreshContentQueries(tView, lView);

    resetPreOrderHookFlags(lView);
    executeHooks(
        lView, tView.contentHooks, tView.contentCheckHooks, checkNoChangesMode,
        InitPhaseState.AfterContentInitHooksToBeRun, undefined);

    setHostBindings(tView, lView);
  }

  // We resolve content queries specifically marked as `static` in creation mode. Dynamic
  // content queries are resolved during change detection (i.e. update mode), after embedded
  // views are refreshed (see block above).
  if (creationMode && tView.staticContentQueries) {
    refreshContentQueries(tView, lView);
  }

  refreshChildComponents(tView.components);
}


/** Sets the host bindings for the current view. */
export function setHostBindings(tView: TView, viewData: LView): void {
  const selectedIndex = getSelectedIndex();
  try {
    if (tView.expandoInstructions) {
      let bindingRootIndex = viewData[BINDING_INDEX] = tView.expandoStartIndex;
      setBindingRoot(bindingRootIndex);
      let currentDirectiveIndex = -1;
      let currentElementIndex = -1;
      for (let i = 0; i < tView.expandoInstructions.length; i++) {
        const instruction = tView.expandoInstructions[i];
        if (typeof instruction === 'number') {
          if (instruction <= 0) {
            // Negative numbers mean that we are starting new EXPANDO block and need to update
            // the current element and directive index.
            currentElementIndex = -instruction;
            setActiveHostElement(currentElementIndex);

            // Injector block and providers are taken into account.
            const providerCount = (tView.expandoInstructions[++i] as number);
            bindingRootIndex += INJECTOR_BLOOM_PARENT_SIZE + providerCount;

            currentDirectiveIndex = bindingRootIndex;
          } else {
            // This is either the injector size (so the binding root can skip over directives
            // and get to the first set of host bindings on this node) or the host var count
            // (to get to the next set of host bindings on this node).
            bindingRootIndex += instruction;
          }
          setBindingRoot(bindingRootIndex);
        } else {
          // If it's not a number, it's a host binding function that needs to be executed.
          if (instruction !== null) {
            viewData[BINDING_INDEX] = bindingRootIndex;
            const hostCtx = unwrapRNode(viewData[currentDirectiveIndex]);
            instruction(RenderFlags.Update, hostCtx, currentElementIndex);

            // Each directive gets a uniqueId value that is the same for both
            // create and update calls when the hostBindings function is called. The
            // directive uniqueId is not set anywhere--it is just incremented between
            // each hostBindings call and is useful for helping instruction code
            // uniquely determine which directive is currently active when executed.
            incrementActiveDirectiveId();
          }
          currentDirectiveIndex++;
        }
      }
    }
  } finally {
    setActiveHostElement(selectedIndex);
  }
}

/** Refreshes content queries for all directives in the given view. */
function refreshContentQueries(tView: TView, lView: LView): void {
  if (tView.contentQueries != null) {
    setCurrentQueryIndex(0);
    for (let i = 0; i < tView.contentQueries.length; i++) {
      const directiveDefIdx = tView.contentQueries[i];
      const directiveDef = tView.data[directiveDefIdx] as DirectiveDef<any>;
      ngDevMode &&
          assertDefined(directiveDef.contentQueries, 'contentQueries function should be defined');
      directiveDef.contentQueries !(RenderFlags.Update, lView[directiveDefIdx], directiveDefIdx);
    }
  }
}

/** Refreshes child components in the current view. */
function refreshChildComponents(components: number[] | null): void {
  if (components != null) {
    for (let i = 0; i < components.length; i++) {
      componentRefresh(components[i]);
    }
  }
}


/**
 * Creates a native element from a tag name, using a renderer.
 * @param name the tag name
 * @param overriddenRenderer Optional A renderer to override the default one
 * @returns the element created
 */
export function elementCreate(name: string, overriddenRenderer?: Renderer3): RElement {
  let native: RElement;
  const rendererToUse = overriddenRenderer || getLView()[RENDERER];

  const namespace = getNamespace();

  if (isProceduralRenderer(rendererToUse)) {
    native = rendererToUse.createElement(name, namespace);
  } else {
    if (namespace === null) {
      native = rendererToUse.createElement(name);
    } else {
      native = rendererToUse.createElementNS(namespace, name);
    }
  }
  return native;
}

export function createLView<T>(
    parentLView: LView | null, tView: TView, context: T | null, flags: LViewFlags,
    host: RElement | null, tHostNode: TViewNode | TElementNode | null,
    rendererFactory?: RendererFactory3 | null, renderer?: Renderer3 | null,
    sanitizer?: Sanitizer | null, injector?: Injector | null): LView {
  const lView = tView.blueprint.slice() as LView;
  lView[HOST] = host;
  lView[FLAGS] = flags | LViewFlags.CreationMode | LViewFlags.Attached | LViewFlags.FirstLViewPass;
  resetPreOrderHookFlags(lView);
  lView[PARENT] = lView[DECLARATION_VIEW] = parentLView;
  lView[CONTEXT] = context;
  lView[RENDERER_FACTORY] = (rendererFactory || parentLView && parentLView[RENDERER_FACTORY]) !;
  ngDevMode && assertDefined(lView[RENDERER_FACTORY], 'RendererFactory is required');
  lView[RENDERER] = (renderer || parentLView && parentLView[RENDERER]) !;
  ngDevMode && assertDefined(lView[RENDERER], 'Renderer is required');
  lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null !;
  lView[INJECTOR as any] = injector || parentLView && parentLView[INJECTOR] || null;
  lView[T_HOST] = tHostNode;
  ngDevMode && attachLViewDebug(lView);
  return lView;
}

/**
 * Create and stores the TNode, and hooks it up to the tree.
 *
 * @param index The index at which the TNode should be saved (null if view, since they are not
 * saved).
 * @param type The type of TNode to create
 * @param native The native element for this node, if applicable
 * @param name The tag name of the associated native element, if applicable
 * @param attrs Any attrs for the native element, if applicable
 */
export function createNodeAtIndex(
    index: number, type: TNodeType.Element, native: RElement | RText | null, name: string | null,
    attrs: TAttributes | null): TElementNode;
export function createNodeAtIndex(
    index: number, type: TNodeType.Container, native: RComment, name: string | null,
    attrs: TAttributes | null): TContainerNode;
export function createNodeAtIndex(
    index: number, type: TNodeType.Projection, native: null, name: null,
    attrs: TAttributes | null): TProjectionNode;
export function createNodeAtIndex(
    index: number, type: TNodeType.ElementContainer, native: RComment, name: string | null,
    attrs: TAttributes | null): TElementContainerNode;
export function createNodeAtIndex(
    index: number, type: TNodeType.IcuContainer, native: RComment, name: null,
    attrs: TAttributes | null): TElementContainerNode;
export function createNodeAtIndex(
    index: number, type: TNodeType, native: RText | RElement | RComment | null, name: string | null,
    attrs: TAttributes | null): TElementNode&TContainerNode&TElementContainerNode&TProjectionNode&
    TIcuContainerNode {
  const lView = getLView();
  const tView = lView[TVIEW];
  const adjustedIndex = index + HEADER_OFFSET;
  ngDevMode &&
      assertLessThan(adjustedIndex, lView.length, `Slot should have been initialized with null`);
  lView[adjustedIndex] = native;

  const previousOrParentTNode = getPreviousOrParentTNode();
  const isParent = getIsParent();
  let tNode = tView.data[adjustedIndex] as TNode;
  if (tNode == null) {
    const parent =
        isParent ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent;

    // Parents cannot cross component boundaries because components will be used in multiple places,
    // so it's only set if the view is the same.
    const parentInSameView = parent && parent !== lView[T_HOST];
    const tParentNode = parentInSameView ? parent as TElementNode | TContainerNode : null;

    tNode = tView.data[adjustedIndex] = createTNode(tParentNode, type, adjustedIndex, name, attrs);
  }

  // Now link ourselves into the tree.
  // We need this even if tNode exists, otherwise we might end up pointing to unexisting tNodes when
  // we use i18n (especially with ICU expressions that update the DOM during the update phase).
  if (previousOrParentTNode) {
    if (isParent && previousOrParentTNode.child == null &&
        (tNode.parent !== null || previousOrParentTNode.type === TNodeType.View)) {
      // We are in the same view, which means we are adding content node to the parent view.
      previousOrParentTNode.child = tNode;
    } else if (!isParent) {
      previousOrParentTNode.next = tNode;
    }
  }

  if (tView.firstChild == null) {
    tView.firstChild = tNode;
  }

  setPreviousOrParentTNode(tNode);
  setIsParent(true);
  return tNode as TElementNode & TViewNode & TContainerNode & TElementContainerNode &
      TProjectionNode & TIcuContainerNode;
}

export function assignTViewNodeToLView(
    tView: TView, tParentNode: TNode | null, index: number, lView: LView): TViewNode {
  // View nodes are not stored in data because they can be added / removed at runtime (which
  // would cause indices to change). Their TNodes are instead stored in tView.node.
  let tNode = tView.node;
  if (tNode == null) {
    ngDevMode && tParentNode &&
        assertNodeOfPossibleTypes(tParentNode, TNodeType.Element, TNodeType.Container);
    tView.node = tNode = createTNode(
        tParentNode as TElementNode | TContainerNode | null,  //
        TNodeType.View, index, null, null) as TViewNode;
  }

  return lView[T_HOST] = tNode as TViewNode;
}


/**
 * When elements are created dynamically after a view blueprint is created (e.g. through
 * i18nApply() or ComponentFactory.create), we need to adjust the blueprint for future
 * template passes.
 */
export function allocExpando(view: LView, numSlotsToAlloc: number) {
  const tView = view[TVIEW];
  if (tView.firstTemplatePass) {
    for (let i = 0; i < numSlotsToAlloc; i++) {
      tView.blueprint.push(null);
      tView.data.push(null);
      view.push(null);
    }

    // We should only increment the expando start index if there aren't already directives
    // and injectors saved in the "expando" section
    if (!tView.expandoInstructions) {
      tView.expandoStartIndex += numSlotsToAlloc;
    } else {
      // Since we're adding the dynamic nodes into the expando section, we need to let the host
      // bindings know that they should skip x slots
      tView.expandoInstructions.push(numSlotsToAlloc);
    }
  }
}


//////////////////////////
//// Render
//////////////////////////

/**
 *
 * @param hostNode Existing node to render into.
 * @param templateFn Template function with the instructions.
 * @param consts The number of nodes, local refs, and pipes in this template
 * @param context to pass into the template.
 * @param providedRendererFactory renderer factory to use
 * @param host The host element node to use
 * @param directives Directive defs that should be used for matching
 * @param pipes Pipe defs that should be used for matching
 */
export function renderTemplate<T>(
    hostNode: RElement, templateFn: ComponentTemplate<T>, consts: number, vars: number, context: T,
    providedRendererFactory: RendererFactory3, componentView: LView | null,
    directives?: DirectiveDefListOrFactory | null, pipes?: PipeDefListOrFactory | null,
    sanitizer?: Sanitizer | null): LView {
  if (componentView === null) {
    resetComponentState();
    const renderer = providedRendererFactory.createRenderer(null, null);

    // We need to create a root view so it's possible to look up the host element through its index
    const hostLView = createLView(
        null, createTView(-1, null, 1, 0, null, null, null, null), {},
        LViewFlags.CheckAlways | LViewFlags.IsRoot, null, null, providedRendererFactory, renderer);
    enterView(hostLView, null);  // SUSPECT! why do we need to enter the View?

    const componentTView =
        getOrCreateTView(templateFn, consts, vars, directives || null, pipes || null, null, null);
    const hostTNode = createNodeAtIndex(0, TNodeType.Element, hostNode, null, null);
    componentView = createLView(
        hostLView, componentTView, context, LViewFlags.CheckAlways, hostNode, hostTNode,
        providedRendererFactory, renderer, sanitizer);
  }
  renderComponentOrTemplate(componentView, context, templateFn);
  return componentView;
}

/**
 * Used for creating the LViewNode of a dynamic embedded view,
 * either through ViewContainerRef.createEmbeddedView() or TemplateRef.createEmbeddedView().
 * Such lViewNode will then be renderer with renderEmbeddedTemplate() (see below).
 */
export function createEmbeddedViewAndNode<T>(
    tView: TView, context: T, declarationView: LView, queries: LQueries | null,
    injectorIndex: number): LView {
  const _isParent = getIsParent();
  const _previousOrParentTNode = getPreviousOrParentTNode();
  setIsParent(true);
  setPreviousOrParentTNode(null !);

  const lView = createLView(declarationView, tView, context, LViewFlags.CheckAlways, null, null);
  lView[DECLARATION_VIEW] = declarationView;

  if (queries) {
    lView[QUERIES] = queries.createView();
  }
  assignTViewNodeToLView(tView, null, -1, lView);

  if (tView.firstTemplatePass) {
    tView.node !.injectorIndex = injectorIndex;
  }

  setIsParent(_isParent);
  setPreviousOrParentTNode(_previousOrParentTNode);
  return lView;
}

/**
 * Used for rendering embedded views (e.g. dynamically created views)
 *
 * Dynamically created views must store/retrieve their TViews differently from component views
 * because their template functions are nested in the template functions of their hosts, creating
 * closures. If their host template happens to be an embedded template in a loop (e.g. ngFor inside
 * an ngFor), the nesting would mean we'd have multiple instances of the template function, so we
 * can't store TViews in the template function itself (as we do for comps). Instead, we store the
 * TView for dynamically created views on their host TNode, which only has one instance.
 */
export function renderEmbeddedTemplate<T>(viewToRender: LView, tView: TView, context: T) {
  const _isParent = getIsParent();
  const _previousOrParentTNode = getPreviousOrParentTNode();
  let oldView: LView;
  if (viewToRender[FLAGS] & LViewFlags.IsRoot) {
    // This is a root view inside the view tree
    tickRootContext(getRootContext(viewToRender));
  } else {
    try {
      setIsParent(true);
      setPreviousOrParentTNode(null !);

      oldView = enterView(viewToRender, viewToRender[T_HOST]);
      resetPreOrderHookFlags(viewToRender);
      executeTemplate(tView.template !, getRenderFlags(viewToRender), context);

      // This must be set to false immediately after the first creation run because in an
      // ngFor loop, all the views will be created together before update mode runs and turns
      // off firstTemplatePass. If we don't set it here, instances will perform directive
      // matching, etc again and again.
      viewToRender[TVIEW].firstTemplatePass = false;

      refreshDescendantViews(viewToRender);
    } finally {
      leaveView(oldView !);
      setIsParent(_isParent);
      setPreviousOrParentTNode(_previousOrParentTNode);
    }
  }
}

function renderComponentOrTemplate<T>(
    hostView: LView, context: T, templateFn?: ComponentTemplate<T>) {
  const rendererFactory = hostView[RENDERER_FACTORY];
  const oldView = enterView(hostView, hostView[T_HOST]);
  const normalExecutionPath = !getCheckNoChangesMode();
  const creationModeIsActive = isCreationMode(hostView);
  try {
    if (normalExecutionPath && !creationModeIsActive && rendererFactory.begin) {
      rendererFactory.begin();
    }

    if (creationModeIsActive) {
      // creation mode pass
      templateFn && executeTemplate(templateFn, RenderFlags.Create, context);

      refreshDescendantViews(hostView);
      hostView[FLAGS] &= ~LViewFlags.CreationMode;
    }

    // update mode pass
    resetPreOrderHookFlags(hostView);
    templateFn && executeTemplate(templateFn, RenderFlags.Update, context);
    refreshDescendantViews(hostView);
  } finally {
    if (normalExecutionPath && !creationModeIsActive && rendererFactory.end) {
      rendererFactory.end();
    }
    leaveView(oldView);
  }
}

function executeTemplate<T>(templateFn: ComponentTemplate<T>, rf: RenderFlags, context: T) {
  ɵɵnamespaceHTML();
  const prevSelectedIndex = getSelectedIndex();
  try {
    setActiveHostElement(null);
    templateFn(rf, context);
  } finally {
    setSelectedIndex(prevSelectedIndex);
  }
}

/**
 * This function returns the default configuration of rendering flags depending on when the
 * template is in creation mode or update mode. Update block and create block are
 * always run separately.
 */
function getRenderFlags(view: LView): RenderFlags {
  return isCreationMode(view) ? RenderFlags.Create : RenderFlags.Update;
}

//////////////////////////
//// Element
//////////////////////////

/**
 * Appropriately sets `stylingTemplate` on a TNode
 *
 * Does not apply styles to DOM nodes
 *
 * @param tNode The node whose `stylingTemplate` to set
 * @param attrs The attribute array source to set the attributes from
 * @param attrsStartIndex Optional start index to start processing the `attrs` from
 */
export function setNodeStylingTemplate(
    tView: TView, tNode: TNode, attrs: TAttributes, attrsStartIndex: number) {
  if (tView.firstTemplatePass && !tNode.stylingTemplate) {
    const stylingAttrsStartIndex = attrsStylingIndexOf(attrs, attrsStartIndex);
    if (stylingAttrsStartIndex >= 0) {
      tNode.stylingTemplate = initializeStaticStylingContext(attrs, stylingAttrsStartIndex);
    }
  }
}

export function executeContentQueries(tView: TView, tNode: TNode, lView: LView) {
  if (isContentQueryHost(tNode)) {
    const start = tNode.directiveStart;
    const end = tNode.directiveEnd;
    for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
      const def = tView.data[directiveIndex] as DirectiveDef<any>;
      if (def.contentQueries) {
        def.contentQueries(RenderFlags.Create, lView[directiveIndex], directiveIndex);
      }
    }
  }
}


/**
 * Creates directive instances and populates local refs.
 *
 * @param localRefs Local refs of the node in question
 * @param localRefExtractor mapping function that extracts local ref value from TNode
 */
export function createDirectivesAndLocals(
    tView: TView, lView: LView, localRefs: string[] | null | undefined,
    localRefExtractor: LocalRefExtractor = getNativeByTNode) {
  if (!getBindingsEnabled()) return;
  const previousOrParentTNode = getPreviousOrParentTNode();
  if (tView.firstTemplatePass) {
    ngDevMode && ngDevMode.firstTemplatePass++;
    resolveDirectives(
        tView, lView, findDirectiveMatches(tView, lView, previousOrParentTNode),
        previousOrParentTNode, localRefs || null);
  }
  instantiateAllDirectives(tView, lView, previousOrParentTNode);
  invokeDirectivesHostBindings(tView, lView, previousOrParentTNode);
  saveResolvedLocalsInData(lView, previousOrParentTNode, localRefExtractor);
}

/**
 * Takes a list of local names and indices and pushes the resolved local variable values
 * to LView in the same order as they are loaded in the template with load().
 */
function saveResolvedLocalsInData(
    viewData: LView, tNode: TNode, localRefExtractor: LocalRefExtractor): void {
  const localNames = tNode.localNames;
  if (localNames) {
    let localIndex = tNode.index + 1;
    for (let i = 0; i < localNames.length; i += 2) {
      const index = localNames[i + 1] as number;
      const value = index === -1 ?
          localRefExtractor(
              tNode as TElementNode | TContainerNode | TElementContainerNode, viewData) :
          viewData[index];
      viewData[localIndex++] = value;
    }
  }
}

/**
 * Gets TView from a template function or creates a new TView
 * if it doesn't already exist.
 *
 * @param templateFn The template from which to get static data
 * @param consts The number of nodes, local refs, and pipes in this view
 * @param vars The number of bindings and pure function bindings in this view
 * @param directives Directive defs that should be saved on TView
 * @param pipes Pipe defs that should be saved on TView
 * @param viewQuery View query that should be saved on TView
 * @param schemas Schemas that should be saved on TView
 * @returns TView
 */
export function getOrCreateTView(
    templateFn: ComponentTemplate<any>, consts: number, vars: number,
    directives: DirectiveDefListOrFactory | null, pipes: PipeDefListOrFactory | null,
    viewQuery: ViewQueriesFunction<any>| null, schemas: SchemaMetadata[] | null): TView {
  // TODO(misko): reading `ngPrivateData` here is problematic for two reasons
  // 1. It is a megamorphic call on each invocation.
  // 2. For nested embedded views (ngFor inside ngFor) the template instance is per
  //    outer template invocation, which means that no such property will exist
  // Correct solution is to only put `ngPrivateData` on the Component template
  // and not on embedded templates.

  return templateFn.ngPrivateData ||
      (templateFn.ngPrivateData = createTView(
           -1, templateFn, consts, vars, directives, pipes, viewQuery, schemas) as never);
}

/**
 * Creates a TView instance
 *
 * @param viewIndex The viewBlockId for inline views, or -1 if it's a component/dynamic
 * @param templateFn Template function
 * @param consts The number of nodes, local refs, and pipes in this template
 * @param directives Registry of directives for this view
 * @param pipes Registry of pipes for this view
 * @param viewQuery View queries for this view
 * @param schemas Schemas for this view
 */
export function createTView(
    viewIndex: number, templateFn: ComponentTemplate<any>| null, consts: number, vars: number,
    directives: DirectiveDefListOrFactory | null, pipes: PipeDefListOrFactory | null,
    viewQuery: ViewQueriesFunction<any>| null, schemas: SchemaMetadata[] | null): TView {
  ngDevMode && ngDevMode.tView++;
  const bindingStartIndex = HEADER_OFFSET + consts;
  // This length does not yet contain host bindings from child directives because at this point,
  // we don't know which directives are active on this template. As soon as a directive is matched
  // that has a host binding, we will update the blueprint with that def's hostVars count.
  const initialViewLength = bindingStartIndex + vars;
  const blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
  return blueprint[TVIEW as any] = {
    id: viewIndex,
    blueprint: blueprint,
    template: templateFn,
    viewQuery: viewQuery,
    node: null !,
    data: blueprint.slice().fill(null, bindingStartIndex),
    bindingStartIndex: bindingStartIndex,
    viewQueryStartIndex: initialViewLength,
    expandoStartIndex: initialViewLength,
    expandoInstructions: null,
    firstTemplatePass: true,
    staticViewQueries: false,
    staticContentQueries: false,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof directives === 'function' ? directives() : directives,
    pipeRegistry: typeof pipes === 'function' ? pipes() : pipes,
    firstChild: null,
    schemas: schemas,
  };
}

function createViewBlueprint(bindingStartIndex: number, initialViewLength: number): LView {
  const blueprint = new Array(initialViewLength)
                        .fill(null, 0, bindingStartIndex)
                        .fill(NO_CHANGE, bindingStartIndex) as LView;
  blueprint[BINDING_INDEX] = bindingStartIndex;
  return blueprint;
}

export function createError(text: string, token: any) {
  return new Error(`Renderer: ${text} [${stringifyForError(token)}]`);
}


/**
 * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
 *
 * @param elementOrSelector Render element or CSS selector to locate the element.
 */
export function locateHostElement(
    factory: RendererFactory3, elementOrSelector: RElement | string): RElement|null {
  const defaultRenderer = factory.createRenderer(null, null);
  const rNode = typeof elementOrSelector === 'string' ?
      (isProceduralRenderer(defaultRenderer) ?
           defaultRenderer.selectRootElement(elementOrSelector) :
           defaultRenderer.querySelector(elementOrSelector)) :
      elementOrSelector;
  if (ngDevMode && !rNode) {
    if (typeof elementOrSelector === 'string') {
      throw createError('Host node with selector not found:', elementOrSelector);
    } else {
      throw createError('Host node is required:', elementOrSelector);
    }
  }
  return rNode;
}

/**
 * Saves context for this cleanup function in LView.cleanupInstances.
 *
 * On the first template pass, saves in TView:
 * - Cleanup function
 * - Index of context we just saved in LView.cleanupInstances
 */
export function storeCleanupWithContext(lView: LView, context: any, cleanupFn: Function): void {
  const lCleanup = getCleanup(lView);
  lCleanup.push(context);

  if (lView[TVIEW].firstTemplatePass) {
    getTViewCleanup(lView).push(cleanupFn, lCleanup.length - 1);
  }
}

/**
 * Saves the cleanup function itself in LView.cleanupInstances.
 *
 * This is necessary for functions that are wrapped with their contexts, like in renderer2
 * listeners.
 *
 * On the first template pass, the index of the cleanup function is saved in TView.
 */
export function storeCleanupFn(view: LView, cleanupFn: Function): void {
  getCleanup(view).push(cleanupFn);

  if (view[TVIEW].firstTemplatePass) {
    getTViewCleanup(view).push(view[CLEANUP] !.length - 1, null);
  }
}

// TODO: Remove this when the issue is resolved.
/**
 * Tsickle has a bug where it creates an infinite loop for a function returning itself.
 * This is a temporary type that will be removed when the issue is resolved.
 * https://github.com/angular/tsickle/issues/1009)
 */
export type TsickleIssue1009 = any;

/**
 * Constructs a TNode object from the arguments.
 *
 * @param type The type of the node
 * @param adjustedIndex The index of the TNode in TView.data, adjusted for HEADER_OFFSET
 * @param tagName The tag name of the node
 * @param attrs The attributes defined on this node
 * @param tViews Any TViews attached to this node
 * @returns the TNode object
 */
export function createTNode(
    tParent: TElementNode | TContainerNode | null, type: TNodeType, adjustedIndex: number,
    tagName: string | null, attrs: TAttributes | null): TNode {
  ngDevMode && ngDevMode.tNode++;
  return {
    type: type,
    index: adjustedIndex,
    injectorIndex: tParent ? tParent.injectorIndex : -1,
    directiveStart: -1,
    directiveEnd: -1,
    propertyMetadataStartIndex: -1,
    propertyMetadataEndIndex: -1,
    flags: 0,
    providerIndexes: 0,
    tagName: tagName,
    attrs: attrs,
    localNames: null,
    initialInputs: undefined,
    inputs: undefined,
    outputs: undefined,
    tViews: null,
    next: null,
    projectionNext: null,
    child: null,
    parent: tParent,
    stylingTemplate: null,
    projection: null,
    onElementCreationFns: null,
  };
}


/**
 * Consolidates all inputs or outputs of all directives on this logical node.
 *
 * @param tNode
 * @param direction whether to consider inputs or outputs
 * @returns PropertyAliases|null aggregate of all properties if any, `null` otherwise
 */
export function generatePropertyAliases(tNode: TNode, direction: BindingDirection): PropertyAliases|
    null {
  const tView = getLView()[TVIEW];
  let propStore: PropertyAliases|null = null;
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;

  if (end > start) {
    const isInput = direction === BindingDirection.Input;
    const defs = tView.data;

    for (let i = start; i < end; i++) {
      const directiveDef = defs[i] as DirectiveDef<any>;
      const propertyAliasMap: {[publicName: string]: string} =
          isInput ? directiveDef.inputs : directiveDef.outputs;
      for (let publicName in propertyAliasMap) {
        if (propertyAliasMap.hasOwnProperty(publicName)) {
          propStore = propStore || {};
          const internalName = propertyAliasMap[publicName];
          const hasProperty = propStore.hasOwnProperty(publicName);
          hasProperty ? propStore[publicName].push(i, publicName, internalName) :
                        (propStore[publicName] = [i, publicName, internalName]);
        }
      }
    }
  }
  return propStore;
}

/**
* Mapping between attributes names that don't correspond to their element property names.
*/
const ATTR_TO_PROP: {[name: string]: string} = {
  'class': 'className',
  'for': 'htmlFor',
  'formaction': 'formAction',
  'innerHtml': 'innerHTML',
  'readonly': 'readOnly',
  'tabindex': 'tabIndex',
};

export function elementPropertyInternal<T>(
    index: number, propName: string, value: T | NO_CHANGE, sanitizer?: SanitizerFn | null,
    nativeOnly?: boolean,
    loadRendererFn?: ((tNode: TNode, lView: LView) => Renderer3) | null): void {
  if (value === NO_CHANGE) return;
  const lView = getLView();
  const element = getNativeByIndex(index, lView) as RElement | RComment;
  const tNode = getTNode(index, lView);
  let inputData: PropertyAliases|null|undefined;
  let dataValue: PropertyAliasValue|undefined;
  if (!nativeOnly && (inputData = initializeTNodeInputs(tNode)) &&
      (dataValue = inputData[propName])) {
    setInputsForProperty(lView, dataValue, value);
    if (isComponent(tNode)) markDirtyIfOnPush(lView, index + HEADER_OFFSET);
    if (ngDevMode) {
      if (tNode.type === TNodeType.Element || tNode.type === TNodeType.Container) {
        /**
         * dataValue is an array containing runtime input or output names for the directives:
         * i+0: directive instance index
         * i+1: publicName
         * i+2: privateName
         *
         * e.g. [0, 'change', 'change-minified']
         * we want to set the reflected property with the privateName: dataValue[i+2]
         */
        for (let i = 0; i < dataValue.length; i += 3) {
          setNgReflectProperty(lView, element, tNode.type, dataValue[i + 2] as string, value);
        }
      }
    }
  } else if (tNode.type === TNodeType.Element) {
    propName = ATTR_TO_PROP[propName] || propName;

    if (ngDevMode) {
      validateAgainstEventProperties(propName);
      validateAgainstUnknownProperties(lView, element, propName, tNode);
      ngDevMode.rendererSetProperty++;
    }

    savePropertyDebugData(tNode, lView, propName, lView[TVIEW].data, nativeOnly);

    const renderer = loadRendererFn ? loadRendererFn(tNode, lView) : lView[RENDERER];
    // It is assumed that the sanitizer is only added when the compiler determines that the property
    // is risky, so sanitization can be done without further checks.
    value = sanitizer != null ? (sanitizer(value, tNode.tagName || '', propName) as any) : value;
    if (isProceduralRenderer(renderer)) {
      renderer.setProperty(element as RElement, propName, value);
    } else if (!isAnimationProp(propName)) {
      (element as RElement).setProperty ? (element as any).setProperty(propName, value) :
                                          (element as any)[propName] = value;
    }
  } else if (tNode.type === TNodeType.Container) {
    // If the node is a container and the property didn't
    // match any of the inputs or schemas we should throw.
    if (ngDevMode && !matchingSchemas(lView, tNode.tagName)) {
      throw createUnknownPropertyError(propName, tNode);
    }
  }
}

/** If node is an OnPush component, marks its LView dirty. */
function markDirtyIfOnPush(lView: LView, viewIndex: number): void {
  ngDevMode && assertLView(lView);
  const childComponentLView = getComponentViewByIndex(viewIndex, lView);
  if (!(childComponentLView[FLAGS] & LViewFlags.CheckAlways)) {
    childComponentLView[FLAGS] |= LViewFlags.Dirty;
  }
}

export function setNgReflectProperty(
    lView: LView, element: RElement | RComment, type: TNodeType, attrName: string, value: any) {
  const renderer = lView[RENDERER];
  attrName = normalizeDebugBindingName(attrName);
  const debugValue = normalizeDebugBindingValue(value);
  if (type === TNodeType.Element) {
    isProceduralRenderer(renderer) ?
        renderer.setAttribute((element as RElement), attrName, debugValue) :
        (element as RElement).setAttribute(attrName, debugValue);
  } else if (value !== undefined) {
    const value = `bindings=${JSON.stringify({[attrName]: debugValue}, null, 2)}`;
    if (isProceduralRenderer(renderer)) {
      renderer.setValue((element as RComment), value);
    } else {
      (element as RComment).textContent = value;
    }
  }
}

function validateAgainstUnknownProperties(
    hostView: LView, element: RElement | RComment, propName: string, tNode: TNode) {
  // If the tag matches any of the schemas we shouldn't throw.
  if (matchingSchemas(hostView, tNode.tagName)) {
    return;
  }

  // If prop is not a known property of the HTML element...
  if (!(propName in element) &&
      // and we are in a browser context... (web worker nodes should be skipped)
      typeof Node === 'function' && element instanceof Node &&
      // and isn't a synthetic animation property...
      propName[0] !== ANIMATION_PROP_PREFIX) {
    // ... it is probably a user error and we should throw.
    throw createUnknownPropertyError(propName, tNode);
  }
}

function matchingSchemas(hostView: LView, tagName: string | null): boolean {
  const schemas = hostView[TVIEW].schemas;

  if (schemas !== null) {
    for (let i = 0; i < schemas.length; i++) {
      const schema = schemas[i];
      if (schema === NO_ERRORS_SCHEMA ||
          schema === CUSTOM_ELEMENTS_SCHEMA && tagName && tagName.indexOf('-') > -1) {
        return true;
      }
    }
  }

  return false;
}

/**
* Stores debugging data for this property binding on first template pass.
* This enables features like DebugElement.properties.
*/
function savePropertyDebugData(
    tNode: TNode, lView: LView, propName: string, tData: TData,
    nativeOnly: boolean | undefined): void {
  const lastBindingIndex = lView[BINDING_INDEX] - 1;

  // Bind/interpolation functions save binding metadata in the last binding index,
  // but leave the property name blank. If the interpolation delimiter is at the 0
  // index, we know that this is our first pass and the property name still needs to
  // be set.
  const bindingMetadata = tData[lastBindingIndex] as string;
  if (bindingMetadata[0] == INTERPOLATION_DELIMITER) {
    tData[lastBindingIndex] = propName + bindingMetadata;

    // We don't want to store indices for host bindings because they are stored in a
    // different part of LView (the expando section).
    if (!nativeOnly) {
      if (tNode.propertyMetadataStartIndex == -1) {
        tNode.propertyMetadataStartIndex = lastBindingIndex;
      }
      tNode.propertyMetadataEndIndex = lastBindingIndex + 1;
    }
  }
}

/**
* Creates an error that should be thrown when encountering an unknown property on an element.
* @param propName Name of the invalid property.
* @param tNode Node on which we encountered the error.
*/
function createUnknownPropertyError(propName: string, tNode: TNode): Error {
  return new Error(
      `Template error: Can't bind to '${propName}' since it isn't a known property of '${tNode.tagName}'.`);
}

/**
 * Instantiate a root component.
 */
export function instantiateRootComponent<T>(
    tView: TView, viewData: LView, def: ComponentDef<T>): T {
  const rootTNode = getPreviousOrParentTNode();
  if (tView.firstTemplatePass) {
    if (def.providersResolver) def.providersResolver(def);
    generateExpandoInstructionBlock(tView, rootTNode, 1);
    baseResolveDirective(tView, viewData, def, def.factory);
  }
  const directive =
      getNodeInjectable(tView.data, viewData, viewData.length - 1, rootTNode as TElementNode);
  postProcessBaseDirective(viewData, rootTNode, directive);
  return directive;
}

/**
 * Resolve the matched directives on a node.
 */
function resolveDirectives(
    tView: TView, viewData: LView, directives: DirectiveDef<any>[] | null, tNode: TNode,
    localRefs: string[] | null): void {
  // Please make sure to have explicit type for `exportsMap`. Inferred type triggers bug in tsickle.
  ngDevMode && assertEqual(tView.firstTemplatePass, true, 'should run on first template pass only');
  const exportsMap: ({[key: string]: number} | null) = localRefs ? {'': -1} : null;
  if (directives) {
    initNodeFlags(tNode, tView.data.length, directives.length);
    // When the same token is provided by several directives on the same node, some rules apply in
    // the viewEngine:
    // - viewProviders have priority over providers
    // - the last directive in NgModule.declarations has priority over the previous one
    // So to match these rules, the order in which providers are added in the arrays is very
    // important.
    for (let i = 0; i < directives.length; i++) {
      const def = directives[i] as DirectiveDef<any>;
      if (def.providersResolver) def.providersResolver(def);
    }
    generateExpandoInstructionBlock(tView, tNode, directives.length);
    const initialPreOrderHooksLength = (tView.preOrderHooks && tView.preOrderHooks.length) || 0;
    const initialPreOrderCheckHooksLength =
        (tView.preOrderCheckHooks && tView.preOrderCheckHooks.length) || 0;
    const nodeIndex = tNode.index - HEADER_OFFSET;
    for (let i = 0; i < directives.length; i++) {
      const def = directives[i] as DirectiveDef<any>;

      const directiveDefIdx = tView.data.length;
      baseResolveDirective(tView, viewData, def, def.factory);

      saveNameToExportMap(tView.data !.length - 1, def, exportsMap);

      // Init hooks are queued now so ngOnInit is called in host components before
      // any projected components.
      registerPreOrderHooks(
          directiveDefIdx, def, tView, nodeIndex, initialPreOrderHooksLength,
          initialPreOrderCheckHooksLength);
    }
  }
  if (exportsMap) cacheMatchingLocalNames(tNode, localRefs, exportsMap);
}

/**
 * Instantiate all the directives that were previously resolved on the current node.
 */
function instantiateAllDirectives(tView: TView, lView: LView, tNode: TNode) {
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;
  if (!tView.firstTemplatePass && start < end) {
    getOrCreateNodeInjectorForNode(
        tNode as TElementNode | TContainerNode | TElementContainerNode, lView);
  }
  for (let i = start; i < end; i++) {
    const def = tView.data[i] as DirectiveDef<any>;
    if (isComponentDef(def)) {
      addComponentLogic(lView, tNode, def as ComponentDef<any>);
    }
    const directive = getNodeInjectable(tView.data, lView !, i, tNode as TElementNode);
    postProcessDirective(lView, directive, def, i);
  }
}

function invokeDirectivesHostBindings(tView: TView, viewData: LView, tNode: TNode) {
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;
  const expando = tView.expandoInstructions !;
  const firstTemplatePass = tView.firstTemplatePass;
  const elementIndex = tNode.index - HEADER_OFFSET;
  const selectedIndex = getSelectedIndex();
  try {
    setActiveHostElement(elementIndex);

    for (let i = start; i < end; i++) {
      const def = tView.data[i] as DirectiveDef<any>;
      const directive = viewData[i];
      if (def.hostBindings) {
        invokeHostBindingsInCreationMode(def, expando, directive, tNode, firstTemplatePass);

        // Each directive gets a uniqueId value that is the same for both
        // create and update calls when the hostBindings function is called. The
        // directive uniqueId is not set anywhere--it is just incremented between
        // each hostBindings call and is useful for helping instruction code
        // uniquely determine which directive is currently active when executed.
        incrementActiveDirectiveId();
      } else if (firstTemplatePass) {
        expando.push(null);
      }
    }
  } finally {
    setActiveHostElement(selectedIndex);
  }
}

export function invokeHostBindingsInCreationMode(
    def: DirectiveDef<any>, expando: ExpandoInstructions, directive: any, tNode: TNode,
    firstTemplatePass: boolean) {
  const previousExpandoLength = expando.length;
  setCurrentDirectiveDef(def);
  const elementIndex = tNode.index - HEADER_OFFSET;
  def.hostBindings !(RenderFlags.Create, directive, elementIndex);
  setCurrentDirectiveDef(null);
  // `hostBindings` function may or may not contain `allocHostVars` call
  // (e.g. it may not if it only contains host listeners), so we need to check whether
  // `expandoInstructions` has changed and if not - we still push `hostBindings` to
  // expando block, to make sure we execute it for DI cycle
  if (previousExpandoLength === expando.length && firstTemplatePass) {
    expando.push(def.hostBindings);
  }
}

/**
* Generates a new block in TView.expandoInstructions for this node.
*
* Each expando block starts with the element index (turned negative so we can distinguish
* it from the hostVar count) and the directive count. See more in VIEW_DATA.md.
*/
export function generateExpandoInstructionBlock(
    tView: TView, tNode: TNode, directiveCount: number): void {
  ngDevMode && assertEqual(
                   tView.firstTemplatePass, true,
                   'Expando block should only be generated on first template pass.');

  const elementIndex = -(tNode.index - HEADER_OFFSET);
  const providerStartIndex = tNode.providerIndexes & TNodeProviderIndexes.ProvidersStartIndexMask;
  const providerCount = tView.data.length - providerStartIndex;
  (tView.expandoInstructions || (tView.expandoInstructions = [
   ])).push(elementIndex, providerCount, directiveCount);
}

/**
 * Process a directive on the current node after its creation.
 */
function postProcessDirective<T>(
    viewData: LView, directive: T, def: DirectiveDef<T>, directiveDefIdx: number): void {
  const previousOrParentTNode = getPreviousOrParentTNode();
  postProcessBaseDirective(viewData, previousOrParentTNode, directive);
  ngDevMode && assertDefined(previousOrParentTNode, 'previousOrParentTNode');
  if (previousOrParentTNode && previousOrParentTNode.attrs) {
    setInputsFromAttrs(directiveDefIdx, directive, def, previousOrParentTNode);
  }

  if (viewData[TVIEW].firstTemplatePass && def.contentQueries) {
    previousOrParentTNode.flags |= TNodeFlags.hasContentQuery;
  }

  if (isComponentDef(def)) {
    const componentView = getComponentViewByIndex(previousOrParentTNode.index, viewData);
    componentView[CONTEXT] = directive;
  }
}

/**
 * A lighter version of postProcessDirective() that is used for the root component.
 */
function postProcessBaseDirective<T>(
    lView: LView, previousOrParentTNode: TNode, directive: T): void {
  const native = getNativeByTNode(previousOrParentTNode, lView);

  ngDevMode && assertEqual(
                   lView[BINDING_INDEX], lView[TVIEW].bindingStartIndex,
                   'directives should be created before any bindings');
  ngDevMode && assertPreviousIsParent(getIsParent());

  attachPatchData(directive, lView);
  if (native) {
    attachPatchData(native, lView);
  }
}



/**
* Matches the current node against all available selectors.
* If a component is matched (at most one), it is returned in first position in the array.
*/
function findDirectiveMatches(tView: TView, viewData: LView, tNode: TNode): DirectiveDef<any>[]|
    null {
  ngDevMode && assertEqual(tView.firstTemplatePass, true, 'should run on first template pass only');
  const registry = tView.directiveRegistry;
  let matches: any[]|null = null;
  if (registry) {
    for (let i = 0; i < registry.length; i++) {
      const def = registry[i] as ComponentDef<any>| DirectiveDef<any>;
      if (isNodeMatchingSelectorList(tNode, def.selectors !, /* isProjectionMode */ false)) {
        matches || (matches = []);
        diPublicInInjector(
            getOrCreateNodeInjectorForNode(
                getPreviousOrParentTNode() as TElementNode | TContainerNode | TElementContainerNode,
                viewData),
            viewData, def.type);

        if (isComponentDef(def)) {
          if (tNode.flags & TNodeFlags.isComponent) throwMultipleComponentError(tNode);
          tNode.flags = TNodeFlags.isComponent;

          // The component is always stored first with directives after.
          matches.unshift(def);
        } else {
          matches.push(def);
        }
      }
    }
  }
  return matches;
}

/** Stores index of component's host element so it will be queued for view refresh during CD. */
export function queueComponentIndexForCheck(previousOrParentTNode: TNode): void {
  const tView = getLView()[TVIEW];
  ngDevMode &&
      assertEqual(tView.firstTemplatePass, true, 'Should only be called in first template pass.');
  (tView.components || (tView.components = [])).push(previousOrParentTNode.index);
}


/** Caches local names and their matching directive indices for query and template lookups. */
function cacheMatchingLocalNames(
    tNode: TNode, localRefs: string[] | null, exportsMap: {[key: string]: number}): void {
  if (localRefs) {
    const localNames: (string | number)[] = tNode.localNames = [];

    // Local names must be stored in tNode in the same order that localRefs are defined
    // in the template to ensure the data is loaded in the same slots as their refs
    // in the template (for template queries).
    for (let i = 0; i < localRefs.length; i += 2) {
      const index = exportsMap[localRefs[i + 1]];
      if (index == null) throw new Error(`Export of name '${localRefs[i + 1]}' not found!`);
      localNames.push(localRefs[i], index);
    }
  }
}

/**
* Builds up an export map as directives are created, so local refs can be quickly mapped
* to their directive instances.
*/
function saveNameToExportMap(
    index: number, def: DirectiveDef<any>| ComponentDef<any>,
    exportsMap: {[key: string]: number} | null) {
  if (exportsMap) {
    if (def.exportAs) {
      for (let i = 0; i < def.exportAs.length; i++) {
        exportsMap[def.exportAs[i]] = index;
      }
    }
    if ((def as ComponentDef<any>).template) exportsMap[''] = index;
  }
}

/**
 * Initializes the flags on the current node, setting all indices to the initial index,
 * the directive count to 0, and adding the isComponent flag.
 * @param index the initial index
 */
export function initNodeFlags(tNode: TNode, index: number, numberOfDirectives: number) {
  const flags = tNode.flags;
  ngDevMode && assertEqual(
                   flags === 0 || flags === TNodeFlags.isComponent, true,
                   'expected node flags to not be initialized');

  ngDevMode && assertNotEqual(
                   numberOfDirectives, tNode.directiveEnd - tNode.directiveStart,
                   'Reached the max number of directives');
  // When the first directive is created on a node, save the index
  tNode.flags = flags & TNodeFlags.isComponent;
  tNode.directiveStart = index;
  tNode.directiveEnd = index + numberOfDirectives;
  tNode.providerIndexes = index;
}

function baseResolveDirective<T>(
    tView: TView, viewData: LView, def: DirectiveDef<T>,
    directiveFactory: (t: Type<T>| null) => any) {
  tView.data.push(def);
  const nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
  tView.blueprint.push(nodeInjectorFactory);
  viewData.push(nodeInjectorFactory);
}

function addComponentLogic<T>(
    lView: LView, previousOrParentTNode: TNode, def: ComponentDef<T>): void {
  const native = getNativeByTNode(previousOrParentTNode, lView);

  const tView = getOrCreateTView(
      def.template, def.consts, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery,
      def.schemas);

  // Only component views should be added to the view tree directly. Embedded views are
  // accessed through their containers because they may be removed / re-added later.
  const rendererFactory = lView[RENDERER_FACTORY];
  const componentView = addToViewTree(
      lView, createLView(
                 lView, tView, null, def.onPush ? LViewFlags.Dirty : LViewFlags.CheckAlways,
                 lView[previousOrParentTNode.index], previousOrParentTNode as TElementNode,
                 rendererFactory, lView[RENDERER_FACTORY].createRenderer(native as RElement, def)));

  componentView[T_HOST] = previousOrParentTNode as TElementNode;

  // Component view will always be created before any injected LContainers,
  // so this is a regular element, wrap it with the component view
  lView[previousOrParentTNode.index] = componentView;

  if (lView[TVIEW].firstTemplatePass) {
    queueComponentIndexForCheck(previousOrParentTNode);
  }
}

/**
 * Sets initial input properties on directive instances from attribute data
 *
 * @param directiveIndex Index of the directive in directives array
 * @param instance Instance of the directive on which to set the initial inputs
 * @param def The directive def that contains the list of inputs
 * @param tNode The static data for this node
 */
function setInputsFromAttrs<T>(
    directiveIndex: number, instance: T, def: DirectiveDef<T>, tNode: TNode): void {
  let initialInputData = tNode.initialInputs as InitialInputData | undefined;
  if (initialInputData === undefined || directiveIndex >= initialInputData.length) {
    initialInputData = generateInitialInputs(directiveIndex, def.inputs, tNode);
  }

  const initialInputs: InitialInputs|null = initialInputData[directiveIndex];
  if (initialInputs) {
    const setInput = def.setInput;
    for (let i = 0; i < initialInputs.length;) {
      const publicName = initialInputs[i++];
      const privateName = initialInputs[i++];
      const value = initialInputs[i++];
      if (setInput) {
        def.setInput !(instance, value, publicName, privateName);
      } else {
        (instance as any)[privateName] = value;
      }
      if (ngDevMode) {
        const lView = getLView();
        const nativeElement = getNativeByTNode(tNode, lView) as RElement;
        setNgReflectProperty(lView, nativeElement, tNode.type, privateName, value);
      }
    }
  }
}

/**
 * Generates initialInputData for a node and stores it in the template's static storage
 * so subsequent template invocations don't have to recalculate it.
 *
 * initialInputData is an array containing values that need to be set as input properties
 * for directives on this node, but only once on creation. We need this array to support
 * the case where you set an @Input property of a directive using attribute-like syntax.
 * e.g. if you have a `name` @Input, you can set it once like this:
 *
 * <my-component name="Bess"></my-component>
 *
 * @param directiveIndex Index to store the initial input data
 * @param inputs The list of inputs from the directive def
 * @param tNode The static data on this node
 */
function generateInitialInputs(
    directiveIndex: number, inputs: {[key: string]: string}, tNode: TNode): InitialInputData {
  const initialInputData: InitialInputData = tNode.initialInputs || (tNode.initialInputs = []);
  initialInputData[directiveIndex] = null;

  const attrs = tNode.attrs !;
  let i = 0;
  while (i < attrs.length) {
    const attrName = attrs[i];
    if (attrName === AttributeMarker.NamespaceURI) {
      // We do not allow inputs on namespaced attributes.
      i += 4;
      continue;
    } else if (attrName === AttributeMarker.ProjectAs) {
      // Skip over the `ngProjectAs` value.
      i += 2;
      continue;
    }

    // If we hit any other attribute markers, we're done anyway. None of those are valid inputs.
    if (typeof attrName === 'number') break;

    const minifiedInputName = inputs[attrName as string];
    const attrValue = attrs[i + 1];

    if (minifiedInputName !== undefined) {
      const inputsToStore: InitialInputs =
          initialInputData[directiveIndex] || (initialInputData[directiveIndex] = []);
      inputsToStore.push(attrName as string, minifiedInputName, attrValue as string);
    }

    i += 2;
  }
  return initialInputData;
}

//////////////////////////
//// ViewContainer & View
//////////////////////////

/**
 * Creates a LContainer, either from a container instruction, or for a ViewContainerRef.
 *
 * @param hostNative The host element for the LContainer
 * @param hostTNode The host TNode for the LContainer
 * @param currentView The parent view of the LContainer
 * @param native The native comment element
 * @param isForViewContainerRef Optional a flag indicating the ViewContainerRef case
 * @returns LContainer
 */
export function createLContainer(
    hostNative: RElement | RComment | StylingContext | LView, currentView: LView, native: RComment,
    tNode: TNode, isForViewContainerRef?: boolean): LContainer {
  ngDevMode && assertDomNode(native);
  ngDevMode && assertLView(currentView);
  const lContainer: LContainer = [
    hostNative,  // host native
    true,        // Boolean `true` in this position signifies that this is an `LContainer`
    isForViewContainerRef ? -1 : 0,  // active index
    currentView,                     // parent
    null,                            // next
    null,                            // queries
    tNode,                           // t_host
    native,                          // native
    [],                              // views
  ];
  ngDevMode && attachLContainerDebug(lContainer);
  return lContainer;
}


/**
 * Goes over dynamic embedded views (ones created through ViewContainerRef APIs) and refreshes them
 * by executing an associated template function.
 */
function refreshDynamicEmbeddedViews(lView: LView) {
  for (let current = lView[CHILD_HEAD]; current !== null; current = current[NEXT]) {
    // Note: current can be an LView or an LContainer instance, but here we are only interested
    // in LContainer. We can tell it's an LContainer because its length is less than the LView
    // header.
    if (current.length < HEADER_OFFSET && current[ACTIVE_INDEX] === -1) {
      const container = current as LContainer;
      for (let i = 0; i < container[VIEWS].length; i++) {
        const dynamicViewData = container[VIEWS][i];
        // The directives and pipes are not needed here as an existing view is only being refreshed.
        ngDevMode && assertDefined(dynamicViewData[TVIEW], 'TView must be allocated');
        renderEmbeddedTemplate(dynamicViewData, dynamicViewData[TVIEW], dynamicViewData[CONTEXT] !);
      }
    }
  }
}



/////////////

/**
 * Refreshes components by entering the component view and processing its bindings, queries, etc.
 *
 * @param adjustedElementIndex  Element index in LView[] (adjusted for HEADER_OFFSET)
 */
export function componentRefresh(adjustedElementIndex: number): void {
  const lView = getLView();
  ngDevMode && assertDataInRange(lView, adjustedElementIndex);
  const hostView = getComponentViewByIndex(adjustedElementIndex, lView);
  ngDevMode && assertNodeType(lView[TVIEW].data[adjustedElementIndex] as TNode, TNodeType.Element);

  // Only components in creation mode, attached CheckAlways
  // components or attached, dirty OnPush components should be checked
  if ((viewAttachedToChangeDetector(hostView) || isCreationMode(lView)) &&
      hostView[FLAGS] & (LViewFlags.CheckAlways | LViewFlags.Dirty)) {
    syncViewWithBlueprint(hostView);
    checkView(hostView, hostView[CONTEXT]);
  }
}

/**
 * Syncs an LView instance with its blueprint if they have gotten out of sync.
 *
 * Typically, blueprints and their view instances should always be in sync, so the loop here
 * will be skipped. However, consider this case of two components side-by-side:
 *
 * App template:
 * ```
 * <comp></comp>
 * <comp></comp>
 * ```
 *
 * The following will happen:
 * 1. App template begins processing.
 * 2. First <comp> is matched as a component and its LView is created.
 * 3. Second <comp> is matched as a component and its LView is created.
 * 4. App template completes processing, so it's time to check child templates.
 * 5. First <comp> template is checked. It has a directive, so its def is pushed to blueprint.
 * 6. Second <comp> template is checked. Its blueprint has been updated by the first
 * <comp> template, but its LView was created before this update, so it is out of sync.
 *
 * Note that embedded views inside ngFor loops will never be out of sync because these views
 * are processed as soon as they are created.
 *
 * @param componentView The view to sync
 */
function syncViewWithBlueprint(componentView: LView) {
  const componentTView = componentView[TVIEW];
  for (let i = componentView.length; i < componentTView.blueprint.length; i++) {
    componentView[i] = componentTView.blueprint[i];
  }
}

/**
 * Adds LView or LContainer to the end of the current view tree.
 *
 * This structure will be used to traverse through nested views to remove listeners
 * and call onDestroy callbacks.
 *
 * @param lView The view where LView or LContainer should be added
 * @param adjustedHostIndex Index of the view's host node in LView[], adjusted for header
 * @param lViewOrLContainer The LView or LContainer to add to the view tree
 * @returns The state passed in
 */
export function addToViewTree<T extends LView|LContainer>(lView: LView, lViewOrLContainer: T): T {
  // TODO(benlesh/misko): This implementation is incorrect, because it always adds the LContainer to
  // the end of the queue, which means if the developer retrieves the LContainers from RNodes out of
  // order, the change detection will run out of order, as the act of retrieving the the LContainer
  // from the RNode is what adds it to the queue.
  if (lView[CHILD_HEAD]) {
    lView[CHILD_TAIL] ![NEXT] = lViewOrLContainer;
  } else {
    lView[CHILD_HEAD] = lViewOrLContainer;
  }
  lView[CHILD_TAIL] = lViewOrLContainer;
  return lViewOrLContainer;
}

///////////////////////////////
//// Change detection
///////////////////////////////


/**
 * Marks current view and all ancestors dirty.
 *
 * Returns the root view because it is found as a byproduct of marking the view tree
 * dirty, and can be used by methods that consume markViewDirty() to easily schedule
 * change detection. Otherwise, such methods would need to traverse up the view tree
 * an additional time to get the root view and schedule a tick on it.
 *
 * @param lView The starting LView to mark dirty
 * @returns the root LView
 */
export function markViewDirty(lView: LView): LView|null {
  while (lView) {
    lView[FLAGS] |= LViewFlags.Dirty;
    const parent = getLViewParent(lView);
    // Stop traversing up as soon as you find a root view that wasn't attached to any container
    if (isRootView(lView) && !parent) {
      return lView;
    }
    // continue otherwise
    lView = parent !;
  }
  return null;
}


/**
 * Used to schedule change detection on the whole application.
 *
 * Unlike `tick`, `scheduleTick` coalesces multiple calls into one change detection run.
 * It is usually called indirectly by calling `markDirty` when the view needs to be
 * re-rendered.
 *
 * Typically `scheduleTick` uses `requestAnimationFrame` to coalesce multiple
 * `scheduleTick` requests. The scheduling function can be overridden in
 * `renderComponent`'s `scheduler` option.
 */
export function scheduleTick(rootContext: RootContext, flags: RootContextFlags) {
  const nothingScheduled = rootContext.flags === RootContextFlags.Empty;
  rootContext.flags |= flags;

  if (nothingScheduled && rootContext.clean == _CLEAN_PROMISE) {
    let res: null|((val: null) => void);
    rootContext.clean = new Promise<null>((r) => res = r);
    rootContext.scheduler(() => {
      if (rootContext.flags & RootContextFlags.DetectChanges) {
        rootContext.flags &= ~RootContextFlags.DetectChanges;
        tickRootContext(rootContext);
      }

      if (rootContext.flags & RootContextFlags.FlushPlayers) {
        rootContext.flags &= ~RootContextFlags.FlushPlayers;
        const playerHandler = rootContext.playerHandler;
        if (playerHandler) {
          playerHandler.flushPlayers();
        }
      }

      rootContext.clean = _CLEAN_PROMISE;
      res !(null);
    });
  }
}

export function tickRootContext(rootContext: RootContext) {
  for (let i = 0; i < rootContext.components.length; i++) {
    const rootComponent = rootContext.components[i];
    renderComponentOrTemplate(readPatchedLView(rootComponent) !, rootComponent);
  }
}

export function detectChangesInternal<T>(view: LView, context: T) {
  const rendererFactory = view[RENDERER_FACTORY];

  if (rendererFactory.begin) rendererFactory.begin();

  try {
    if (isCreationMode(view)) {
      checkView(view, context);  // creation mode pass
    }
    checkView(view, context);  // update mode pass
  } catch (error) {
    handleError(view, error);
    throw error;
  } finally {
    if (rendererFactory.end) rendererFactory.end();
  }
}

/**
 * Synchronously perform change detection on a root view and its components.
 *
 * @param lView The view which the change detection should be performed on.
 */
export function detectChangesInRootView(lView: LView): void {
  tickRootContext(lView[CONTEXT] as RootContext);
}


/**
 * Checks the change detector and its children, and throws if any changes are detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 */
export function checkNoChanges<T>(component: T): void {
  const view = getComponentViewByInstance(component);
  checkNoChangesInternal<T>(view, component);
}

export function checkNoChangesInternal<T>(view: LView, context: T) {
  setCheckNoChangesMode(true);
  try {
    detectChangesInternal(view, context);
  } finally {
    setCheckNoChangesMode(false);
  }
}

/**
 * Checks the change detector on a root view and its components, and throws if any changes are
 * detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 *
 * @param lView The view which the change detection should be checked on.
 */
export function checkNoChangesInRootView(lView: LView): void {
  setCheckNoChangesMode(true);
  try {
    detectChangesInRootView(lView);
  } finally {
    setCheckNoChangesMode(false);
  }
}

/** Checks the view of the component provided. Does not gate on dirty checks or execute doCheck. */
export function checkView<T>(hostView: LView, component: T) {
  const hostTView = hostView[TVIEW];
  const oldView = enterView(hostView, hostView[T_HOST]);
  const templateFn = hostTView.template !;
  const creationMode = isCreationMode(hostView);

  try {
    resetPreOrderHookFlags(hostView);
    creationMode && executeViewQueryFn(RenderFlags.Create, hostTView, component);
    executeTemplate(templateFn, getRenderFlags(hostView), component);
    refreshDescendantViews(hostView);
    // Only check view queries again in creation mode if there are static view queries
    if (!creationMode || hostTView.staticViewQueries) {
      executeViewQueryFn(RenderFlags.Update, hostTView, component);
    }
  } finally {
    leaveView(oldView);
  }
}

function executeViewQueryFn<T>(flags: RenderFlags, tView: TView, component: T): void {
  const viewQuery = tView.viewQuery;
  if (viewQuery) {
    setCurrentQueryIndex(tView.viewQueryStartIndex);
    viewQuery(flags, component);
  }
}


///////////////////////////////
//// Bindings & interpolations
///////////////////////////////

/**
 * Creates binding metadata for a particular binding and stores it in
 * TView.data. These are generated in order to support DebugElement.properties.
 *
 * Each binding / interpolation will have one (including attribute bindings)
 * because at the time of binding, we don't know to which instruction the binding
 * belongs. It is always stored in TView.data at the index of the last binding
 * value in LView (e.g. for interpolation8, it would be stored at the index of
 * the 8th value).
 *
 * @param lView The LView that contains the current binding index.
 * @param prefix The static prefix string
 * @param suffix The static suffix string
 *
 * @returns Newly created binding metadata string for this binding or null
 */
export function storeBindingMetadata(lView: LView, prefix = '', suffix = ''): string|null {
  const tData = lView[TVIEW].data;
  const lastBindingIndex = lView[BINDING_INDEX] - 1;
  const value = INTERPOLATION_DELIMITER + prefix + INTERPOLATION_DELIMITER + suffix;

  return tData[lastBindingIndex] == null ? (tData[lastBindingIndex] = value) : null;
}

export const CLEAN_PROMISE = _CLEAN_PROMISE;

export function initializeTNodeInputs(tNode: TNode | null): PropertyAliases|null {
  // If tNode.inputs is undefined, a listener has created outputs, but inputs haven't
  // yet been checked.
  if (tNode) {
    if (tNode.inputs === undefined) {
      // mark inputs as checked
      tNode.inputs = generatePropertyAliases(tNode, BindingDirection.Input);
    }
    return tNode.inputs;
  }
  return null;
}


export function getCleanup(view: LView): any[] {
  // top level variables should not be exported for performance reasons (PERF_NOTES.md)
  return view[CLEANUP] || (view[CLEANUP] = []);
}

function getTViewCleanup(view: LView): any[] {
  return view[TVIEW].cleanup || (view[TVIEW].cleanup = []);
}

/**
 * There are cases where the sub component's renderer needs to be included
 * instead of the current renderer (see the componentSyntheticHost* instructions).
 */
export function loadComponentRenderer(tNode: TNode, lView: LView): Renderer3 {
  const componentLView = lView[tNode.index] as LView;
  return componentLView[RENDERER];
}

/** Handles an error thrown in an LView. */
export function handleError(lView: LView, error: any): void {
  const injector = lView[INJECTOR];
  const errorHandler = injector ? injector.get(ErrorHandler, null) : null;
  errorHandler && errorHandler.handleError(error);
}

/**
 * Set the inputs of directives at the current node to corresponding value.
 *
 * @param lView the `LView` which contains the directives.
 * @param inputs mapping between the public "input" name and privately-known,
 * possibly minified, property names to write to.
 * @param value Value to set.
 */
export function setInputsForProperty(lView: LView, inputs: PropertyAliasValue, value: any): void {
  const tView = lView[TVIEW];
  for (let i = 0; i < inputs.length;) {
    const index = inputs[i++] as number;
    const publicName = inputs[i++] as string;
    const privateName = inputs[i++] as string;
    const instance = lView[index];
    ngDevMode && assertDataInRange(lView, index);
    const def = tView.data[index] as DirectiveDef<any>;
    const setInput = def.setInput;
    if (setInput) {
      def.setInput !(instance, value, publicName, privateName);
    } else {
      instance[privateName] = value;
    }
  }
}
