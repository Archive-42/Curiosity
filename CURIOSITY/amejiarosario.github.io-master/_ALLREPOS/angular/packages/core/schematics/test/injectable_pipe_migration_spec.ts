/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {getSystemPath, normalize, virtualFs} from '@angular-devkit/core';
import {TempScopedNodeJsSyncHost} from '@angular-devkit/core/node/testing';
import {HostTree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';

describe('injectable pipe migration', () => {
  let runner: SchematicTestRunner;
  let host: TempScopedNodeJsSyncHost;
  let tree: UnitTestTree;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    runner = new SchematicTestRunner('test', require.resolve('../migrations.json'));
    host = new TempScopedNodeJsSyncHost();
    tree = new UnitTestTree(new HostTree(host));

    writeFile('/tsconfig.json', JSON.stringify({
      compilerOptions: {
        lib: ['es2015'],
      }
    }));
    writeFile('/angular.json', JSON.stringify({
      projects: {t: {architect: {build: {options: {tsConfig: './tsconfig.json'}}}}}
    }));

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);

    // Switch into the temporary directory path. This allows us to run
    // the schematic against our custom unit test tree.
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  it('should add @Injectable to pipes that do not have it', () => {
    writeFile('/index.ts', `
      import { Pipe } from '@angular/core';

      @Pipe({ name: 'myPipe' })
      export class MyPipe {
      }
    `);

    runMigration();
    expect(tree.readContent('/index.ts'))
        .toMatch(/@Injectable\(\)\s+@Pipe\(\{ name: 'myPipe' \}\)\s+export class MyPipe/);
  });

  it('should add an import for Injectable to the @angular/core import declaration', () => {
    writeFile('/index.ts', `
      import { Pipe } from '@angular/core';

      @Pipe()
      export class MyPipe {
      }
    `);

    runMigration();
    expect(tree.readContent('/index.ts'))
        .toContain('import { Pipe, Injectable } from \'@angular/core\'');
  });

  it('should not add an import for Injectable if it is imported already', () => {
    writeFile('/index.ts', `
      import { Pipe, Injectable, NgModule } from '@angular/core';

      @Pipe()
      export class MyPipe {
      }
    `);

    runMigration();
    expect(tree.readContent('/index.ts'))
        .toContain('import { Pipe, Injectable, NgModule } from \'@angular/core\'');
  });

  it('should do nothing if the pipe is marked as injectable already', () => {
    const source = `
      import { Injectable, Pipe } from '@angular/core';

      @Injectable()
      @Pipe()
      export class MyPipe {
      }
    `;

    writeFile('/index.ts', source);
    runMigration();
    expect(tree.readContent('/index.ts')).toBe(source);
  });

  it('should not add @Injectable if @Pipe was not imported from @angular/core', () => {
    const source = `
      import { Pipe } from '@not-angular/core';

      @Pipe()
      export class MyPipe {
      }
    `;

    writeFile('/index.ts', source);
    runMigration();
    expect(tree.readContent('/index.ts')).toBe(source);
  });

  function writeFile(filePath: string, contents: string) {
    host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
  }

  function runMigration() { runner.runSchematic('migration-v8-injectable-pipe', {}, tree); }
});
