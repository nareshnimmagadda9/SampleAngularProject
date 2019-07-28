import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  newemployees: any = [];
  selectedUsers: any = [];
  loading = false;
  constructor(private router: Router, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getNewEmployees();
  }

  getNewEmployees() {
    this.loading = true;
    const url = 'Users/newemployees';
    this.api.getService(url).subscribe(response => {
       this.newemployees = response;
       this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error(error.error);
      });
    }

    selectionChange(input: HTMLInputElement, user) {
        if (input.checked === true) {
            this.selectedUsers.push(user.t_emno);
         } else {
            this.selectedUsers.forEach( (element, index) => {
              if (element == user.t_emno) {
                this.selectedUsers.splice(index, 1);
              }
            });
         }

    }

    generatePassword() {
        if (this.selectedUsers.length > 0) {
          this.loading = true;
          const album = {
              IDs: this.selectedUsers.toString()
          };
          const data = album;
          const url = 'Users/generatePasswordEmployee' ;
          this.api.postService(url, data).subscribe(response => {
            this.getNewEmployees();

            this.loading = false;
            if (this.selectedUsers.length > 1) {
            this.toastr.success('Employees passwords generated successfully');
            }
            if (this.selectedUsers.length === 1) {
              this.toastr.success('Employee password generated successfully');
            }
            this.selectedUsers = [];
            }, error => {
              console.log(error);
              this.loading = false;
              this.toastr.error(error.error);
            });

        } else {
          this.toastr.error('Please select at least one employee');
        }
    }


}
