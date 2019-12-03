import { Component, OnInit } from '@angular/core';
import { ThemesService, HomePageThemeItem } from '../../../services/themes.service';
import { PostsService, HomePagePostItem } from '../../../services/posts.service';
import { SegmentsService, HomePageSegmentItem } from '../../../services/segments.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  themes: HomePageThemeItem[] = [];
  posts: HomePagePostItem[] = [];
  segments: HomePageSegmentItem[] = [];

  constructor(
    private theme: ThemesService,
    private post: PostsService,
    private segment: SegmentsService
  ) { }

  ngOnInit() {
    this.getThemes();
    this.getPosts();
    this.getSegments();
  }

  private getThemes() {
    this.theme.getHomePageThemes()
      .subscribe((data) => {
        this.themes = data.data;
      });
  }

  private getPosts() {
    this.post.getHomePagePosts()
      .subscribe((data) => {
        this.posts = data.data;
      });
  }

  private getSegments() {
    this.segment.getHomePageSegments()
      .subscribe((data) => {
        this.segments = data.data;
      });
  }
}
