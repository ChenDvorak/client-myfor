import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AccountsService } from '../../services/accounts.service';
import { MfSnackBarService } from '../../services/MFStyle/mf-snack-bar.service';

/**
 * 用户未登录的话就导航到登录页
 */
@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private account: AccountsService,
    private snack: MfSnackBarService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.account.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.snack.open('需要登录', 3000);
      return false;
    }
  }

}
