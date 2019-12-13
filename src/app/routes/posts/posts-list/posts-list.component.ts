import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../../../services/posts.service';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  index = 1;
  theme = '';
  search = '';

  detailId = 0;
  posts: PostItem[] = [];
  listHeight = window.innerHeight * 0.75 + 'px';

  totalRows = 0;

  constructor(
    private post: PostsService,
    private snack: MfSnackBarService
    ) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.post.getPosts(this.index, 20, this.search, this.theme)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('获取失败, 请重试');
        } else {
          this.totalRows = data.data.totalRows;
          this.posts = data.data.list;
        }
      });
  }

  searchPosts(search: string) {
    this.index = 1;
    if (!search) {
      return;
    }
    this.search = search;
    this.getPosts();
  }

  showDetail(id: number) {
    this.detailId = id;
  }

  pageChange(index: number) {
    this.index = index;
    this.getPosts();
  }
}
