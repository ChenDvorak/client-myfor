import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged = false;
  userName = '';

  constructor(
    private account: AccountsService
  ) {}

  ngOnInit() {
    this.userName = this.account.getLoggedUserName();
    this.isLogged = this.userName ? true : false;
  }
}
