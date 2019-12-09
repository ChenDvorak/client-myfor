import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';
import { ThemesService, NewThemeInfo } from '../../../services/themes.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-theme-new',
  templateUrl: './theme-new.component.html',
  styleUrls: ['./theme-new.component.css']
})
export class ThemeNewComponent implements OnInit {

  themeForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private theme: ThemesService,
    private account: AccountsService,
    private snack: MfSnackBarService
  ) { }

  /**
   * 主题名是否有效
   */
  get isNameInvalid() {
    return this.themeForm.get('name').dirty && this.themeForm.get('name').invalid;
  }
  /**
   * 主题描述是否有效
   */
  get isDescriptionInvalid() {
    return this.themeForm.get('description').dirty && this.themeForm.get('description').invalid;
  }

  ngOnInit() {
  }

  createTheme() {
    if (!this.account.isLogged) {
      this.snack.open('要重新登录呀');
      return;
    }

    if (this.themeForm.get('name').invalid) {
      this.snack.open('我的天呐, 要写上主题名呀');
      document.getElementById('txt_name').focus();
      return;
    }
    if (this.themeForm.get('description').invalid) {
      this.snack.open('主题描述是要写的');
      document.getElementById('txt_description').focus();
      return;
    }

    const info: NewThemeInfo = {
      name: this.themeForm.get('name').value,
      description: this.themeForm.get('description').value
    };

    this.theme.createTheme(info)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('创建失败, 再试下');
        } else {
          this.router.navigate(['themes']);
          this.snack.open('创建成功, 待审核');
        }
      });
  }
}
