import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/../src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn$: boolean;
  constructor(private service:AuthService) { }

  ngOnInit() {
    this.isLoggedIn$=this.service.isLoggedIn;
  }


}
