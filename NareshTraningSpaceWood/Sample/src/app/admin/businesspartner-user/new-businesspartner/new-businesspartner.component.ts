import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-businesspartner',
  templateUrl: './new-businesspartner.component.html',
  styleUrls: ['./new-businesspartner.component.css']
})
export class NewBusinesspartnerComponent implements OnInit {
  newBP: any = [];
  selectedBP: any = [];
  loading = false;
  constructor(private router: Router, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getNewBusinessPartners();
  }
  getNewBusinessPartners() {
    const url = 'Users/newbusinesspartners';
    this.newBP  = [];
    this.loading = true;
    this.api.getService(url).subscribe(response => {
       this.newBP = response;
       this.loading = false;
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
        this.loading = false;
      });
    }

    selectionChange(input: HTMLInputElement, bp) {
      if (input.checked === true) {
          this.selectedBP.push(bp.t_bpid);
       } else {
          this.selectedBP.forEach( (element, index) => {
            if (element == bp.t_bpid) {
              this.selectedBP.splice(index, 1);
            }
          });
       }

  }

  generatePassword() {
      this.loading = true;
      if (this.selectedBP.length > 0) {
          const album = {
              IDs: this.selectedBP.toString()
          };
          const data = album;
          console.log(data);
          const url = 'Users/generatePasswordbp';
          this.api.postService(url, data).subscribe(response => {
          this.getNewBusinessPartners();

          this.loading = false;
          if (this.selectedBP.length > 1) {
          this.toastr.success('Business Partners passwords generated successfully');
          }
          if (this.selectedBP.length === 1) {
            this.toastr.success('Business Partner password generated successfully');
          }
          this.selectedBP = [];
          }, error => {
            console.log(error);
            this.toastr.error(error.error);
          });

      } else {
        this.loading = false;
        this.toastr.error('Please select at least one Business Partner');
      }
  }



}
