import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../services/accounts.service';
import { MfShadeService } from '../services/MFStyle/mf-shade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged = false;
  userName = '';

  constructor(
    private account: AccountsService,
    private shade: MfShadeService
  ) {}

  ngOnInit() {
    this.userName = this.account.getLoggedUserName();
    this.isLogged = this.account.isLogged();
  }

  /**
   * 登出
   */
  logout() {
    this.shade.open();
    this.account.logout();
    location.reload();
  }
}
