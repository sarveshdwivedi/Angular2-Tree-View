import { Component, Inject } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "app/core/services/auth.service";
import { Router } from "@angular/router";
import { ToasterService } from 'angular2-toaster';
import * as jQuery from 'jquery';
import { TreeNode } from 'primeng/primeng';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [
        AuthService,
        ToasterService
    ]
})
export class HomeComponent {
    public logging: FormGroup;
    message: string;
    private redirectUrl: any;
    private loggingData: any;
    private uniqueResponseData: any;
    private userid: any;
    private timeTaken: any;
    private shards: any;
    private listData: TreeNode[] = [];
    public loader = false;
    public loading = false;

    constructor(
        private toaster: ToasterService,
        public authService: AuthService,
        @Inject(FormBuilder) formBuilder: FormBuilder,
        public router: Router) {
        this.redirectUrl = ('/');

        this.logging = formBuilder.group({
            userid: ['', [Validators.required]]
        });
    }

    // Fecthed logging data by using elastics search api based on user id
    public loggingSubmit(logginData, formValid) {
        this.loader = true;
        let formData = this.logging.value;
        var cr = formData.userid;
        this.listData = [];
        let logginRequest = `
        {
            "size": 1000,
             "query":{ "match_phrase": {
                      "userid": "${cr}"
                      
                  }
           },
           "sort" : [
             {"@timestamp" : {"order" : "asc"}}
          ]
          }`
        
        this.authService.logging(logginRequest).subscribe((res: any) => {
            this.loader = false;
            this.userid = formData.userid;
            let responseData = res.data;

            let loggingDataArray = responseData.hits.hits;
            let useridArray = [];
            loggingDataArray.forEach(element => {
                useridArray.push(element._source.userid);
            });

            let uniqueResponseData = Array.from(new Set(useridArray));

            uniqueResponseData.map((val: any) => {
                this.listData.push({
                    "label": "User Id : " + val,
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "data": val,
                    "children": [{}]
                });
            });
        });
    }

    // Fecthed logging data by using elastics search api based on user id
    public getChild(event: any) {
        let self = this;
        if (event.node && typeof event.node.children[0].data == 'undefined') {
            this.loading = true;
            //console.log(event.node.data);
            if (event.node.data) {
                let logginRequest = `                
                  {
                    "size": 1000,
                    "query":{ "match_phrase": {
                              "userid": "${event.node.data}"
                              
                          }
                   },
                   "sort" : [
                     {"@timestamp" : {"order" : "asc"}}
                  ]
                  }       
                    `
                //console.log("logginRequest1", logginRequest);

                this.authService.logging(logginRequest).subscribe((result: any) => {
                    this.loading = false;
                    let rs = result.data;
                    let loggingDataArray = rs.hits.hits;
                    //console.log('loggingDataArray==>',loggingDataArray);
                    event.node.children = loggingDataArray.map((val: any) => {
                        let searchString = "RequestResponse";
                        let nMethod = val._source.nmethod;

                        if (nMethod.indexOf(searchString) == -1) {
                            return {
                                "label": "Method : " + val._source.nmethod,
                                "expandedIcon": "fa-folder-open yellow",
                                "collapsedIcon": "fa-folder",
                                "children": [
                                    { "label": "Message : " + val._source.nmessage },
                                    { "label": "Timestamp : " + val._source.ntimestamp },
                                ]
                            };
                        } else {
                            var nMsgobj = JSON.parse(val._source.nmessage);

                            let responsePath = nMsgobj.Path ? nMsgobj.Path : 'NA';
                            let responseRequestBody = nMsgobj.requestBody ? nMsgobj.requestBody : 'NA';
                            return {
                                "label": "Method : " + val._source.nmethod,
                                "expandedIcon": "fa-folder-open yellow",
                                "collapsedIcon": "fa-folder",
                                "children": [
                                    { "label": "Path : " + responsePath },
                                    { "label": "RequestBody : " + responseRequestBody },
                                    { "label": "Message : " + val._source.nmessage },
                                    { "label": "Timestamp : " + val._source.ntimestamp },
                                ]
                            };
                        }

                    });
                });
            } else {
                this.loading = false;
            }
        }
    }
}