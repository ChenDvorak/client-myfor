import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../share/share.module';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [

  PostsListComponent,

  PostDetailComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ShareModule
  ]
})
export class PostsModule { }
