import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MfSnackBarService } from '../services/MFStyle/mf-snack-bar.service';
import { catchError } from 'rxjs/operators';

import { AccountsService } from '../services/accounts.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

    constructor(
        private snack: MfSnackBarService,
        private account: AccountsService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                // catchError((err: HttpErrorResponse) => {
                //     console.error(err.error);
                //     switch (err.status) {
                //         // case 401: {
                //         //     this.snack.open(`要重新登录`, 5000);
                //         //     localStorage.removeItem(this.account.USER_KEY);
                //         // }
                //         //           break;
                //         default: return throwError(err);
                //     }
                // })
            );
    }
}
