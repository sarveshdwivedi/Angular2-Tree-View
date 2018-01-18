import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

//In this config file, we are managing api url, status code and validation regular expression constant.

@Injectable()
export class AppConfig { //Config file to manage base url , status code, valdiation patterns.
    withoutLoginUrls: any = ['login'];
    apiUrl: any = (window.location.hostname == 'localhost') ? "http://localhost:3000/" : "http://localhost:3000/";
    perPageDefault: any = 5;
    perPageArray: any = [5, 10, 20, 30, 40, 50];
    MOMENT_DATE_TIME_FORMAT: any = 'YYYY-MM-DD HH:mm:ss';
    statusCode: any = {
        'success': 200,
        'error': 201,
        'emailOtp':202,
        'authErr': 203,
        'accessErr': 204,        
        'emailOtpError':205
    };
    pattern: any = {
        'NAME': /^[a-zA-Z . \-\']*$/,
        'CMPNAME': /^[a-zA-Z0-9 ]*$/,
        'AMOUNT': /^[0-9]/,
        'USERNAME': /^[a-zA-Z0-9]*$/,
        'ROLENAME':/^[a-zA-Z\_\- ]*$/,
        "CITY": /^[a-zA-Z . \-\']*$/,
        "EMAIL": /^[a-zA-Z0-9]+[a-zA-Z0-9]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
        "POSTAL_CODE": /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        "PASSWORD": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/,
        "PHONE": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "DESCRIPT": /^[a-zA-Z\.\' ]*$/,        
        "PHONE_NO_MASK": ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "CARD_NO_MASK": [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "CVV_NO_MASK": [/\d/, /\d/, /\d/],
    };
}