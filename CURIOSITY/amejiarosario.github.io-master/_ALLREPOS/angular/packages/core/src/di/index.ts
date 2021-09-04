/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */

export * from './metadata';
export {InjectFlags} from './interface/injector';
export {ɵɵdefineInjectable, defineInjectable, ɵɵdefineInjector, InjectableType, InjectorType} from './interface/defs';
export {forwardRef, resolveForwardRef, ForwardRefFn} from './forward_ref';
export {Injectable, InjectableDecorator, InjectableProvider} from './injectable';
export {INJECTOR, Injector} from './injector';
export {ɵɵinject, inject} from './injector_compatibility';
export {ReflectiveInjector} from './reflective_injector';
export {StaticProvider, ValueProvider, ConstructorSansProvider, ExistingProvider, FactoryProvider, Provider, TypeProvider, ClassProvider} from './interface/provider';
export {ResolvedReflectiveFactory, ResolvedReflectiveProvider} from './reflective_provider';
export {ReflectiveKey} from './reflective_key';
export {InjectionToken} from './injection_token';
