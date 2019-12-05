import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, debounceTime } from 'rxjs/operators';

import { Result, BaseService, Paginator, Comment } from './common';

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

export interface PostDetail {
  title: string;
  theme: string;
  content: string;
  creator: string;
  createDate: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  hasMoreComments: boolean;
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
   * 参数: theme 帖子的主题名, 不传的话就获取所有主题的帖子
   */
  getPosts(index: number, rows: number, search: string, theme: string): Observable<Result<Paginator<PostItem>>> {
    const params = new HttpParams()
      .set('index', index.toString())
      .set('rows', rows.toString());

    if (search) {
        params.set('search', search);
    }
    if (theme) {
      params.set('theme', theme);
    }

    const url = `assets/mocks/posts.json`;
      // const url = `client/api/posts?${params.toString()}`;
    return this.http.get<Result<Paginator<PostItem>>>(url)
        .pipe(
          debounceTime(500),
          retry(2),
          catchError(this.base.handleError)
        );
  }

  /**
   * 获取帖子详情
   * @param id ID
   */
  getPostDetail(id: number): Observable<Result<PostDetail>> {
    const url = `assets/mocks/post.json`;
    // const url = `client/api/posts/${1}`;
    return this.http.get<Result<PostDetail>>(url)
      .pipe(
        debounceTime(500),
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 点一个赞
   * @param id 帖子ID
   */
  like(id: number): Observable<Result> {
    const url = `client/api/posts/like?postid=${id}`;
    return this.http.post<Result>(url, '')
      .pipe(
        debounceTime(500),
        retry(1),
        catchError(this.base.handleError)
      );
  }

  /**
   * 获取帖子的评论, 固定每页20条
   * @param id 帖子ID
   * @param index 第几页评论
   */
  getMoreComments(id: number, index: number): Observable<Result<Comment[]>> {
    const params = new HttpParams()
      .set('postid', id.toString())
      .set('index', index.toString());
    const url = `client/api/posts/comments?${params.toString()}`;
    return this.http.get<Result<Comment[]>>(url)
      .pipe(
        debounceTime(500),
        retry(1),
        catchError(this.base.handleError)
      );
  }
}
