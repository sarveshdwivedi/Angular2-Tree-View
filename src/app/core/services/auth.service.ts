import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '../utility/http.client';
import { AppConfig } from "../config/app.config";

@Injectable()
export class AuthService {
    redirectUrl: string;
    isLoggedIn = false;

    constructor(
        private http: HttpClient,
        private config: AppConfig
    ) { }

    // Login method to call backend login api for agent login
    logging(data: any): Observable<any> {
        return this.http.post('_search', data).map((res: any) => {
            let body = res.json();
            return { twoStape: false, auth: true, data: body };
        });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
