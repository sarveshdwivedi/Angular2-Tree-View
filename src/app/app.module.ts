import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "app/app-routing.module";
import { PageNotFountComponent } from "app/pagenotfound.component";
import { AuthGuard } from "app/core/guards/auth.guard";
import { AuthService } from "app/core/services/auth.service";
import { AppConfig } from "app/core/config/app.config";
import { RouterModule } from "@angular/router";
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { HttpClient } from 'app/core/utility/http.client';
import { AuthBlocker } from 'app/core/utility/auth.blocker';
import { TmpStorage } from 'app/core/utility/temp.storage';
import { Utills } from 'app/core/utility/utills';
import { ModalModule } from 'ngx-bootstrap';
import * as jQuery from 'jquery';
import {TreeModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    ToasterModule,
    TreeModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AppConfig,
    ToasterService,
    HttpClient,
    Utills,
    AuthBlocker,
    TmpStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
