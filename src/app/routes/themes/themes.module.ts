import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../share/share.module';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';


@NgModule({
  declarations: [ThemesListComponent, ThemeDetailComponent],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    ShareModule
  ]
})
export class ThemesModule { }
