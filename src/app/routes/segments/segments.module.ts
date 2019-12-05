import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegmentsRoutingModule } from './segments-routing.module';
import { SegmentsListComponent } from './segments-list/segments-list.component';


@NgModule({
  declarations: [SegmentsListComponent],
  imports: [
    CommonModule,
    SegmentsRoutingModule
  ]
})
export class SegmentsModule { }
