/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ApplicationInitStatus, COMPILER_OPTIONS, Compiler, Component, Directive, ModuleWithComponentFactories, NgModule, NgModuleFactory, NgZone, Injector, Pipe, PlatformRef, Provider, Type, ɵcompileComponent as compileComponent, ɵcompileDirective as compileDirective, ɵcompileNgModuleDefs as compileNgModuleDefs, ɵcompilePipe as compilePipe, ɵgetInjectableDef as getInjectableDef, ɵNG_COMPONENT_DEF as NG_COMPONENT_DEF, ɵNG_DIRECTIVE_DEF as NG_DIRECTIVE_DEF, ɵNG_INJECTOR_DEF as NG_INJECTOR_DEF, ɵNG_MODULE_DEF as NG_MODULE_DEF, ɵNG_PIPE_DEF as NG_PIPE_DEF, ɵRender3ComponentFactory as ComponentFactory, ɵRender3NgModuleRef as NgModuleRef, ɵɵInjectableDef as InjectableDef, ɵNgModuleFactory as R3NgModuleFactory, ɵNgModuleTransitiveScopes as NgModuleTransitiveScopes, ɵNgModuleType as NgModuleType, ɵDirectiveDef as DirectiveDef, ɵpatchComponentDefWithScope as patchComponentDefWithScope, ɵtransitiveScopesFor as transitiveScopesFor,} from '@angular/core';
import {ResourceLoader} from '@angular/compiler';

import {clearResolutionOfComponentResourcesQueue, restoreComponentResolutionQueue, resolveComponentResources, isComponentDefPendingResolution} from '../../src/metadata/resource_loading';

import {MetadataOverride} from './metadata_override';
import {ComponentResolver, DirectiveResolver, NgModuleResolver, PipeResolver, Resolver} from './resolvers';
import {TestModuleMetadata} from './test_bed_common';

const TESTING_MODULE = 'TestingModule';
type TESTING_MODULE = typeof TESTING_MODULE;

// Resolvers for Angular decorators
type Resolvers = {
  module: Resolver<NgModule>,
  component: Resolver<Directive>,
  directive: Resolver<Component>,
  pipe: Resolver<Pipe>,
};

interface CleanupOperation {
  field: string;
  def: any;
  original: unknown;
}

export class R3TestBedCompiler {
  private originalComponentResolutionQueue: Map<Type<any>, Component>|null = null;

  // Testing module configuration
  private declarations: Type<any>[] = [];
  private imports: Type<any>[] = [];
  private providers: Provider[] = [];
  private schemas: any[] = [];

  // Queues of components/directives/pipes that should be recompiled.
  private pendingComponents = new Set<Type<any>>();
  private pendingDirectives = new Set<Type<any>>();
  private pendingPipes = new Set<Type<any>>();

  // Keep track of all components and directives, so we can patch Providers onto defs later.
  private seenComponents = new Set<Type<any>>();
  private seenDirectives = new Set<Type<any>>();

  // Store resolved styles for Components that have template overrides present and `styleUrls`
  // defined at the same time.
  private existingComponentStyles = new Map<Type<any>, string[]>();

  private resolvers: Resolvers = initResolvers();

  private componentToModuleScope = new Map<Type<any>, Type<any>|TESTING_MODULE>();

  // Map that keeps initial version of component/directive/pipe defs in case
  // we compile a Type again, thus overriding respective static fields. This is
  // required to make sure we restore defs to their initial states between test runs
  // TODO: we should support the case with multiple defs on a type
  private initialNgDefs = new Map<Type<any>, [string, PropertyDescriptor|undefined]>();

  // Array that keeps cleanup operations for initial versions of component/directive/pipe/module
  // defs in case TestBed makes changes to the originals.
  private defCleanupOps: CleanupOperation[] = [];

  private _injector: Injector|null = null;
  private compilerProviders: Provider[]|null = null;

