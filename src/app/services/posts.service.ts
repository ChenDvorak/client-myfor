import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, debounceTime } from 'rxjs/operators';

import { Result, BaseService, Paginator, Comment } from './common';

/**
 * 发布失败的信息
 */
export const PUBLISH_FAULT_MESSAGE = [
  '发布失败乃兵家常事, 请大侠重新来过',
  '发布失败, 再试试',
  '居然发布失败了, 你手屎里开过光吧',
  '我只是个机器人, 怎么告诉你发布失败了'
];

export interface HomePagePostItem {
  id: number;
  name: string;
  likes: number;
  comments: number;
}

export interface PostItem {
  id: number;
  title: string;
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

export interface NewPost {
  title: string;
  theme: string;
  content: string;
  files: KeyValue<string, any>[];
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
   * 随便获取一个失败信息
   */
  getFaultMessageOfRandom() {
    const rand = Math.floor(Math.random() * PUBLISH_FAULT_MESSAGE.length );
    const msg = PUBLISH_FAULT_MESSAGE[rand];
    return msg;
  }

  /**
   * 获取主页帖子列表
   */
  getHomePagePosts(): Observable<Result<HomePagePostItem[]>> {
    // const url = `assets/mocks/home-page-posts.json`;
    const url = `client/api/posts/home`;
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

    // const url = `assets/mocks/posts.json`;
    const url = `client/api/posts?${params.toString()}`;
    return this.http.get<Result<Paginator<PostItem>>>(url)
        .pipe(
          debounceTime(500),
          retry(2),
          catchError(this.base.handleError)
        );
  }

  // /**
  //  * 获取自己的帖子
  //  */
  // getPostsFromSelf(index: number, rows: number, search: string) {
  //   const params = new HttpParams()
  //     .set('index', index.toString())
  //     .set('rows', rows.toString());
  //   if (search) {
  //       params.set('search', search);
  //   }

  //   const url = `assets/mocks/posts.json`;
  //   return this.http.get<Result<Paginator<PostItem>>>(url)
  //       .pipe(
  //         debounceTime(500),
  //         retry(2),
  //         catchError(this.base.handleError)
  //       );
  // }

  /**
   * 获取帖子详情
   * @param id ID
   */
  getPostDetail(id: number): Observable<Result<PostDetail>> {
    // const url = `assets/mocks/post.json`;
    const url = `client/api/posts/${id}`;
    return this.http.get<Result<PostDetail>>(url)
      .pipe(
        debounceTime(500),
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 发新帖
   * @param info 帖子信息
   */
  newPost(info: NewPost): Observable<Result> {
    const url = `client/api/posts`;
    console.log(url);
    const newPostForm = new FormData();
    newPostForm.set('title', info.title);
    newPostForm.set('content', info.content);
    newPostForm.set('theme', info.theme);
    info.files.forEach(file => {
      newPostForm.set(file.key, file.value);
    });

    return this.http.post<Result>(url, newPostForm)
      .pipe(
        debounceTime(500),
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
