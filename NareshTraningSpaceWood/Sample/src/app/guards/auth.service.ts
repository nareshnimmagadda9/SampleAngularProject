import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private router: Router) { }

    public isToken(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    public decodeToken(): any {
        const token = localStorage.getItem('token');
        let decoded;
        try {
            decoded = jwt_decode(token);
        } catch (err) {
            this.router.navigate(['']);
            return false;
        }
        return decoded;
    }

    public roleFromToken(): any {
        const decoded = this.decodeToken();
        if (decoded.role === 'admin') {
            return 'admin';
        } else if (decoded.role === 'employee') {
            return 'employee';
        } else if (decoded.role === 'business-partner') {
            return 'business-partner';
        }
    }

    public userFromToken(): any {
        const decoded = this.decodeToken();
        if (decoded) {
            return decoded.unique_name;
        }
    }

    public idFromToken(): any {
        const decoded = this.decodeToken();
        return decoded.nameid;
    }
}
