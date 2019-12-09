import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MfSnackBarService } from '../services/MFStyle/mf-snack-bar.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

    constructor(
        private snack: MfSnackBarService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    switch (err.status) {
                        case 401: {
                            this.snack.open('要重新登录');
                        }
                                  break;
                    }
                    return throwError(err.status);
                })
            );
    }
}
