import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, debounceTime } from 'rxjs/operators';

import { BaseService, Result, Comment, Paginator } from './common';

export interface HomePageSegmentItem {
  id: number;
  content: string;
  likes: number;
}

export interface SegmentItem {
  id: number;
  nickName: string;
  content: string;
  likes: number;
  date: string;
}

/**
 * 新段子
 */
export interface NewSegment {
  nickName: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class SegmentsService {

  constructor(
    private base: BaseService,
    private http: HttpClient
  ) { }

  getHomePageSegments(): Observable<Result<HomePageSegmentItem[]>> {
    // const url = `assets/mocks/home-page-segments.json`;
    const url = `client/api/segments/home`;
    return this.http.get<Result<HomePageSegmentItem[]>>(url)
      .pipe(
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 获取段子分页
   * @param index 当前页码
   * @param rows 行数
   */
  getSegments(index: number, rows: number, order: string): Observable<Result<Paginator<SegmentItem>>> {
    // const url = `assets/mocks/segments.json`;
    const param = new HttpParams()
      .set('index', index.toString())
      .set('rows', rows.toString())
      .set('order', order);

    const url = `client/api/segments?${param.toString()}`;
    return this.http.get<Result<Paginator<SegmentItem>>>(url)
      .pipe(
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 新段子
   */
  newSegment(info: NewSegment): Observable<Result> {
    const form = new FormData();
    form.set('content', info.content);
    form.set('nickName', info.nickName);

    const url = `client/api/segments`;
    return this.http.post<Result>(url, form)
      .pipe(
        debounceTime(500),
        catchError(this.base.handleError)
      );
  }

  liked(id: number): Observable<Result> {
    const url = `client/api/segments/liked/${id}`;

    return this.http.patch<Result>(url, '')
      .pipe(
        retry(1),
        debounceTime(500),
        catchError(this.base.handleError)
      );
  }
}
