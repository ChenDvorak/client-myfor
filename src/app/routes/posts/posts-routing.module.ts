import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostNewComponent } from './post-new/post-new.component';

const postRoutes: Routes = [
  { path: 'list', redirectTo: '/posts' },
  { path: 'new', component: PostNewComponent },
  { path: ':id', component: PostDetailComponent },
  { path: '', component: PostsListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
