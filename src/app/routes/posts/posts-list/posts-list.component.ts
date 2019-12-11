import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../../../services/posts.service';
import { Result } from '../../../services/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  theme = '';
  detailId = 0;
  posts: PostItem[] = [];
  listHeight = '80%';

  totalRows = 0;

  constructor(
    private post: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MfSnackBarService
    ) { }

  ngOnInit() {
    let index = 1;
    const indexParam = this.route.snapshot.paramMap.get('index');
    if (indexParam) {
      index = +indexParam;
    }
    const search = this.route.snapshot.paramMap.get('search');
    this.theme = this.route.snapshot.paramMap.get('theme');

    this.getPosts(index, search, this.theme);

    this.listHeight = window.innerHeight * 0.75 + 'px';
  }

  private getPosts(index: number, search: string, theme: string) {
    this.post.getPosts(index, 20, search, theme)
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

    let param: any;
    let themeParam = {};
    if (this.theme) {
      themeParam = {
        theme: this.theme
      };
    }

    if (search) {
      param = {
        search,
        ...themeParam
      };
    } else {
      param = {
        ...themeParam
      };
    }
    this.router.navigate(['/posts', param]);
  }

  showDetail(id: number) {
    this.detailId = id;
  }

  pageChange(index: number) {
    const newParams = {
      ...this.route.snapshot.params,
      index
    };
    this.router.navigate(['/posts', newParams]);
  }
}
