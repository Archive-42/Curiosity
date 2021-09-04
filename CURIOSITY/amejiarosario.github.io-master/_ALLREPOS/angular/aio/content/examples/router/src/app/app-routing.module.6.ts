// #docplaster
// #docregion, preload-v1
import { NgModule }     from '@angular/core';
import {
  RouterModule, Routes,
// #enddocregion preload-v1
  PreloadAllModules
// #docregion preload-v1
} from '@angular/router';

import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent }   from './page-not-found/page-not-found.component';

import { AuthGuard }               from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule'
  },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    // #docregion forRoot
    RouterModule.forRoot(
      appRoutes,
      // #enddocregion preload-v1
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules
      }
      // #docregion preload-v1
    )
    // #enddocregion forRoot
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
