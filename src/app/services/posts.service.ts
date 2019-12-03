import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Result, BaseService } from './common';

export interface HomePagePostItem {
  id: number;
  name: string;
  likes: number;
  comments: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private base: BaseService,
    private http: HttpClient
  ) { }

  /**
   * 获取主页帖子列表
   */
  getHomePagePosts(): Observable<Result<HomePagePostItem[]>> {
    const url = `assets/mocks/home-page-posts.json`;
    return this.http.get<Result<HomePagePostItem[]>>(url)
      .pipe(
        retry(2),
        catchError(this.base.handleError)
      );
  }
}
