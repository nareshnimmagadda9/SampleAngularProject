import { AuthService } from './../../guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUrlService } from 'src/app/services/apiUrl.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
// tslint:disable-next-line: ban-types
  role: String;
  ItemsList = false ;
  OrdersList = false;
  SavedOrders = false;
  approvalList = false;
  EmployeesList = false;
  BusinessPartnerList = false;
  BulkUpload=false;
  Balance=false;
  username: any;
  siteUrl:any;

  constructor(private auth: AuthService, private router: Router, private apiUrl: ApiUrlService) { }

  ngOnInit() {
    this.username = this.auth.userFromToken();
    this.menuManager();
    this.siteUrl = this.apiUrl.appurl;
  }

  menuManager() {
    this.role = this.auth.roleFromToken();
    console.log(this.role);
    if (this.role === 'admin') {
      this.EmployeesList = true;
      this.BusinessPartnerList = true;
    } else if (this.role === 'employee') {
      this.OrdersList = true;
      this.BulkUpload=true;
    } else {
      this.role = 'business-partner';
      this.ItemsList = true;
      this.OrdersList = true;
      this.SavedOrders = true;
      this.Balance=true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('CartItems');
    this.router.navigate(['/login']);
  }

}
