/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as fs from 'fs';
import * as ts from 'typescript';
import {CompilerHost} from '../transformers/api';
import {ResourceLoader} from './annotations/src/api';

const CSS_PREPROCESSOR_EXT = /(\.scss|\.less|\.styl)$/;

/**
 * `ResourceLoader` which delegates to a `CompilerHost` resource loading method.
 */
export class HostResourceLoader implements ResourceLoader {
  private cache = new Map<string, string>();
  private fetching = new Map<string, Promise<void>>();

  canPreload = !!this.host.readResource;

  constructor(private host: CompilerHost, private options: ts.CompilerOptions) {}

  /**
   * Resolve the url of a resource relative to the file that contains the reference to it.
   * The return value of this method can be used in the `load()` and `preload()` methods.
   *
   * Uses the provided CompilerHost if it supports mapping resources to filenames.
   * Otherwise, uses a fallback mechanism that searches the module resolution candidates.
   *
   * @param url The, possibly relative, url of the resource.
   * @param fromFile The path to the file that contains the URL of the resource.
   * @returns A resolved url of resource.
   * @throws An error if the resource cannot be resolved.
   */
  resolve(url: string, fromFile: string): string {
    let resolvedUrl: string|null = null;
    if (this.host.resourceNameToFileName) {
      resolvedUrl = this.host.resourceNameToFileName(url, fromFile);
    } else {
      resolvedUrl = this.fallbackResolve(url, fromFile);
    }
    if (resolvedUrl === null) {
      throw new Error(`HostResourceResolver: could not resolve ${url} in context of ${fromFile})`);
    }
    return resolvedUrl;
  }

  /**
   * Preload the specified resource, asynchronously.
   *
   * Once the resource is loaded, its value is cached so it can be accessed synchronously via the
   * `load()` method.
   *
   * @param resolvedUrl The url (resolved by a call to `resolve()`) of the resource to preload.
   * @returns A Promise that is resolved once the resource has been loaded or `undefined` if the
   * file has already been loaded.
   * @throws An Error if pre-loading is not available.
   */
  preload(resolvedUrl: string): Promise<void>|undefined {
    if (!this.host.readResource) {
      throw new Error(
          'HostResourceLoader: the CompilerHost provided does not support pre-loading resources.');
    }
    if (this.cache.has(resolvedUrl)) {
      return undefined;
    } else if (this.fetching.has(resolvedUrl)) {
      return this.fetching.get(resolvedUrl);
    }

    const result = this.host.readResource(resolvedUrl);
    if (typeof result === 'string') {
      this.cache.set(resolvedUrl, result);
      return undefined;
    } else {
      const fetchCompletion = result.then(str => {
        this.fetching.delete(resolvedUrl);
        this.cache.set(resolvedUrl, str);
      });
      this.fetching.set(resolvedUrl, fetchCompletion);
      return fetchCompletion;
    }
  }

  /**
   * Load the resource at the given url, synchronously.
   *
   * The contents of the resource may have been cached by a previous call to `preload()`.
   *
   * @param resolvedUrl The url (resolved by a call to `resolve()`) of the resource to load.
   * @returns The contents of the resource.
   */
  load(resolvedUrl: string): string {
    if (this.cache.has(resolvedUrl)) {
      return this.cache.get(resolvedUrl) !;
    }

    const result = this.host.readResource ? this.host.readResource(resolvedUrl) :
                                            fs.readFileSync(resolvedUrl, 'utf8');
    if (typeof result !== 'string') {
      throw new Error(`HostResourceLoader: loader(${resolvedUrl}) returned a Promise`);
    }
    this.cache.set(resolvedUrl, result);
    return result;
  }

  /**
   * Attempt to resolve `url` in the context of `fromFile`, while respecting the rootDirs
   * option from the tsconfig. First, normalize the file name.
   */
  private fallbackResolve(url: string, fromFile: string): string|null {
    // Strip a leading '/' if one is present.
    if (url.startsWith('/')) {
      url = url.substr(1);

      // Do not take current file location into account if we process absolute path.
      fromFile = '';
    }
    // Turn absolute paths into relative paths.
    if (!url.startsWith('.')) {
      url = `./${url}`;
    }

    const candidateLocations = this.getCandidateLocations(url, fromFile);
    for (const candidate of candidateLocations) {
      if (fs.existsSync(candidate)) {
        return candidate;
      } else if (CSS_PREPROCESSOR_EXT.test(candidate)) {
        /**
         * If the user specified styleUrl points to *.scss, but the Sass compiler was run before
         * Angular, then the resource may have been generated as *.css. Simply try the resolution
         * again.
         */
        const cssFallbackUrl = candidate.replace(CSS_PREPROCESSOR_EXT, '.css');
        if (fs.existsSync(cssFallbackUrl)) {
          return cssFallbackUrl;
        }
      }
    }
    return null;
  }


  /**
   * TypeScript provides utilities to resolve module names, but not resource files (which aren't
   * a part of the ts.Program). However, TypeScript's module resolution can be used creatively
   * to locate where resource files should be expected to exist. Since module resolution returns
   * a list of file names that were considered, the loader can enumerate the possible locations
   * for the file by setting up a module resolution for it that will fail.
   */
  private getCandidateLocations(url: string, fromFile: string): string[] {
    // `failedLookupLocations` is in the name of the type ts.ResolvedModuleWithFailedLookupLocations
    // but is marked @internal in TypeScript. See
    // https://github.com/Microsoft/TypeScript/issues/28770.
    type ResolvedModuleWithFailedLookupLocations =
        ts.ResolvedModuleWithFailedLookupLocations & {failedLookupLocations: ReadonlyArray<string>};

    // clang-format off
    const failedLookup = ts.resolveModuleName(url + '.$ngresource$', fromFile, this.options, this.host) as ResolvedModuleWithFailedLookupLocations;
    // clang-format on
    if (failedLookup.failedLookupLocations === undefined) {
      throw new Error(
          `Internal error: expected to find failedLookupLocations during resolution of resource '${url}' in context of ${fromFile}`);
    }

    return failedLookup.failedLookupLocations
        .filter(candidate => candidate.endsWith('.$ngresource$.ts'))
        .map(candidate => candidate.replace(/\.\$ngresource\$\.ts$/, ''));
  }
}