  private providerOverrides: Provider[] = [];
  private rootProviderOverrides: Provider[] = [];
  private providerOverridesByToken = new Map<any, Provider>();
  private moduleProvidersOverridden = new Set<Type<any>>();

  private testModuleType: NgModuleType<any>;
  private testModuleRef: NgModuleRef<any>|null = null;

  constructor(private platform: PlatformRef, private additionalModuleTypes: Type<any>|Type<any>[]) {
    class DynamicTestModule {}
    this.testModuleType = DynamicTestModule as any;
  }

  setCompilerProviders(providers: Provider[]|null): void {
    this.compilerProviders = providers;
    this._injector = null;
  }

  configureTestingModule(moduleDef: TestModuleMetadata): void {
    // Enqueue any compilation tasks for the directly declared component.
    if (moduleDef.declarations !== undefined) {
      this.queueTypeArray(moduleDef.declarations, TESTING_MODULE);
      this.declarations.push(...moduleDef.declarations);
    }

    // Enqueue any compilation tasks for imported modules.
    if (moduleDef.imports !== undefined) {
      this.queueTypesFromModulesArray(moduleDef.imports);
      this.imports.push(...moduleDef.imports);
    }

    if (moduleDef.providers !== undefined) {
      this.providers.push(...moduleDef.providers);
    }

    if (moduleDef.schemas !== undefined) {
      this.schemas.push(...moduleDef.schemas);
    }
  }

  overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void {
    // Compile the module right away.
    this.resolvers.module.addOverride(ngModule, override);
    const metadata = this.resolvers.module.resolve(ngModule);
    if (metadata === null) {
      throw new Error(`${ngModule.name} is not an @NgModule or is missing metadata`);
    }

    this.recompileNgModule(ngModule);

    // At this point, the module has a valid .ngModuleDef, but the override may have introduced
    // new declarations or imported modules. Ingest any possible new types and add them to the
    // current queue.
    this.queueTypesFromModulesArray([ngModule]);
  }

  overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void {
    this.resolvers.component.addOverride(component, override);
    this.pendingComponents.add(component);
  }

  overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void {
    this.resolvers.directive.addOverride(directive, override);
    this.pendingDirectives.add(directive);
  }

  overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void {
    this.resolvers.pipe.addOverride(pipe, override);
    this.pendingPipes.add(pipe);
  }

  overrideProvider(
      token: any,
      provider: {useFactory?: Function, useValue?: any, deps?: any[], multi?: boolean}): void {
    const providerDef = provider.useFactory ?
        {
          provide: token,
          useFactory: provider.useFactory,
          deps: provider.deps || [],
          multi: provider.multi,
        } :
        {provide: token, useValue: provider.useValue, multi: provider.multi};

    let injectableDef: InjectableDef<any>|null;
    const isRoot =
        (typeof token !== 'string' && (injectableDef = getInjectableDef(token)) &&
         injectableDef.providedIn === 'root');
    const overridesBucket = isRoot ? this.rootProviderOverrides : this.providerOverrides;
    overridesBucket.push(providerDef);

    // Keep overrides grouped by token as well for fast lookups using token
    this.providerOverridesByToken.set(token, providerDef);
  }

  overrideTemplateUsingTestingModule(type: Type<any>, template: string): void {
    const def = (type as any)[NG_COMPONENT_DEF];
    const hasStyleUrls = (): boolean => {
      const metadata = this.resolvers.component.resolve(type) !as Component;
      return !!metadata.styleUrls && metadata.styleUrls.length > 0;
    };
    const overrideStyleUrls = !!def && !isComponentDefPendingResolution(type) && hasStyleUrls();

    // In Ivy, compiling a component does not require knowing the module providing the
    // component's scope, so overrideTemplateUsingTestingModule can be implemented purely via
    // overrideComponent. Important: overriding template requires full Component re-compilation,
    // which may fail in case styleUrls are also present (thus Component is considered as required
    // resolution). In order to avoid this, we preemptively set styleUrls to an empty array,
    // preserve current styles available on Component def and restore styles back once compilation
    // is complete.
    const override = overrideStyleUrls ? {template, styles: [], styleUrls: []} : {template};
    this.overrideComponent(type, {set: override});

    if (overrideStyleUrls && def.styles && def.styles.length > 0) {
      this.existingComponentStyles.set(type, def.styles);
    }

    // Set the component's scope to be the testing module.
    this.componentToModuleScope.set(type, TESTING_MODULE);
  }

