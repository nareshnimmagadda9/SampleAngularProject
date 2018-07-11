import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
  constructor(private myRoute: Router,
    private httpService: HttpClient,
  ) { }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.isLoggednIn();
  }
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token);
  }
  getToken() {
    return localStorage.getItem("LoggedInUser");
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.clear();
    // this.myRoute.navigate([""]);
    window.location.reload();
  }
}