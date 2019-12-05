import { NgModule } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { CommonModule } from '@angular/common';
import { BackComponent } from './back/back.component';

const COMPONENTS = [
  BackComponent
];

const EXPORT_MODULE = [
  NzGridModule,
  NzPaginationModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...EXPORT_MODULE
  ],
  exports: [
    ...COMPONENTS,
    ...EXPORT_MODULE
  ]
})
export class ShareModule { }
