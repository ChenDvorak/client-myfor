import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MfSnackBarService } from '../services/MFStyle/mf-snack-bar.service';

export interface Paginator < T = any > {
  index: number;
  rows: number;
  totalRows: number;
  totalPages: number;
  list: T[];
}

export class Result < T = any > {
  message: string;
  data: T;
  /**
   * 是否为失败请求
   */
  get isFault(): boolean {
    return this.data === FAULT;
  }
}
/**
 * 评论
 */
export interface Comment {
  id: number;
  nickName: string;
  date: string;
  comment: string;
}

/**
 * 请求失败, 可以和 Result 的 data 对比
 */
export const FAULT = undefined;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private snack: MfSnackBarService) { }

  /**
   * 经过拦截器, 进入到这里的 error 只会是状态码
   * @param error 异常状态码
   */
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
    // return an observable with a user-facing error message
    // return throwError(
    //     'Something bad happened; please try again later.');

    const result: Result = new Result();
    result.message = '';
    result.data = FAULT;

    switch (error.status) {
      case 401: { result.message = '请重新登录'; } break;
      default: { result.message = '请求失败, 稍后重试'; } break;
    }

    // const result: Result = new Result();
    // result.message = '请求失败';
    // result.data = FAULT;

    return of(result);
  }
}
