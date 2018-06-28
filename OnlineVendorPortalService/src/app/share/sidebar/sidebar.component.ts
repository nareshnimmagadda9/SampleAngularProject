import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '~/../src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  isLoggedIn$: boolean;
  isLoggedInUserType: boolean;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if (localStorage.getItem("LoggedInUserType") === "A")
      this.isLoggedInUserType = true;
    else
      this.isLoggedInUserType = false;

  }
 
  ngAfterViewInit() {

    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('.overlay').fadeOut();
    });

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').addClass('active');
      $('.overlay').fadeIn();
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  }
}