  async compileComponents(): Promise<void> {
    this.clearComponentResolutionQueue();
    // Run compilers for all queued types.
    let needsAsyncResources = this.compileTypesSync();

    // compileComponents() should not be async unless it needs to be.
    if (needsAsyncResources) {
      let resourceLoader: ResourceLoader;
      let resolver = (url: string): Promise<string> => {
        if (!resourceLoader) {
          resourceLoader = this.injector.get(ResourceLoader);
        }
        return Promise.resolve(resourceLoader.get(url));
      };
      await resolveComponentResources(resolver);
    }
  }

  finalize(): NgModuleRef<any> {
    // One last compile
    this.compileTypesSync();

    // Create the testing module itself.
    this.compileTestModule();

    this.applyTransitiveScopes();

    this.applyProviderOverrides();

    // Patch previously stored `styles` Component values (taken from ngComponentDef), in case these
    // Components have `styleUrls` fields defined and template override was requested.
    this.patchComponentsWithExistingStyles();

    // Clear the componentToModuleScope map, so that future compilations don't reset the scope of
    // every component.
    this.componentToModuleScope.clear();

    const parentInjector = this.platform.injector;
    this.testModuleRef = new NgModuleRef(this.testModuleType, parentInjector);


    // ApplicationInitStatus.runInitializers() is marked @internal to core.
    // Cast it to any before accessing it.
    (this.testModuleRef.injector.get(ApplicationInitStatus) as any).runInitializers();

    return this.testModuleRef;
  }

  /**
   * @internal
   */
  _compileNgModuleSync(moduleType: Type<any>): void {
    this.queueTypesFromModulesArray([moduleType]);
    this.compileTypesSync();
    this.applyProviderOverrides();
    this.applyProviderOverridesToModule(moduleType);
    this.applyTransitiveScopes();
  }

  /**
   * @internal
   */
  async _compileNgModuleAsync(moduleType: Type<any>): Promise<void> {
    this.queueTypesFromModulesArray([moduleType]);
    await this.compileComponents();
    this.applyProviderOverrides();
    this.applyProviderOverridesToModule(moduleType);
    this.applyTransitiveScopes();
  }

  /**
   * @internal
   */
  _getModuleResolver(): Resolver<NgModule> { return this.resolvers.module; }

  /**
   * @internal
   */
  _getComponentFactories(moduleType: NgModuleType): ComponentFactory<any>[] {
    return maybeUnwrapFn(moduleType.ngModuleDef.declarations).reduce((factories, declaration) => {
      const componentDef = (declaration as any).ngComponentDef;
      componentDef && factories.push(new ComponentFactory(componentDef, this.testModuleRef !));
      return factories;
    }, [] as ComponentFactory<any>[]);
  }

  private compileTypesSync(): boolean {
    // Compile all queued components, directives, pipes.
    let needsAsyncResources = false;
    this.pendingComponents.forEach(declaration => {
      needsAsyncResources = needsAsyncResources || isComponentDefPendingResolution(declaration);
      const metadata = this.resolvers.component.resolve(declaration) !;
      this.maybeStoreNgDef(NG_COMPONENT_DEF, declaration);
      compileComponent(declaration, metadata);
    });
    this.pendingComponents.clear();

    this.pendingDirectives.forEach(declaration => {
      const metadata = this.resolvers.directive.resolve(declaration) !;
      this.maybeStoreNgDef(NG_DIRECTIVE_DEF, declaration);
      compileDirective(declaration, metadata);
    });
    this.pendingDirectives.clear();

    this.pendingPipes.forEach(declaration => {
      const metadata = this.resolvers.pipe.resolve(declaration) !;
      this.maybeStoreNgDef(NG_PIPE_DEF, declaration);
      compilePipe(declaration, metadata);
    });
    this.pendingPipes.clear();

    return needsAsyncResources;
  }

