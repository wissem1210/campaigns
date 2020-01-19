import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class CampaignService{
    constructor(
        @Inject('API_URL')
        private baseUrl: string,
        private http: HttpClient
    ){}

    get(){
        return this.http.get<any>(`${this.baseUrl}campaings`)
    }

    search(term, page, perPage){
        return this.http.get<any>(`${this.baseUrl}search?term=${term}&page=${page}&perPage=${perPage}`)
    }

}