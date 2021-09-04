/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {isAbsolutePath, normalizeSeparators} from './util';

/**
 * A `string` representing a specific type of path, with a particular brand `B`.
 *
 * A `string` is not assignable to a `BrandedPath`, but a `BrandedPath` is assignable to a `string`.
 * Two `BrandedPath`s with different brands are not mutually assignable.
 */
export type BrandedPath<B extends string> = string & {
  _brand: B;
};

/**
 * A fully qualified path in the file system, in POSIX form.
 */
export type AbsoluteFsPath = BrandedPath<'AbsoluteFsPath'>;

/**
 * A path that's relative to another (unspecified) root.
 *
 * This does not necessarily have to refer to a physical file.
 */
export type PathSegment = BrandedPath<'PathSegment'>;

/**
 * Contains utility functions for creating and manipulating `AbsoluteFsPath`s.
 */
export const AbsoluteFsPath = {
  /**
   * Convert the path `str` to an `AbsoluteFsPath`, throwing an error if it's not an absolute path.
   */
  from: function(str: string): AbsoluteFsPath {
    const normalized = normalizeSeparators(str);
    if (!isAbsolutePath(normalized)) {
      throw new Error(`Internal Error: AbsoluteFsPath.from(${str}): path is not absolute`);
    }
    return normalized as AbsoluteFsPath;
  },

  /**
   * Assume that the path `str` is an `AbsoluteFsPath` in the correct format already.
   */
  fromUnchecked: function(str: string): AbsoluteFsPath { return str as AbsoluteFsPath;},

  /**
   * Extract an `AbsoluteFsPath` from a `ts.SourceFile`.
   *
   * This is cheaper than calling `AbsoluteFsPath.from(sf.fileName)`, as source files already have
   * their file path in absolute POSIX format.
   */
  fromSourceFile: function(sf: ts.SourceFile): AbsoluteFsPath {
    // ts.SourceFile paths are always absolute.
    return sf.fileName as AbsoluteFsPath;
  },
};

/**
 * Contains utility functions for creating and manipulating `PathSegment`s.
 */
export const PathSegment = {
  /**
   * Convert the path `str` to a `PathSegment`, throwing an error if it's not a relative path.
   */
  fromFsPath: function(str: string): PathSegment {
    const normalized = normalizeSeparators(str);
    if (isAbsolutePath(normalized)) {
      throw new Error(`Internal Error: PathSegment.fromFsPath(${str}): path is not relative`);
    }
    return normalized as PathSegment;
  },

  /**
   * Convert the path `str` to a `PathSegment`, while assuming that `str` is already normalized.
   */
  fromUnchecked: function(str: string): PathSegment { return str as PathSegment;},
};
