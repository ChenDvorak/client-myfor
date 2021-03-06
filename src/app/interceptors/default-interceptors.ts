import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AccountsService } from '../services/accounts.service';
import { FAULT } from '../services/common';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

    constructor(
        private account: AccountsService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                mergeMap((resp) => {
                    if (resp instanceof HttpResponse) {
                        if (!resp.body) {
                            resp.body.message = '响应有误';
                            resp.body.data = FAULT;
                        }
                        resp.body.isFault = false;

                        switch (resp.status) {
                            //  正常请求成功
                            case 200: {
                                resp.body.isFault = false;
                                return of(resp);
                            }
                            //  请求成功, 但服务器处理失败
                            case 202: {
                                resp.body.data = FAULT;
                                resp.body.isFault = true;
                                return of(resp);
                            }
                            case 401: {
                                resp.body.message = '请重新登录';
                                resp.body.isFault = true;
                                return of(resp);
                            }
                            default: return of(resp);
                        }
                    }
                    return of(resp);
                }),
                catchError((err: HttpErrorResponse) => {
                    // console.error(err);
                    switch (err.status) {
                        case 401: { localStorage.removeItem(this.account.USER_KEY); } break;
                        default: return throwError(err);
                    }
                })
            );
    }
}
