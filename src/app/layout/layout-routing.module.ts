import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";

//Child Routing File - Routing enables navigation from one view to the next as users perform application tasks and loading layout routing for landing pages.

const routes: Routes = [
    { path: '', component: LayoutComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {

}