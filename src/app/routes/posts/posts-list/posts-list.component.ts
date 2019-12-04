import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

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
    this.getPosts(index, search);

    this.listHeight = window.innerHeight * 0.8 + 'px';
  }

  private getPosts(index: number, search: string) {
    this.post.getPosts(index, 20, search)
      .subscribe((data) => {
        this.posts = data.data.list;
      });
  }

  searchPosts(search: string) {

  }
}
