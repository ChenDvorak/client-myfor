import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../share/share.module';

import { PagesRoutingModule } from './pages-routing.module';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    ShareModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
