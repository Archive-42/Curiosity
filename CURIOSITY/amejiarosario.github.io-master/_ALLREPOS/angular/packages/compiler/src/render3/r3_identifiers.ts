/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as o from '../output/output_ast';

const CORE = '@angular/core';

export class Identifiers {
  /* Methods */
  static NEW_METHOD = 'factory';
  static TRANSFORM_METHOD = 'transform';
  static PATCH_DEPS = 'patchedDeps';

  /* Instructions */
  static namespaceHTML: o.ExternalReference = {name: 'ɵɵnamespaceHTML', moduleName: CORE};

  static namespaceMathML: o.ExternalReference = {name: 'ɵɵnamespaceMathML', moduleName: CORE};

  static namespaceSVG: o.ExternalReference = {name: 'ɵɵnamespaceSVG', moduleName: CORE};

  static element: o.ExternalReference = {name: 'ɵɵelement', moduleName: CORE};

  static elementStart: o.ExternalReference = {name: 'ɵɵelementStart', moduleName: CORE};

  static elementEnd: o.ExternalReference = {name: 'ɵɵelementEnd', moduleName: CORE};

  static elementProperty: o.ExternalReference = {name: 'ɵɵelementProperty', moduleName: CORE};

  static select: o.ExternalReference = {name: 'ɵɵselect', moduleName: CORE};

  static componentHostSyntheticProperty:
      o.ExternalReference = {name: 'ɵɵcomponentHostSyntheticProperty', moduleName: CORE};

  static componentHostSyntheticListener:
      o.ExternalReference = {name: 'ɵɵcomponentHostSyntheticListener', moduleName: CORE};

  static elementAttribute: o.ExternalReference = {name: 'ɵɵelementAttribute', moduleName: CORE};

  static elementClassProp: o.ExternalReference = {name: 'ɵɵelementClassProp', moduleName: CORE};

  static elementContainerStart:
      o.ExternalReference = {name: 'ɵɵelementContainerStart', moduleName: CORE};

  static elementContainerEnd:
      o.ExternalReference = {name: 'ɵɵelementContainerEnd', moduleName: CORE};

  static elementStyling: o.ExternalReference = {name: 'ɵɵelementStyling', moduleName: CORE};

  static elementStylingMap: o.ExternalReference = {name: 'ɵɵelementStylingMap', moduleName: CORE};

  static elementStyleProp: o.ExternalReference = {name: 'ɵɵelementStyleProp', moduleName: CORE};

  static elementStylingApply:
      o.ExternalReference = {name: 'ɵɵelementStylingApply', moduleName: CORE};

  static elementHostAttrs: o.ExternalReference = {name: 'ɵɵelementHostAttrs', moduleName: CORE};

  static elementHostStyling: o.ExternalReference = {name: 'ɵɵelementHostStyling', moduleName: CORE};

  static elementHostStylingMap:
      o.ExternalReference = {name: 'ɵɵelementHostStylingMap', moduleName: CORE};

  static elementHostStyleProp:
      o.ExternalReference = {name: 'ɵɵelementHostStyleProp', moduleName: CORE};

  static elementHostClassProp:
      o.ExternalReference = {name: 'ɵɵelementHostClassProp', moduleName: CORE};

  static elementHostStylingApply:
      o.ExternalReference = {name: 'ɵɵelementHostStylingApply', moduleName: CORE};

  static containerCreate: o.ExternalReference = {name: 'ɵɵcontainer', moduleName: CORE};

  static nextContext: o.ExternalReference = {name: 'ɵɵnextContext', moduleName: CORE};

  static templateCreate: o.ExternalReference = {name: 'ɵɵtemplate', moduleName: CORE};

  static text: o.ExternalReference = {name: 'ɵɵtext', moduleName: CORE};

  static textBinding: o.ExternalReference = {name: 'ɵɵtextBinding', moduleName: CORE};

  static bind: o.ExternalReference = {name: 'ɵɵbind', moduleName: CORE};

  static enableBindings: o.ExternalReference = {name: 'ɵɵenableBindings', moduleName: CORE};

  static disableBindings: o.ExternalReference = {name: 'ɵɵdisableBindings', moduleName: CORE};

  static allocHostVars: o.ExternalReference = {name: 'ɵɵallocHostVars', moduleName: CORE};

  static getCurrentView: o.ExternalReference = {name: 'ɵɵgetCurrentView', moduleName: CORE};

  static restoreView: o.ExternalReference = {name: 'ɵɵrestoreView', moduleName: CORE};

