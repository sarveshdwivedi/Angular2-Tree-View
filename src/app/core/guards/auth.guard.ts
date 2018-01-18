import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "app/core/services/auth.service";

//This is auth guard file and in this file we are checking whether the user is logged in or not and then allowing them to access some specific routes.

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) { }
 
    //this is use for authGuard for routes if use if not logged then they should access define routes
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    //check whether user is logged or not
    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/']);
        return false;
    }
}
