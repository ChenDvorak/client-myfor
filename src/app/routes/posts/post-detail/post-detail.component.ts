import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostsService, PostDetail } from '../../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  private currentId = 0;
  detail: PostDetail;
  hideBack = true;
  // tslint:disable-next-line: variable-name
  @Input() set id(_id: number) {
    if (this.currentId === _id) {
      return;
    }
    this.currentId = _id;
    this.getPostDetail();
  }

  constructor(
    private route: ActivatedRoute,
    private post: PostsService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.hideBack = false;
    } else {
      return;
    }
    this.currentId = +this.route.snapshot.paramMap.get('id');
    this.getPostDetail();
  }

  getPostDetail() {
    this.post.getPostDetail(this.currentId)
      .subscribe((data) => {
        this.detail = data.data;
      });
  }
}