  private applyTransitiveScopes(): void {
    const moduleToScope = new Map<Type<any>|TESTING_MODULE, NgModuleTransitiveScopes>();
    const getScopeOfModule = (moduleType: Type<any>| TESTING_MODULE): NgModuleTransitiveScopes => {
      if (!moduleToScope.has(moduleType)) {
        const realType = moduleType === TESTING_MODULE ? this.testModuleType : moduleType;
        moduleToScope.set(moduleType, transitiveScopesFor(realType));
      }
      return moduleToScope.get(moduleType) !;
    };

    this.componentToModuleScope.forEach((moduleType, componentType) => {
      const moduleScope = getScopeOfModule(moduleType);
      this.storeFieldOfDefOnType(componentType, NG_COMPONENT_DEF, 'directiveDefs');
      this.storeFieldOfDefOnType(componentType, NG_COMPONENT_DEF, 'pipeDefs');
      patchComponentDefWithScope((componentType as any).ngComponentDef, moduleScope);
    });

    this.componentToModuleScope.clear();
  }

  private applyProviderOverrides(): void {
    const maybeApplyOverrides = (field: string) => (type: Type<any>) => {
      const resolver =
          field === NG_COMPONENT_DEF ? this.resolvers.component : this.resolvers.directive;
      const metadata = resolver.resolve(type) !;
      if (this.hasProviderOverrides(metadata.providers)) {
        this.patchDefWithProviderOverrides(type, field);
      }
    };
    this.seenComponents.forEach(maybeApplyOverrides(NG_COMPONENT_DEF));
    this.seenDirectives.forEach(maybeApplyOverrides(NG_DIRECTIVE_DEF));

    this.seenComponents.clear();
    this.seenDirectives.clear();
  }

  private applyProviderOverridesToModule(moduleType: Type<any>): void {
    if (this.moduleProvidersOverridden.has(moduleType)) {
      return;
    }
    this.moduleProvidersOverridden.add(moduleType);

    const injectorDef: any = (moduleType as any)[NG_INJECTOR_DEF];
    if (this.providerOverridesByToken.size > 0) {
      if (this.hasProviderOverrides(injectorDef.providers)) {
        this.maybeStoreNgDef(NG_INJECTOR_DEF, moduleType);

        this.storeFieldOfDefOnType(moduleType, NG_INJECTOR_DEF, 'providers');
        injectorDef.providers = this.getOverriddenProviders(injectorDef.providers);
      }

      // Apply provider overrides to imported modules recursively
      const moduleDef: any = (moduleType as any)[NG_MODULE_DEF];
      for (const importType of moduleDef.imports) {
        this.applyProviderOverridesToModule(importType);
      }
    }
  }

  private patchComponentsWithExistingStyles(): void {
    this.existingComponentStyles.forEach(
        (styles, type) => (type as any)[NG_COMPONENT_DEF].styles = styles);
    this.existingComponentStyles.clear();
  }

  private queueTypeArray(arr: any[], moduleType: Type<any>|TESTING_MODULE): void {
    for (const value of arr) {
      if (Array.isArray(value)) {
        this.queueTypeArray(value, moduleType);
      } else {
        this.queueType(value, moduleType);
      }
    }
  }

  private recompileNgModule(ngModule: Type<any>): void {
    const metadata = this.resolvers.module.resolve(ngModule);
    if (metadata === null) {
      throw new Error(`Unable to resolve metadata for NgModule: ${ngModule.name}`);
    }
    // Cache the initial ngModuleDef as it will be overwritten.
    this.maybeStoreNgDef(NG_MODULE_DEF, ngModule);
    this.maybeStoreNgDef(NG_INJECTOR_DEF, ngModule);

    compileNgModuleDefs(ngModule as NgModuleType<any>, metadata);
  }

