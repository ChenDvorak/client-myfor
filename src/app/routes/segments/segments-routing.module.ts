import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentsListComponent } from './segments-list/segments-list.component';

const segmentRoutes: Routes = [
  { path: '', component: SegmentsListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forChild(segmentRoutes)],
  exports: [RouterModule]
})
export class SegmentsRoutingModule { }
