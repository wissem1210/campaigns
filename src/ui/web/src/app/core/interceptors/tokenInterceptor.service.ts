import { HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

        if (request.url.includes('login')) {
            return next.handle(request)
        } else {
            return next.handle(this.addTokenToRequest(request, this.auth.Token))
                .pipe(
                    catchError(err => {
                        if (err instanceof HttpErrorResponse) {
                            switch ((<HttpErrorResponse>err).status) {
                                case 401:
                                    return this.handle401Error(request, next);
                                case 400:
                                    return <any>this.auth.logout();
                            }
                        } else {
                            return throwError(err);
                        }
                    }));
        }
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: token } });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.auth.refreshToken()
                .pipe(
                    switchMap((token) => {
                        if (token) {
                            this.tokenSubject.next(token);
                            localStorage.setItem('access_token', token);
                            return next.handle(this.addTokenToRequest(request, token));
                        }

                        return <any>this.auth.logout();
                    }),
                    catchError(err => {
                        return <any>this.auth.logout();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                );
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject
                .pipe(filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addTokenToRequest(request, token));
                    }));
        }
    }

}