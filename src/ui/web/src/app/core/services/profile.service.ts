import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    /**
     *
     */
    constructor(
        @Inject('API_URL')
        private baseUrl: string,
        private http: HttpClient,
    ) {

    }


    GetProfile() {
        return this.http.get(`${this.baseUrl}me`)
    }



}