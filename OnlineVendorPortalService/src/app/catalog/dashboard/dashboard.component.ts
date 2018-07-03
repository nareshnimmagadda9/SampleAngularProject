import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public toastr: ToastrService
  ) { 
     this.toastr.success("Hi, " + localStorage.getItem("LoggedInUserName") + " Welcome to Vendor Portal service", "",
    { timeOut: 3000, positionClass: 'toast-top-center', });
  }

  ngOnInit() {
    
  }

}
