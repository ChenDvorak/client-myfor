import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, debounceTime } from 'rxjs/operators';

import { Result, BaseService, Paginator } from './common';

export interface HomePagePostItem {
  id: number;
  name: string;
  likes: number;
  comments: number;
}

export interface PostItem {
  id: number;
  name: string;
  creator: string;
  createDate: string;
  likes: number;
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

  /**
   * 获取帖子列表
   */
  getPosts(index: number, rows: number, search: string): Observable<Result<Paginator<PostItem>>> {
    const params = new HttpParams()
      .set('index', index.toString())
      .set('rows', rows.toString());

    if (search) {
        params.set('search', search);
      }

    const url = `assets/mocks/posts.json`;
      // const url = `client/api/themes?${params.toString()}`;
    return this.http.get<Result<Paginator<PostItem>>>(url)
        .pipe(
          debounceTime(500),
          retry(2),
          catchError(this.base.handleError)
        );

  }
}
