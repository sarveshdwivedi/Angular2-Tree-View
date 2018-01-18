import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutRoutingModule } from "app/layout/layout-routing.module";
import { LayoutComponent } from "app/layout/layout.component";
import { HeaderComponent } from "app/layout/components/header/header.component";
import { SidebarComponent } from "app/layout/components/aside/aside.component";
import { RouterModule } from "@angular/router";

//Layout module file- Modules are blocks of code that do a certain type of task and importing common and other dependency required module in the file.

@NgModule({
    imports: [CommonModule,RouterModule,  LayoutRoutingModule],
    declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
    providers: []
})
export class LayoutModule {

}