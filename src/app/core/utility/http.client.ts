import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from './../config/app.config';

//This is a http client configuration file, in this file we added get/post method and also set header in the client request.

@Injectable()
export class HttpClient {

  constructor(
    private http: Http,
    private router: Router,
    private config: AppConfig
  ) { }

  //Set header request
  createAuthorizationHeader(headers: Headers) {
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    headers.append('Content-Type', 'application/json; charset=utf-8"');
    headers.append('Accept', 'application/json; charset=utf-8"');
    headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Authorization', 'bearer ' + this.storage.get('erSuperAdminUserAuthToken'));
  }

  //Call get method from http client
  get(url: any, data: any, fullUrl?: any) {
    fullUrl = false;
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options: any = {
      headers: headers
    };
    let params: URLSearchParams = new URLSearchParams();
    Object.keys(data).map(function (key, index) {
      if (data[key] != '') {
        params.set(key, data[key]);
      }
    });
    options['search'] = params;
    let reqUrl = (fullUrl) ? url : this.config.apiUrl + url;
    return this.http.get(reqUrl, options)
  }

  //Call post method from http client
  post(url: any, data: any, fullUrl?: any) {
    fullUrl = fullUrl || false;
    let headers: any = new Headers();
    this.createAuthorizationHeader(headers);
    let reqUrl = (fullUrl) ? url : this.config.apiUrl + url;
    // let options: any = {
    //   headers: headers
    // };
    let options: any = new RequestOptions({ headers: headers });
    return this.http.post(reqUrl, data, options);
  }

  extractData(res: any) {
    let body = res.json();
    return body.data || {};
  }

  handleError(error: any) {
    let errMsg: string = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}