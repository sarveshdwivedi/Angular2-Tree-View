import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { PageNotFountComponent } from "app/pagenotfound.component";
import { AuthGuard } from "app/core/guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: '**',
        component: PageNotFountComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}