import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, debounceTime } from 'rxjs/operators';

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
  postsCount: number;
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
    const url = `assets/mocks/home-page-themes.json`;
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
}
