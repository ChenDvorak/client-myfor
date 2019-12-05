import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private post: PostsService,
    private route: ActivatedRoute,
    private router: Router
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
        this.posts = data.data.list;
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
