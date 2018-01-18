import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "app/home/home-routing.module";
import { HomeComponent } from "app/home/component/home.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import {TreeModule} from 'primeng/primeng';
// Login module file- Modules are blocks of code that do a certain type of task and Importing common and other dependency required module in the file.

@NgModule({
    imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, ToasterModule, TreeModule],
    declarations: [HomeComponent],
    providers: []
})
export class HomeModule {

}