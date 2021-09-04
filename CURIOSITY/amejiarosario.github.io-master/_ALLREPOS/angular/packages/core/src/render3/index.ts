/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {LifecycleHooksFeature, renderComponent, whenRendered} from './component';
import {ɵɵdefineBase, ɵɵdefineComponent, ɵɵdefineDirective, ɵɵdefineNgModule, ɵɵdefinePipe, ɵɵsetComponentScope, ɵɵsetNgModuleScope} from './definition';
import {ɵɵInheritDefinitionFeature} from './features/inherit_definition_feature';
import {ɵɵNgOnChangesFeature} from './features/ng_onchanges_feature';
import {ɵɵProvidersFeature} from './features/providers_feature';
import {ComponentDef, ComponentTemplate, ComponentType, DirectiveDef, DirectiveDefFlags, DirectiveType, PipeDef, ɵɵBaseDef, ɵɵComponentDefWithMeta, ɵɵDirectiveDefWithMeta, ɵɵPipeDefWithMeta} from './interfaces/definition';
import {getComponent, getDirectives, getHostElement, getRenderedText} from './util/discovery_utils';

export {ComponentFactory, ComponentFactoryResolver, ComponentRef, injectComponentFactoryResolver} from './component_ref';
export {ɵɵgetFactoryOf, ɵɵgetInheritedFactory} from './di';
// clang-format off
export {
  detectChanges,
  markDirty,
  store,
  tick,
  ɵɵallocHostVars,
  ɵɵbind,
  ɵɵcomponentHostSyntheticListener,
  ɵɵcomponentHostSyntheticProperty,

  ɵɵcontainer,
  ɵɵcontainerRefreshEnd,
  ɵɵcontainerRefreshStart,

  ɵɵdirectiveInject,

  ɵɵelement,
  ɵɵelementAttribute,
  ɵɵelementClassProp,
  ɵɵelementContainerEnd,

  ɵɵelementContainerStart,
  ɵɵelementEnd,

  ɵɵelementHostAttrs,
  ɵɵelementHostClassProp,
  ɵɵelementHostStyleProp,
  ɵɵelementHostStyling,
  ɵɵelementHostStylingApply,
  ɵɵelementHostStylingMap,
  ɵɵelementProperty,
  ɵɵelementStart,
  ɵɵelementStyleProp,
  ɵɵelementStyling,
  ɵɵelementStylingApply,
  ɵɵelementStylingMap,
  ɵɵembeddedViewEnd,

  ɵɵembeddedViewStart,

  ɵɵgetCurrentView,
  ɵɵinjectAttribute,

  ɵɵinterpolation1,
  ɵɵinterpolation2,
  ɵɵinterpolation3,
  ɵɵinterpolation4,
  ɵɵinterpolation5,
  ɵɵinterpolation6,
  ɵɵinterpolation7,
  ɵɵinterpolation8,
  ɵɵinterpolationV,

  ɵɵlistener,
  ɵɵload,

  ɵɵnamespaceHTML,
  ɵɵnamespaceMathML,
  ɵɵnamespaceSVG,

  ɵɵnextContext,

  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵpropertyInterpolate1,
  ɵɵpropertyInterpolate2,
  ɵɵpropertyInterpolate3,
  ɵɵpropertyInterpolate4,
  ɵɵpropertyInterpolate5,
  ɵɵpropertyInterpolate6,
  ɵɵpropertyInterpolate7,
  ɵɵpropertyInterpolate8,
  ɵɵpropertyInterpolateV,

  ɵɵreference,

  ɵɵselect,
  ɵɵtemplate,

  ɵɵtext,
  ɵɵtextBinding} from './instructions/all';
export {RenderFlags} from './interfaces/definition';
export {CssSelectorList} from './interfaces/projection';

export {
  ɵɵrestoreView,

  ɵɵenableBindings,
  ɵɵdisableBindings,
} from './state';

export {
  ɵɵi18n,
  ɵɵi18nAttributes,
  ɵɵi18nExp,
  ɵɵi18nStart,
  ɵɵi18nEnd,
  ɵɵi18nApply,
  ɵɵi18nPostprocess,
  i18nConfigureLocalize,
  ɵɵi18nLocalize,
} from './i18n';

export {NgModuleFactory, NgModuleRef, NgModuleType} from './ng_module_ref';

export {
  AttributeMarker
} from './interfaces/node';

export {
  setClassMetadata,
} from './metadata';

export {
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵpipeBindV,
} from './pipe';

export {
  ɵɵqueryRefresh,
  ɵɵviewQuery,
  ɵɵstaticViewQuery,
  ɵɵloadViewQuery,
  ɵɵcontentQuery,
  ɵɵloadContentQuery,
  ɵɵstaticContentQuery
} from './query';

export {
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵpureFunction4,
  ɵɵpureFunction5,
  ɵɵpureFunction6,
  ɵɵpureFunction7,
  ɵɵpureFunction8,
  ɵɵpureFunctionV,
} from './pure_function';

export {ɵɵtemplateRefExtractor} from './view_engine_compatibility_prebound';

export {ɵɵresolveWindow, ɵɵresolveDocument, ɵɵresolveBody} from './util/misc_utils';

// clang-format on

export {
  ɵɵBaseDef,
  ComponentDef,
  ɵɵComponentDefWithMeta,
  ComponentTemplate,
  ComponentType,
  DirectiveDef,
  DirectiveDefFlags,
  ɵɵDirectiveDefWithMeta,
  DirectiveType,
  ɵɵNgOnChangesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  PipeDef,
  ɵɵPipeDefWithMeta,
  LifecycleHooksFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineNgModule,
  ɵɵdefineBase,
  ɵɵdefinePipe,
  getHostElement,
  getComponent,
  getDirectives,
  getRenderedText,
  renderComponent,
  ɵɵsetComponentScope,
  ɵɵsetNgModuleScope,
  whenRendered,
};

export {NO_CHANGE} from './tokens';
