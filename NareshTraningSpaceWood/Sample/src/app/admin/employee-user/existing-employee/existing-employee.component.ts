import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-existing-employee',
  templateUrl: './existing-employee.component.html',
  styleUrls: ['./existing-employee.component.css']
})
export class ExistingEmployeeComponent implements OnInit {
  existingemployees: any = [];
  loading = false;
  constructor(private router: Router, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getExistingEmployees();
  }

  getExistingEmployees() {
    this.loading = true;
    const url = 'Users/existingemployees';
    this.api.getService(url).subscribe(response => {
       this.existingemployees = response;
       this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error(error.error);
      });
    }

}