  private queueType(type: Type<any>, moduleType: Type<any>|TESTING_MODULE): void {
    const component = this.resolvers.component.resolve(type);
    if (component) {
      // Check whether a give Type has respective NG def (ngComponentDef) and compile if def is
      // missing. That might happen in case a class without any Angular decorators extends another
      // class where Component/Directive/Pipe decorator is defined.
      if (isComponentDefPendingResolution(type) || !type.hasOwnProperty(NG_COMPONENT_DEF)) {
        this.pendingComponents.add(type);
      }
      this.seenComponents.add(type);

      // Keep track of the module which declares this component, so later the component's scope
      // can be set correctly. Only record this the first time, because it might be overridden by
      // overrideTemplateUsingTestingModule.
      if (!this.componentToModuleScope.has(type)) {
        this.componentToModuleScope.set(type, moduleType);
      }
      return;
    }

    const directive = this.resolvers.directive.resolve(type);
    if (directive) {
      if (!type.hasOwnProperty(NG_DIRECTIVE_DEF)) {
        this.pendingDirectives.add(type);
      }
      this.seenDirectives.add(type);
      return;
    }

    const pipe = this.resolvers.pipe.resolve(type);
    if (pipe && !type.hasOwnProperty(NG_PIPE_DEF)) {
      this.pendingPipes.add(type);
      return;
    }
  }

  private queueTypesFromModulesArray(arr: any[]): void {
    for (const value of arr) {
      if (Array.isArray(value)) {
        this.queueTypesFromModulesArray(value);
      } else if (hasNgModuleDef(value)) {
        const def = value.ngModuleDef;
        // Look through declarations, imports, and exports, and queue everything found there.
        this.queueTypeArray(maybeUnwrapFn(def.declarations), value);
        this.queueTypesFromModulesArray(maybeUnwrapFn(def.imports));
        this.queueTypesFromModulesArray(maybeUnwrapFn(def.exports));
      }
    }
  }

  private maybeStoreNgDef(prop: string, type: Type<any>) {
    if (!this.initialNgDefs.has(type)) {
      const currentDef = Object.getOwnPropertyDescriptor(type, prop);
      this.initialNgDefs.set(type, [prop, currentDef]);
    }
  }

  private storeFieldOfDefOnType(type: Type<any>, defField: string, field: string): void {
    const def: any = (type as any)[defField];
    const original: any = def[field];
    this.defCleanupOps.push({field, def, original});
  }

  /**
   * Clears current components resolution queue, but stores the state of the queue, so we can
   * restore it later. Clearing the queue is required before we try to compile components (via
   * `TestBed.compileComponents`), so that component defs are in sync with the resolution queue.
   */
  private clearComponentResolutionQueue() {
    if (this.originalComponentResolutionQueue === null) {
      this.originalComponentResolutionQueue = new Map();
    }
    clearResolutionOfComponentResourcesQueue().forEach(
        (value, key) => this.originalComponentResolutionQueue !.set(key, value));
  }

  /*
   * Restores component resolution queue to the previously saved state. This operation is performed
   * as a part of restoring the state after completion of the current set of tests (that might
   * potentially mutate the state).
   */
  private restoreComponentResolutionQueue() {
    if (this.originalComponentResolutionQueue !== null) {
      restoreComponentResolutionQueue(this.originalComponentResolutionQueue);
      this.originalComponentResolutionQueue = null;
    }
  }

