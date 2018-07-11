import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) {
    if (localStorage.getItem("LoginCount") == "0") {
      localStorage.setItem("LoginCount", "1");
      swal("","Hi, " + localStorage.getItem("LoggedInUserName") + " Welcome to Vendor Portal service", "success");
    }
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

}
