import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsLoginGuard } from '../route-guards/is-login.guard';

import { ThemesListComponent } from './themes-list/themes-list.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';
import { ThemeNewComponent } from './theme-new/theme-new.component';

const themeRoutes: Routes = [
  { path: 'list', redirectTo: '/themes' },
  { path: 'new', component: ThemeNewComponent, canActivate: [IsLoginGuard] },
  { path: ':id', component: ThemeDetailComponent },
  { path: '', component: ThemesListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forChild(themeRoutes)],
  exports: [RouterModule]
})
export class ThemesRoutingModule { }
