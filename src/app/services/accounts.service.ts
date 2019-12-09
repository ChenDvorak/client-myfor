/**
 * 用户信息和账号的服务
 * 不要注入其他的业务服务, 因为当前服务可能被注入
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, Result } from './common';
import { debounceTime, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * 用户登录信息
 */
export interface LoginInfo {
  account: string;
  password: string;
}

/**
 * 用户注册信息
 */
export interface RegisterInfo {
  account: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  readonly USER_KEY = '5067f78f-abb5-431f-b764-c26bcc3275ca';

  constructor(
    private base: BaseService,
    private http: HttpClient
  ) { }

  /**
   * 返回当前登录的用户名
   * 若没有登录, 返回空
   */
  getLoggedUserName(): string {
    /*
     * 登录后, 用户的登录名会放在 KEY 为 {USER_KEY} 的 localStorage 中
     * 可以直接拿来使用
     */

    const userName = localStorage.getItem(this.USER_KEY);
    if (userName) {
      return userName;
    }
    return undefined;
  }

  /**
   * 当前是否有用户登录
   */
  isLogged(): boolean {
    return this.getLoggedUserName() ? true : false;
  }

  /**
   * 用户登录
   * 登录后返回用户名
   * @param info 登录信息
   */
  login(info: LoginInfo): Observable<Result<string>> {
    const url = `assets/mocks/login.json`;
    // const url = `client/api/login`;
    return this.http.patch<Result<string>>(url, info)
      .pipe(
        debounceTime(500),
        catchError(this.base.handleError)
      );
  }

  /**
   * 登出
   */
  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * 注册新用户
   * @param info 注册信息
   */
  register(info: RegisterInfo) {
    const url = `client/api/register`;
    return this.http.post<Result>(url, info)
      .pipe(
        debounceTime(500),
        catchError(this.base.handleError)
      );
  }
}