  static interpolation1: o.ExternalReference = {name: 'ɵɵinterpolation1', moduleName: CORE};
  static interpolation2: o.ExternalReference = {name: 'ɵɵinterpolation2', moduleName: CORE};
  static interpolation3: o.ExternalReference = {name: 'ɵɵinterpolation3', moduleName: CORE};
  static interpolation4: o.ExternalReference = {name: 'ɵɵinterpolation4', moduleName: CORE};
  static interpolation5: o.ExternalReference = {name: 'ɵɵinterpolation5', moduleName: CORE};
  static interpolation6: o.ExternalReference = {name: 'ɵɵinterpolation6', moduleName: CORE};
  static interpolation7: o.ExternalReference = {name: 'ɵɵinterpolation7', moduleName: CORE};
  static interpolation8: o.ExternalReference = {name: 'ɵɵinterpolation8', moduleName: CORE};
  static interpolationV: o.ExternalReference = {name: 'ɵɵinterpolationV', moduleName: CORE};

  static pureFunction0: o.ExternalReference = {name: 'ɵɵpureFunction0', moduleName: CORE};
  static pureFunction1: o.ExternalReference = {name: 'ɵɵpureFunction1', moduleName: CORE};
  static pureFunction2: o.ExternalReference = {name: 'ɵɵpureFunction2', moduleName: CORE};
  static pureFunction3: o.ExternalReference = {name: 'ɵɵpureFunction3', moduleName: CORE};
  static pureFunction4: o.ExternalReference = {name: 'ɵɵpureFunction4', moduleName: CORE};
  static pureFunction5: o.ExternalReference = {name: 'ɵɵpureFunction5', moduleName: CORE};
  static pureFunction6: o.ExternalReference = {name: 'ɵɵpureFunction6', moduleName: CORE};
  static pureFunction7: o.ExternalReference = {name: 'ɵɵpureFunction7', moduleName: CORE};
  static pureFunction8: o.ExternalReference = {name: 'ɵɵpureFunction8', moduleName: CORE};
  static pureFunctionV: o.ExternalReference = {name: 'ɵɵpureFunctionV', moduleName: CORE};

  static pipeBind1: o.ExternalReference = {name: 'ɵɵpipeBind1', moduleName: CORE};
  static pipeBind2: o.ExternalReference = {name: 'ɵɵpipeBind2', moduleName: CORE};
  static pipeBind3: o.ExternalReference = {name: 'ɵɵpipeBind3', moduleName: CORE};
  static pipeBind4: o.ExternalReference = {name: 'ɵɵpipeBind4', moduleName: CORE};
  static pipeBindV: o.ExternalReference = {name: 'ɵɵpipeBindV', moduleName: CORE};

  static property: o.ExternalReference = {name: 'ɵɵproperty', moduleName: CORE};

  static propertyInterpolate:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate', moduleName: CORE};
  static propertyInterpolate1:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate1', moduleName: CORE};
  static propertyInterpolate2:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate2', moduleName: CORE};
  static propertyInterpolate3:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate3', moduleName: CORE};
  static propertyInterpolate4:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate4', moduleName: CORE};
  static propertyInterpolate5:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate5', moduleName: CORE};
  static propertyInterpolate6:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate6', moduleName: CORE};
  static propertyInterpolate7:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate7', moduleName: CORE};
  static propertyInterpolate8:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolate8', moduleName: CORE};
  static propertyInterpolateV:
      o.ExternalReference = {name: 'ɵɵpropertyInterpolateV', moduleName: CORE};

  static i18n: o.ExternalReference = {name: 'ɵɵi18n', moduleName: CORE};
  static i18nAttributes: o.ExternalReference = {name: 'ɵɵi18nAttributes', moduleName: CORE};
  static i18nExp: o.ExternalReference = {name: 'ɵɵi18nExp', moduleName: CORE};
  static i18nStart: o.ExternalReference = {name: 'ɵɵi18nStart', moduleName: CORE};
  static i18nEnd: o.ExternalReference = {name: 'ɵɵi18nEnd', moduleName: CORE};
  static i18nApply: o.ExternalReference = {name: 'ɵɵi18nApply', moduleName: CORE};
  static i18nPostprocess: o.ExternalReference = {name: 'ɵɵi18nPostprocess', moduleName: CORE};
  static i18nLocalize: o.ExternalReference = {name: 'ɵɵi18nLocalize', moduleName: CORE};

  static load: o.ExternalReference = {name: 'ɵɵload', moduleName: CORE};

  static pipe: o.ExternalReference = {name: 'ɵɵpipe', moduleName: CORE};

  static projection: o.ExternalReference = {name: 'ɵɵprojection', moduleName: CORE};
  static projectionDef: o.ExternalReference = {name: 'ɵɵprojectionDef', moduleName: CORE};

  static reference: o.ExternalReference = {name: 'ɵɵreference', moduleName: CORE};

  static inject: o.ExternalReference = {name: 'ɵɵinject', moduleName: CORE};

  static injectAttribute: o.ExternalReference = {name: 'ɵɵinjectAttribute', moduleName: CORE};

  static directiveInject: o.ExternalReference = {name: 'ɵɵdirectiveInject', moduleName: CORE};

