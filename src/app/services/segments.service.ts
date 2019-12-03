import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { BaseService, Result } from './common';

export interface HomePageSegmentItem {
  id: number;
  content: string;
  likes: number;
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
    const url = `assets/mocks/home-page-segments.json`;
    return this.http.get<Result<HomePageSegmentItem[]>>(url)
      .pipe(
        retry(2),
        catchError(this.base.handleError)
      );
  }
}