/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as path from 'canonical-path';
import * as fs from 'fs';

import {AbsoluteFsPath} from '../../../src/ngtsc/path';
import {Logger} from '../logging/logger';


/**
 * The possible values for the format of an entry-point.
 */
export type EntryPointFormat = 'esm5' | 'esm2015' | 'umd';

/**
 * An object containing information about an entry-point, including paths
 * to each of the possible entry-point formats.
 */
export interface EntryPoint {
  /** The name of the package (e.g. `@angular/core`). */
  name: string;
  /** The parsed package.json file for this entry-point. */
  packageJson: EntryPointPackageJson;
  /** The path to the package that contains this entry-point. */
  package: AbsoluteFsPath;
  /** The path to this entry point. */
  path: AbsoluteFsPath;
  /** The path to a typings (.d.ts) file for this entry-point. */
  typings: AbsoluteFsPath;
}

interface PackageJsonFormatProperties {
  fesm2015?: string;
  fesm5?: string;
  es2015?: string;  // if exists then it is actually FESM2015
  esm2015?: string;
  esm5?: string;
  main?: string;     // UMD
  module?: string;   // if exists then it is actually FESM5
  types?: string;    // Synonymous to `typings` property - see https://bit.ly/2OgWp2H
  typings?: string;  // TypeScript .d.ts files
}

/**
 * The properties that may be loaded from the `package.json` file.
 */
export interface EntryPointPackageJson extends PackageJsonFormatProperties {
  name: string;
  __processed_by_ivy_ngcc__?: {[key: string]: string};
}

export type EntryPointJsonProperty = keyof(PackageJsonFormatProperties);
// We need to keep the elements of this const and the `EntryPointJsonProperty` type in sync.
export const SUPPORTED_FORMAT_PROPERTIES: EntryPointJsonProperty[] =
    ['fesm2015', 'fesm5', 'es2015', 'esm2015', 'esm5', 'main', 'module'];

/**
 * Try to create an entry-point from the given paths and properties.
 *
 * @param packagePath the absolute path to the containing npm package
 * @param entryPointPath the absolute path to the potential entry-point.
 * @returns An entry-point if it is valid, `null` otherwise.
 */
export function getEntryPointInfo(
    logger: Logger, packagePath: AbsoluteFsPath, entryPointPath: AbsoluteFsPath): EntryPoint|null {
  const packageJsonPath = path.resolve(entryPointPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  const entryPointPackageJson = loadEntryPointPackage(logger, packageJsonPath);
  if (!entryPointPackageJson) {
    return null;
  }


  // We must have a typings property
  const typings = entryPointPackageJson.typings || entryPointPackageJson.types;
  if (!typings) {
    return null;
  }

  // Also there must exist a `metadata.json` file next to the typings entry-point.
  const metadataPath =
      path.resolve(entryPointPath, typings.replace(/\.d\.ts$/, '') + '.metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const entryPointInfo: EntryPoint = {
    name: entryPointPackageJson.name,
    packageJson: entryPointPackageJson,
    package: packagePath,
    path: entryPointPath,
    typings: AbsoluteFsPath.from(path.resolve(entryPointPath, typings)),
  };

  return entryPointInfo;
}

/**
 * Convert a package.json property into an entry-point format.
 *
 * @param property The property to convert to a format.
 * @returns An entry-point format or `undefined` if none match the given property.
 */
export function getEntryPointFormat(property: string): EntryPointFormat|undefined {
  switch (property) {
    case 'fesm2015':
      return 'esm2015';
    case 'fesm5':
      return 'esm5';
    case 'es2015':
      return 'esm2015';
    case 'esm2015':
      return 'esm2015';
    case 'esm5':
      return 'esm5';
    case 'main':
      return 'umd';
    case 'module':
      return 'esm5';
    default:
      return undefined;
  }
}

/**
 * Parses the JSON from a package.json file.
 * @param packageJsonPath the absolute path to the package.json file.
 * @returns JSON from the package.json file if it is valid, `null` otherwise.
 */
function loadEntryPointPackage(logger: Logger, packageJsonPath: string): EntryPointPackageJson|
    null {
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (e) {
    // We may have run into a package.json with unexpected symbols
    logger.warn(`Failed to read entry point info from ${packageJsonPath} with error ${e}.`);
    return null;
  }
}
