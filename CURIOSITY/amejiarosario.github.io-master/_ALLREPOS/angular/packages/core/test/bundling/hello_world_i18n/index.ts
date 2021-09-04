/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, NgModule, ɵi18nConfigureLocalize, ɵrenderComponent as renderComponent} from '@angular/core';

const translations = {
  'Hello World!': 'Bonjour Monde!',
  'Hello Title!': 'Bonjour Titre!',
};

ɵi18nConfigureLocalize({translations});

@Component({
  selector: 'hello-world',
  template: `<div i18n i18n-title title="Hello Title!">Hello World!</div>`
})
export class HelloWorld {
}
// TODO(misko): Forgetting to export HelloWorld and not having NgModule fails silently.

@NgModule({declarations: [HelloWorld]})
export class INeedToExistEvenThoughIAmNotNeeded {
}
// TODO(misko): Package should not be required to make this work.

renderComponent(HelloWorld);
