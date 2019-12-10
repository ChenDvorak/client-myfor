import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

import { BaseService, Result, Paginator } from './common';

/**
 * 首页单项主题
 */
export interface HomePageThemeItem {
  id: number;
  name: string;
  postsCount: number;
}

/**
 * 主题单项
 */
export interface ThemeItem {
  id: number;
  name: string;
  master: string;
  createDate: string;
  postsCount: number;
}

/**
 * 主题详情
 */
export interface ThemeDetail {
  name: string;
  description: string;
  master: string;
  postsCount: number;
  creator: string;
  createDate: string;
}

/**
 * 新主题
 */
export interface NewThemeInfo {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor(
    private base: BaseService,
    private http: HttpClient
  ) { }

  /**
   * 获取首页的主题列表
   */
  getHomePageThemes(): Observable<Result<HomePageThemeItem[]>> {
    // const url = `assets/mocks/home-page-themes.json`;
    const url = `client/api/themes/home`;
    return this.http.get<Result<HomePageThemeItem[]>>(url)
      .pipe(
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 获取主题列表
   */
  getThemes(index: number, rows: number, search: string): Observable<Result<Paginator<ThemeItem>>> {
    const params = new HttpParams()
      .set('index', index.toString())
      .set('rows', rows.toString());

    if (search) {
        params.set('search', search);
      }

    const url = `assets/mocks/themes.json`;
      // const url = `client/api/themes?${params.toString()}`;
    return this.http.get<Result<Paginator<ThemeItem>>>(url)
        .pipe(
          debounceTime(500),
          retry(2),
          catchError(this.base.handleError)
        );
  }

  /**
   * 获取主题详情
   * @param id 详情 ID
   */
  getThemeDetail(id: number): Observable<Result<ThemeDetail>> {
    const url = `assets/mocks/theme.json`;
    return this.http.get<Result<ThemeDetail>>(url)
      .pipe(
        debounceTime(500),
        retry(2),
        catchError(this.base.handleError)
      );
  }

  /**
   * 获取主题的提示建议
   * @param segment 字段
   */
  getThemeNameTypeAhead(segment: string): Observable<string> {
    if (segment.trim() === '') {
      return of();
    }
    const url = `assets/mocks/theme-type-ahead.json`;
    return this.http.get<Result<string>>(url)
      .pipe(
        map(s => s.data),
        debounceTime(500),
        distinctUntilChanged()
      );
  }

  /**
   * 创建一个新主题, 需要登录
   */
  createTheme(info: NewThemeInfo): Observable<Result> {
    const url = `client/api/themes`;
    return this.http.post<Result>(url, info)
      .pipe(
        debounceTime(500),
        catchError(this.base.handleError)
      );
  }
}
