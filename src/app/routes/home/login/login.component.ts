import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountsService, LoginInfo, RegisterInfo } from '../../../services/accounts.service';
import { FAULT } from '../../../services/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginText = '登录';
  /**
   * 登录按钮是否禁用
   */
  get loginDisabled() {
    return this.loginForm.get('account').invalid || this.loginForm.get('password').invalid;
  }
  get loginAccountInvalid() {
    return this.loginForm.get('account').dirty && this.loginForm.get('account').invalid;
  }
  get loginPasswordInvalid() {
    return this.loginForm.get('password').dirty && this.loginForm.get('password').invalid;
  }

  registerText = '注册';
  /**
   * 注册按钮是否禁用
   */
  get registerDisabled() {
    return this.registerForm.get('account').invalid ||
    this.registerForm.get('password').invalid ||
    this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value;
  }
  get registerAccountInvalid() {
    return this.registerForm.get('account').dirty && this.registerForm.get('account').invalid;
  }
  get registerPasswordInvalid() {
    return this.registerForm.get('password').dirty && this.registerForm.get('password').invalid;
  }
  get registerConfirmPasswordInvalid() {
    return this.registerForm.get('confirmPassword').dirty && (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value);
  }

  loginForm = this.fb.group({
    account: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    account: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private account: AccountsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      alert('登录参数有误');
      return;
    }

    this.loginText = `登陆中...`;
    const info: LoginInfo = {
      account: this.loginForm.get('account').value,
      password: this.loginForm.get('password').value
    };
    this.account.login(info)
      .subscribe((data) => {
        if (data.data === FAULT) {
          alert('登录失败');
          this.loginText = '登录';
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  register() {
    this.registerText = `注册中...`;
  }
}
