import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Paginator < T = any > {
  index: number;
  rows: number;
  totalRows: number;
  totalPages: number;
  list: T[];
}

export interface Result < T = any > {
  message: string;
  data: T;
  /**
   * 是否为失败请求, 在拦截器中设置
   */
  isFault: boolean;
}
/**
 * 评论
 */
export interface Comment {
  id: number;
  nickName: string;
  date: string;
  commentContent: string;
}

/**
 * 请求失败, 可以和 Result 的 data 对比
 */
export const FAULT: undefined = undefined;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    // }
    console.error(`backend returned code ${error.status}`);
    console.error(`error: ${error.error}`);
    // return an observable with a user-facing error message
    // return throwError(
    //     'Something bad happened; please try again later.');

    const result: Result = {
      message: '请求失败, 稍后重试',
      data: FAULT,
      isFault: true
    };

    // const result: Result = new Result();
    // result.message = '请求失败';
    // result.data = FAULT;

    return of(result);
  }
}
