/**
 * 用户信息和账号的服务
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  readonly USER_COOKIE_KEY = '';
  readonly USER_KEY = '5067f78f-abb5-431f-b764-c26bcc3275ca';

  constructor() { }

  /**
   * 
   * 返回登录的用户名
   */
  getLoggedUserName(): string {
    const userName = localStorage.getItem(this.USER_KEY);
    if (userName) {
      return userName;
    }
    return '';
  }
}
