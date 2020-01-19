import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        @Inject('API_URL')
        private baseUrl: string,
        private http: HttpClient,
        private router: Router
    ) { }

    login(user) {
        return this.http.post<any>(`${this.baseUrl}login`, user)
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }

    get Token() {
        return localStorage.getItem("access_token");
    }

    get IsLoggedIn(): boolean {
        return localStorage.getItem('access_token') !== null
    }

    refreshToken(): Observable<any> {
        const token = localStorage.getItem('access_token')

        return this.http.post<any>(`${this.baseUrl}/Token/Refresh`, { 'token': token })
            .pipe(
                map(user => {
                    if (user) {
                        localStorage.setItem('access_token', JSON.stringify(user.token));
                    }

                    return user;
                })
            );
    }


}