  static templateRefExtractor:
      o.ExternalReference = {name: 'ɵɵtemplateRefExtractor', moduleName: CORE};

  static resolveWindow: o.ExternalReference = {name: 'ɵɵresolveWindow', moduleName: CORE};
  static resolveDocument: o.ExternalReference = {name: 'ɵɵresolveDocument', moduleName: CORE};
  static resolveBody: o.ExternalReference = {name: 'ɵɵresolveBody', moduleName: CORE};

  static defineBase: o.ExternalReference = {name: 'ɵɵdefineBase', moduleName: CORE};

  static BaseDef: o.ExternalReference = {
    name: 'ɵɵBaseDef',
    moduleName: CORE,
  };

  static defineComponent: o.ExternalReference = {name: 'ɵɵdefineComponent', moduleName: CORE};

  static setComponentScope: o.ExternalReference = {name: 'ɵɵsetComponentScope', moduleName: CORE};

  static ComponentDefWithMeta: o.ExternalReference = {
    name: 'ɵɵComponentDefWithMeta',
    moduleName: CORE,
  };

  static defineDirective: o.ExternalReference = {
    name: 'ɵɵdefineDirective',
    moduleName: CORE,
  };

  static DirectiveDefWithMeta: o.ExternalReference = {
    name: 'ɵɵDirectiveDefWithMeta',
    moduleName: CORE,
  };

  static InjectorDef: o.ExternalReference = {
    name: 'ɵɵInjectorDef',
    moduleName: CORE,
  };

  static defineInjector: o.ExternalReference = {
    name: 'ɵɵdefineInjector',
    moduleName: CORE,
  };

  static NgModuleDefWithMeta: o.ExternalReference = {
    name: 'ɵɵNgModuleDefWithMeta',
    moduleName: CORE,
  };

  static defineNgModule: o.ExternalReference = {name: 'ɵɵdefineNgModule', moduleName: CORE};
  static setNgModuleScope: o.ExternalReference = {name: 'ɵɵsetNgModuleScope', moduleName: CORE};

  static PipeDefWithMeta: o.ExternalReference = {name: 'ɵɵPipeDefWithMeta', moduleName: CORE};

  static definePipe: o.ExternalReference = {name: 'ɵɵdefinePipe', moduleName: CORE};

  static queryRefresh: o.ExternalReference = {name: 'ɵɵqueryRefresh', moduleName: CORE};
  static viewQuery: o.ExternalReference = {name: 'ɵɵviewQuery', moduleName: CORE};
  static staticViewQuery: o.ExternalReference = {name: 'ɵɵstaticViewQuery', moduleName: CORE};
  static staticContentQuery: o.ExternalReference = {name: 'ɵɵstaticContentQuery', moduleName: CORE};
  static loadViewQuery: o.ExternalReference = {name: 'ɵɵloadViewQuery', moduleName: CORE};
  static contentQuery: o.ExternalReference = {name: 'ɵɵcontentQuery', moduleName: CORE};
  static loadContentQuery: o.ExternalReference = {name: 'ɵɵloadContentQuery', moduleName: CORE};

  static NgOnChangesFeature: o.ExternalReference = {name: 'ɵɵNgOnChangesFeature', moduleName: CORE};

  static InheritDefinitionFeature:
      o.ExternalReference = {name: 'ɵɵInheritDefinitionFeature', moduleName: CORE};

  static ProvidersFeature: o.ExternalReference = {name: 'ɵɵProvidersFeature', moduleName: CORE};

  static listener: o.ExternalReference = {name: 'ɵɵlistener', moduleName: CORE};

  static getFactoryOf: o.ExternalReference = {
    name: 'ɵɵgetFactoryOf',
    moduleName: CORE,
  };

  static getInheritedFactory: o.ExternalReference = {
    name: 'ɵɵgetInheritedFactory',
    moduleName: CORE,
  };

  static registerNgModuleType:
      o.ExternalReference = {name: 'ɵregisterNgModuleType', moduleName: CORE};

  // sanitization-related functions
  static sanitizeHtml: o.ExternalReference = {name: 'ɵɵsanitizeHtml', moduleName: CORE};
  static sanitizeStyle: o.ExternalReference = {name: 'ɵɵsanitizeStyle', moduleName: CORE};
  static defaultStyleSanitizer:
      o.ExternalReference = {name: 'ɵɵdefaultStyleSanitizer', moduleName: CORE};
  static sanitizeResourceUrl:
      o.ExternalReference = {name: 'ɵɵsanitizeResourceUrl', moduleName: CORE};
  static sanitizeScript: o.ExternalReference = {name: 'ɵɵsanitizeScript', moduleName: CORE};
  static sanitizeUrl: o.ExternalReference = {name: 'ɵɵsanitizeUrl', moduleName: CORE};
  static sanitizeUrlOrResourceUrl:
      o.ExternalReference = {name: 'ɵɵsanitizeUrlOrResourceUrl', moduleName: CORE};
}
