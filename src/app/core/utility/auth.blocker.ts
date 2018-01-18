import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app.config';
import { TmpStorage } from '../utility/temp.storage';
import { HttpClient } from '../utility/http.client';

import { AuthService } from '../services/auth.service';

//This is a common component to call back-end checkLogin api and get user current login status like user logged in or logged out.

@Injectable()
export class AuthBlocker implements Resolve<any> {

    constructor(
        private http: HttpClient,
        private location: Location,
        private router: Router,
        private auth: AuthService,
        private config: AppConfig,
        private tmpStorage: TmpStorage
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let tmpStorage = this.tmpStorage;
        let rout = this.router;
        let conf = this.config;
        let ath = this.auth;
        let currentUrl = route.url.map(function (u) { return u.path; });
        let currentPath = this.location.path();

        //Call backend api and check user login status
        return this.http.get('/user/checklogin', {}).map((res: any) => {
            let body = res.json();
            if (body.status == this.config.statusCode.authErr) {
                ath.logout();
                if (conf.withoutLoginUrls.indexOf(currentUrl[0]) < 0) {
                    let splCP = currentPath.substring(1);
                    if(splCP != ''){
                        tmpStorage.set('redirectUrl', splCP);
                    }
                    rout.navigate(['login']);
                    return false;
                } else {
                    return true;
                }
            } else {
                ath.isLoggedIn = true;

                if (conf.withoutLoginUrls.indexOf(currentUrl[0]) >= 0) {
                    rout.navigate(['dashboard']);
                    return false;
                } else {
                    return true;
                }
            }
        });
    }
}