  restoreOriginalState(): void {
    for (const op of this.defCleanupOps) {
      op.def[op.field] = op.original;
    }
    // Restore initial component/directive/pipe defs
    this.initialNgDefs.forEach((value: [string, PropertyDescriptor], type: Type<any>) => {
      const [prop, descriptor] = value;
      if (!descriptor) {
        // Delete operations are generally undesirable since they have performance implications
        // on objects they were applied to. In this particular case, situations where this code is
        // invoked should be quite rare to cause any noticable impact, since it's applied only to
        // some test cases (for example when class with no annotations extends some @Component)
        // when we need to clear 'ngComponentDef' field on a given class to restore its original
        // state (before applying overrides and running tests).
        delete (type as any)[prop];
      } else {
        Object.defineProperty(type, prop, descriptor);
      }
    });
    this.initialNgDefs.clear();
    this.moduleProvidersOverridden.clear();
    this.restoreComponentResolutionQueue();
  }

  private compileTestModule(): void {
    class RootScopeModule {}
    compileNgModuleDefs(RootScopeModule as NgModuleType<any>, {
      providers: [...this.rootProviderOverrides],
    });

    const ngZone = new NgZone({enableLongStackTrace: true});
    const providers: Provider[] = [
      {provide: NgZone, useValue: ngZone},
      {provide: Compiler, useFactory: () => new R3TestCompiler(this)},
      ...this.providers,
      ...this.providerOverrides,
    ];
    const imports = [RootScopeModule, this.additionalModuleTypes, this.imports || []];

    // clang-format off
    compileNgModuleDefs(this.testModuleType, {
      declarations: this.declarations,
      imports,
      schemas: this.schemas,
      providers,
    });
    // clang-format on

    this.applyProviderOverridesToModule(this.testModuleType);
  }

  get injector(): Injector {
    if (this._injector !== null) {
      return this._injector;
    }

    const providers: Provider[] = [];
    const compilerOptions = this.platform.injector.get(COMPILER_OPTIONS);
    compilerOptions.forEach(opts => {
      if (opts.providers) {
        providers.push(opts.providers);
      }
    });
    if (this.compilerProviders !== null) {
      providers.push(...this.compilerProviders);
    }

    // TODO(ocombe): make this work with an Injector directly instead of creating a module for it
    @NgModule({providers})
    class CompilerModule {
    }

    const CompilerModuleFactory = new R3NgModuleFactory(CompilerModule);
    this._injector = CompilerModuleFactory.create(this.platform.injector).injector;
    return this._injector;
  }

  // get overrides for a specific provider (if any)
  private getSingleProviderOverrides(provider: Provider): Provider|null {
    const token = getProviderToken(provider);
    return this.providerOverridesByToken.get(token) || null;
  }

  private getProviderOverrides(providers?: Provider[]): Provider[] {
    if (!providers || !providers.length || this.providerOverridesByToken.size === 0) return [];
    // There are two flattening operations here. The inner flatten() operates on the metadata's
    // providers and applies a mapping function which retrieves overrides for each incoming
    // provider. The outer flatten() then flattens the produced overrides array. If this is not
    // done, the array can contain other empty arrays (e.g. `[[], []]`) which leak into the
    // providers array and contaminate any error messages that might be generated.
    return flatten(flatten(
        providers, (provider: Provider) => this.getSingleProviderOverrides(provider) || []));
  }

  private getOverriddenProviders(providers?: Provider[]): Provider[] {
    if (!providers || !providers.length || this.providerOverridesByToken.size === 0) return [];

    const overrides = this.getProviderOverrides(providers);
    const hasMultiProviderOverrides = overrides.some(isMultiProvider);
    const overriddenProviders = [...providers, ...overrides];

    // No additional processing is required in case we have no multi providers to override
    if (!hasMultiProviderOverrides) {
      return overriddenProviders;
    }

    const final: Provider[] = [];
    const seenMultiProviders = new Set<Provider>();

    // We iterate through the list of providers in reverse order to make sure multi provider
    // overrides take precedence over the values defined in provider list. We also fiter out all
    // multi providers that have overrides, keeping overridden values only.
    forEachRight(overriddenProviders, (provider: any) => {
      const token: any = getProviderToken(provider);
      if (isMultiProvider(provider) && this.providerOverridesByToken.has(token)) {
        if (!seenMultiProviders.has(token)) {
          seenMultiProviders.add(token);
          if (provider && provider.useValue && Array.isArray(provider.useValue)) {
            forEachRight(provider.useValue, (value: any) => {
              // Unwrap provider override array into individual providers in final set.
              final.unshift({provide: token, useValue: value, multi: true});
            });
          } else {
            final.unshift(provider);
          }
        }
      } else {
        final.unshift(provider);
      }
    });
    return final;
  }

