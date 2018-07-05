import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/../src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoggedIn$=this.authService.isLoggedIn;
  }
  onLogout() {
    this.authService.logout();
  }
  onLogin(){
    this.router.navigate(['login']);
  }
  redirect(name){
    this.router.navigate([name]);
  }
}
