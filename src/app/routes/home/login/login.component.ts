import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AccountsService, LoginInfo, RegisterInfo } from '../../../services/accounts.service';
import { FAULT, Result } from '../../../services/common';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';

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
  // tslint:disable-next-line: variable-name
  private register_Disabled = false;
  /**
   * 注册按钮是否禁用
   */
  get registerDisabled() {
    return this.register_Disabled ||
    this.registerForm.get('account').invalid ||
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
    // private router: Router,
    private snack: MfSnackBarService
  ) { }

  ngOnInit() {
  }

  /**
   * 登录
   */
  login() {
    if (this.loginForm.invalid) {
      this.snack.open('登录参数有误');
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
          this.snack.open('登录失败', 3000);
          this.loginText = '登录';
        } else {
          //  将登录后的用户名存在 KEY 为 {USER_KEY} 的 localStorage 中
          localStorage.setItem(this.account.USER_KEY, data.data);
          location.href = '/';
        }
      });
  }

  /**
   * 注册
   */
  register() {
    if (this.registerForm.get('account').invalid || this.registerConfirmPasswordInvalid) {
      this.snack.open('注册账号参数有误');
      return;
    }

    this.registerText = `注册中...`;
    this.register_Disabled = true;

    const registerInfo: RegisterInfo = {
      account: this.registerForm.get('account').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value
    };
    this.account.register(registerInfo)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('注册失败, 请重试');
        } else {
          this.snack.open('注册成功');
        }
        this.registerText = `注册`;
        timer(2000).subscribe(() => {
          this.register_Disabled = false;
        });
      });
  }
}
