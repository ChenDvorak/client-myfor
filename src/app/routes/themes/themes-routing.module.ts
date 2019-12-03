import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemesListComponent } from './themes-list/themes-list.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';

const themeRoutes: Routes = [
  { path: 'list', redirectTo: '/themes' },
  { path: ':id', component: ThemeDetailComponent },
  { path: '', component: ThemesListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forChild(themeRoutes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
