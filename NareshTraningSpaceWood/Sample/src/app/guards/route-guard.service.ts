import { Router, Route, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class RouteGuardService implements CanLoad {

    constructor(private auth: AuthService, private router: Router) { }

    canLoad(route: Route): boolean {

        const expectedRole = route.data.expectedRole;
        console.log(expectedRole);
        
       // const role = localStorage.getItem('role');
        if (this.auth.isToken() && this.auth.roleFromToken() === expectedRole) {
            return true;
        } else {
            this.router.navigate([]);
        }
     }
}
