import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '404', component: Page404Component },
  { path: '', component: Page404Component, pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