  private hasProviderOverrides(providers?: Provider[]): boolean {
    return this.getProviderOverrides(providers).length > 0;
  }

  private patchDefWithProviderOverrides(declaration: Type<any>, field: string): void {
    const def = (declaration as any)[field];
    if (def && def.providersResolver) {
      this.maybeStoreNgDef(field, declaration);

      const resolver = def.providersResolver;
      const processProvidersFn = (providers: Provider[]) => this.getOverriddenProviders(providers);
      this.storeFieldOfDefOnType(declaration, field, 'providersResolver');
      def.providersResolver = (ngDef: DirectiveDef<any>) => resolver(ngDef, processProvidersFn);
    }
  }
}

function initResolvers(): Resolvers {
  return {
    module: new NgModuleResolver(),
    component: new ComponentResolver(),
    directive: new DirectiveResolver(),
    pipe: new PipeResolver()
  };
}

function hasNgModuleDef<T>(value: Type<T>): value is NgModuleType<T> {
  return value.hasOwnProperty('ngModuleDef');
}

function maybeUnwrapFn<T>(maybeFn: (() => T) | T): T {
  return maybeFn instanceof Function ? maybeFn() : maybeFn;
}

function flatten<T>(values: any[], mapFn?: (value: T) => any): T[] {
  const out: T[] = [];
  values.forEach(value => {
    if (Array.isArray(value)) {
      out.push(...flatten<T>(value, mapFn));
    } else {
      out.push(mapFn ? mapFn(value) : value);
    }
  });
  return out;
}

function getProviderField(provider: Provider, field: string) {
  return provider && typeof provider === 'object' && (provider as any)[field];
}

function getProviderToken(provider: Provider) {
  return getProviderField(provider, 'provide') || provider;
}

function isMultiProvider(provider: Provider) {
  return !!getProviderField(provider, 'multi');
}

function forEachRight<T>(values: T[], fn: (value: T, idx: number) => void): void {
  for (let idx = values.length - 1; idx >= 0; idx--) {
    fn(values[idx], idx);
  }
}

class R3TestCompiler implements Compiler {
  constructor(private testBed: R3TestBedCompiler) {}

  compileModuleSync<T>(moduleType: Type<T>): NgModuleFactory<T> {
    this.testBed._compileNgModuleSync(moduleType);
    return new R3NgModuleFactory(moduleType);
  }

  async compileModuleAsync<T>(moduleType: Type<T>): Promise<NgModuleFactory<T>> {
    await this.testBed._compileNgModuleAsync(moduleType);
    return new R3NgModuleFactory(moduleType);
  }

  compileModuleAndAllComponentsSync<T>(moduleType: Type<T>): ModuleWithComponentFactories<T> {
    const ngModuleFactory = this.compileModuleSync(moduleType);
    const componentFactories = this.testBed._getComponentFactories(moduleType as NgModuleType<T>);
    return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
  }

  async compileModuleAndAllComponentsAsync<T>(moduleType: Type<T>):
      Promise<ModuleWithComponentFactories<T>> {
    const ngModuleFactory = await this.compileModuleAsync(moduleType);
    const componentFactories = this.testBed._getComponentFactories(moduleType as NgModuleType<T>);
    return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
  }

  clearCache(): void {}

  clearCacheFor(type: Type<any>): void {}

  getModuleId(moduleType: Type<any>): string|undefined {
    const meta = this.testBed._getModuleResolver().resolve(moduleType);
    return meta && meta.id || undefined;
  }
}
