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
  /**
   * 当前评论页码
   */
  private currentCommentsIndex = 1;
  hideBack = true;
  backLink = `/posts`;
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

  private getPostDetail() {
    this.post.getPostDetail(this.currentId)
      .subscribe((data) => {
        this.detail = data.data;
        this.backLink = this.detail ? `/posts;theme=${this.detail.theme}` : `/posts`;
      });
  }

  /**
   * 点赞
   */
  like() {
    if (this.detail.isLiked) {
      return;
    }
    this.post.like(this.currentId)
      .subscribe(() => {
        this.detail.likes++;
        this.detail.isLiked = true;
      });
  }

  /**
   * 获取更多评论
   */
  getMoreComments() {
    this.detail.hasMoreComments = false;
    this.post.getMoreComments(this.currentId, ++this.currentCommentsIndex)
      .subscribe((data) => {
        const comments = data.data;
        if (comments.length > 0) {
          this.detail.hasMoreComments = true;
        }
        this.detail.comments.push(...comments);
      });
  }
}
