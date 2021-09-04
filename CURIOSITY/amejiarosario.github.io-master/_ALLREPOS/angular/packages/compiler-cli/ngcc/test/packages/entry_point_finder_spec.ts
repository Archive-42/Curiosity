/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as mockFs from 'mock-fs';

import {AbsoluteFsPath} from '../../../src/ngtsc/path';
import {DependencyHost} from '../../src/packages/dependency_host';
import {DependencyResolver} from '../../src/packages/dependency_resolver';
import {EntryPoint} from '../../src/packages/entry_point';
import {EntryPointFinder} from '../../src/packages/entry_point_finder';
import {MockLogger} from '../helpers/mock_logger';

const _ = AbsoluteFsPath.from;

describe('findEntryPoints()', () => {
  let resolver: DependencyResolver;
  let finder: EntryPointFinder;
  beforeEach(() => {
    resolver = new DependencyResolver(new MockLogger(), new DependencyHost());
    spyOn(resolver, 'sortEntryPointsByDependency').and.callFake((entryPoints: EntryPoint[]) => {
      return {entryPoints, ignoredEntryPoints: [], ignoredDependencies: []};
    });
    finder = new EntryPointFinder(new MockLogger(), resolver);
  });
  beforeEach(createMockFileSystem);
  afterEach(restoreRealFileSystem);

  it('should find sub-entry-points within a package', () => {
    const {entryPoints} = finder.findEntryPoints(_('/sub_entry_points'));
    const entryPointPaths = entryPoints.map(x => [x.package, x.path]);
    expect(entryPointPaths).toEqual([
      [_('/sub_entry_points/common'), _('/sub_entry_points/common')],
      [_('/sub_entry_points/common'), _('/sub_entry_points/common/http')],
      [_('/sub_entry_points/common'), _('/sub_entry_points/common/http/testing')],
      [_('/sub_entry_points/common'), _('/sub_entry_points/common/testing')],
    ]);
  });

  it('should find packages inside a namespace', () => {
    const {entryPoints} = finder.findEntryPoints(_('/namespaced'));
    const entryPointPaths = entryPoints.map(x => [x.package, x.path]);
    expect(entryPointPaths).toEqual([
      [_('/namespaced/@angular/common'), _('/namespaced/@angular/common')],
      [_('/namespaced/@angular/common'), _('/namespaced/@angular/common/http')],
      [_('/namespaced/@angular/common'), _('/namespaced/@angular/common/http/testing')],
      [_('/namespaced/@angular/common'), _('/namespaced/@angular/common/testing')],
    ]);
  });

  it('should return an empty array if there are no packages', () => {
    const {entryPoints} = finder.findEntryPoints(_('/no_packages'));
    expect(entryPoints).toEqual([]);
  });

  it('should return an empty array if there are no valid entry-points', () => {
    const {entryPoints} = finder.findEntryPoints(_('/no_valid_entry_points'));
    expect(entryPoints).toEqual([]);
  });

  it('should ignore folders starting with .', () => {
    const {entryPoints} = finder.findEntryPoints(_('/dotted_folders'));
    expect(entryPoints).toEqual([]);
  });

  it('should ignore folders that are symlinked', () => {
    const {entryPoints} = finder.findEntryPoints(_('/symlinked_folders'));
    expect(entryPoints).toEqual([]);
  });

  it('should handle nested node_modules folders', () => {
    const {entryPoints} = finder.findEntryPoints(_('/nested_node_modules'));
    const entryPointPaths = entryPoints.map(x => [x.package, x.path]);
    expect(entryPointPaths).toEqual([
      [_('/nested_node_modules/outer'), _('/nested_node_modules/outer')],
      // Note that the inner entry point does not get included as part of the outer package
      [
        _('/nested_node_modules/outer/node_modules/inner'),
        _('/nested_node_modules/outer/node_modules/inner'),
      ],
    ]);
  });

  function createMockFileSystem() {
    mockFs({
      '/sub_entry_points': {
        'common': {
          'package.json': createPackageJson('common'),
          'common.metadata.json': 'metadata info',
          'http': {
            'package.json': createPackageJson('http'),
            'http.metadata.json': 'metadata info',
            'testing': {
              'package.json': createPackageJson('testing'),
              'testing.metadata.json': 'metadata info',
            },
          },
          'testing': {
            'package.json': createPackageJson('testing'),
            'testing.metadata.json': 'metadata info',
          },
        },
      },
      '/namespaced': {
        '@angular': {
          'common': {
            'package.json': createPackageJson('common'),
            'common.metadata.json': 'metadata info',
            'http': {
              'package.json': createPackageJson('http'),
              'http.metadata.json': 'metadata info',
              'testing': {
                'package.json': createPackageJson('testing'),
                'testing.metadata.json': 'metadata info',
              },
            },
            'testing': {
              'package.json': createPackageJson('testing'),
              'testing.metadata.json': 'metadata info',
            },
          },
        },
      },
      '/no_packages': {'should_not_be_found': {}},
      '/no_valid_entry_points': {
        'some_package': {
          'package.json': '{}',
        },
      },
      '/dotted_folders': {
        '.common': {
          'package.json': createPackageJson('common'),
          'common.metadata.json': 'metadata info',
        },
      },
      '/symlinked_folders': {
        'common': mockFs.symlink({path: '/sub_entry_points/common'}),
      },
      '/nested_node_modules': {
        'outer': {
          'package.json': createPackageJson('outer'),
          'outer.metadata.json': 'metadata info',
          'node_modules': {
            'inner': {
              'package.json': createPackageJson('inner'),
              'inner.metadata.json': 'metadata info',
            },
          },
        },
      },
    });
  }
  function restoreRealFileSystem() { mockFs.restore(); }
});

function createPackageJson(packageName: string): string {
  const packageJson: any = {
    typings: `./${packageName}.d.ts`,
    fesm2015: `./fesm2015/${packageName}.js`,
    esm2015: `./esm2015/${packageName}.js`,
    fesm5: `./fesm2015/${packageName}.js`,
    esm5: `./esm2015/${packageName}.js`,
    main: `./bundles/${packageName}.umd.js`,
  };
  return JSON.stringify(packageJson);
}
