import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { userinfo } from '../auth/userinfo';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(private myRoute: Router,
    private httpService: HttpClient,
  ) { }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: userinfo[];
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
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("LoggedInUserType");
    this.myRoute.navigate(["login"]);
  }
  getuserDetails(): userinfo[] {
    this.httpService.get<userinfo[]>('http://localhost:4231/assets/sampledata.json').subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    )
    return this.user;
  }
}