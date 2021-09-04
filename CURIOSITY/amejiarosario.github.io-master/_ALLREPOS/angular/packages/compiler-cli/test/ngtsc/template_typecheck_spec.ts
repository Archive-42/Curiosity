/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {NgtscTestEnvironment} from './env';

function setupCommon(env: NgtscTestEnvironment): void {
  env.write('node_modules/@angular/common/index.d.ts', `
import * as i0 from '@angular/core';

export declare class NgForOfContext<T> {
  $implicit: T;
  ngForOf: T[];
  index: number;
  count: number;
  readonly first: boolean;
  readonly last: boolean;
  readonly even: boolean;
  readonly odd: boolean;
}

export declare class IndexPipe {
  transform<T>(value: T[], index: number): T;

  static ngPipeDef: i0.ɵPipeDefWithMeta<IndexPipe, 'index'>;
}

export declare class NgForOf<T> {
  ngForOf: T[];
  static ngTemplateContextGuard<T>(dir: NgForOf<T>, ctx: any): ctx is NgForOfContext<T>;
  static ngDirectiveDef: i0.ɵɵDirectiveDefWithMeta<NgForOf<any>, '[ngFor][ngForOf]', never, {'ngForOf': 'ngForOf'}, {}, never>;
}

export declare class NgIf {
  ngIf: any;
  static ngTemplateGuard_ngIf<E>(dir: NgIf, expr: E): expr is NonNullable<E>
  static ngDirectiveDef: i0.ɵɵDirectiveDefWithMeta<NgForOf<any>, '[ngIf]', never, {'ngIf': 'ngIf'}, {}, never>;
}

export declare class CommonModule {
  static ngModuleDef: i0.ɵɵNgModuleDefWithMeta<CommonModule, [typeof NgIf, typeof NgForOf, typeof IndexPipe], never, [typeof NgIf, typeof NgForOf, typeof IndexPipe]>;
}
`);
}

describe('ngtsc type checking', () => {
  let env !: NgtscTestEnvironment;

  beforeEach(() => {
    env = NgtscTestEnvironment.setup();
    env.tsconfig({fullTemplateTypeCheck: true});
    setupCommon(env);
  });

  it('should check a simple component', () => {
    env.write('test.ts', `
    import {Component, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: 'I am a simple template with no type info',
    })
    class TestCmp {}

    @NgModule({
      declarations: [TestCmp],
    })
    class Module {}
    `);

    env.driveMain();
  });

  it('should check basic usage of NgIf', () => {
    env.write('test.ts', `
    import {CommonModule} from '@angular/common';
    import {Component, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: '<div *ngIf="user">{{user.name}}</div>',
    })
    class TestCmp {
      user: {name: string}|null;
    }

    @NgModule({
      declarations: [TestCmp],
      imports: [CommonModule],
    })
    class Module {}
    `);

    env.driveMain();
  });

  it('should check basic usage of NgFor', () => {
    env.write('test.ts', `
    import {CommonModule} from '@angular/common';
    import {Component, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: '<div *ngFor="let user of users">{{user.name}}</div>',
    })
    class TestCmp {
      users: {name: string}[];
    }

    @NgModule({
      declarations: [TestCmp],
      imports: [CommonModule],
    })
    class Module {}
    `);

    env.driveMain();
  });

  it('should report an error inside the NgFor template', () => {
    env.write('test.ts', `
    import {CommonModule} from '@angular/common';
    import {Component, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: '<div *ngFor="let user of users">{{user.does_not_exist}}</div>',
    })
    export class TestCmp {
      users: {name: string}[];
    }

    @NgModule({
      declarations: [TestCmp],
      imports: [CommonModule],
    })
    export class Module {}
    `);

    const diags = env.driveDiagnostics();
    expect(diags.length).toBe(1);
    expect(diags[0].messageText).toContain('does_not_exist');
  });

  it('should report an error with pipe bindings', () => {
    env.write('test.ts', `
    import {CommonModule} from '@angular/common';
    import {Component, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: \`
        checking the input type to the pipe:
        {{user | index: 1}}

        checking the return type of the pipe:
        {{(users | index: 1).does_not_exist}}

        checking the argument type:
        {{users | index: 'test'}}

        checking the argument count:
        {{users | index: 1:2}}
      \`
    })
    class TestCmp {
      user: {name: string};
      users: {name: string}[];
    }

    @NgModule({
      declarations: [TestCmp],
      imports: [CommonModule],
    })
    class Module {}
    `);

    const diags = env.driveDiagnostics();
    expect(diags.length).toBe(4);

    const allErrors = [
      `'does_not_exist' does not exist on type '{ name: string; }'`,
      `Expected 2 arguments, but got 3.`,
      `Argument of type '"test"' is not assignable to parameter of type 'number'`,
      `Argument of type '{ name: string; }' is not assignable to parameter of type '{}[]'`,
    ];

    for (const error of allErrors) {
      if (!diags.some(
              diag => ts.flattenDiagnosticMessageText(diag.messageText, '').indexOf(error) > -1)) {
        fail(`Expected a diagnostic message with text: ${error}`);
      }
    }
  });

  it('should constrain types using type parameter bounds', () => {
    env.write('test.ts', `
    import {CommonModule} from '@angular/common';
    import {Component, Input, NgModule} from '@angular/core';

    @Component({
      selector: 'test',
      template: '<div *ngFor="let user of users">{{user.does_not_exist}}</div>',
    })
    class TestCmp<T extends {name: string}> {
      @Input() users: T[];
    }

    @NgModule({
      declarations: [TestCmp],
      imports: [CommonModule],
    })
    class Module {}
    `);

    const diags = env.driveDiagnostics();
    expect(diags.length).toBe(1);
    expect(diags[0].messageText).toContain('does_not_exist');
  });

  it('should properly type-check inherited directives', () => {
    env.write('test.ts', `
    import {Component, Directive, Input, NgModule} from '@angular/core';

    @Directive({
      selector: '[base]',
    })
    class BaseDir {
      @Input() fromBase!: string;
    }

    @Directive({
      selector: '[child]',
    })
    class ChildDir extends BaseDir {
      @Input() fromChild!: boolean;
    }

    @Component({
      selector: 'test',
      template: '<div child [fromBase]="3" [fromChild]="4"></div>',
    })
    class TestCmp {}

    @NgModule({
      declarations: [TestCmp, ChildDir],
    })
    class Module {}
    `);

    const diags = env.driveDiagnostics();
    expect(diags.length).toBe(2);

    // Error from the binding to [fromBase].
    expect(diags[0].messageText)
        .toBe(`Type 'number' is not assignable to type 'string | undefined'.`);

    // Error from the binding to [fromChild].
    expect(diags[1].messageText)
        .toBe(`Type 'number' is not assignable to type 'boolean | undefined'.`);
  });
});
