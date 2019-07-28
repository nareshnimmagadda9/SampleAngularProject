import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-existing-businesspartner',
  templateUrl: './existing-businesspartner.component.html',
  styleUrls: ['./existing-businesspartner.component.css']
})
export class ExistingBusinesspartnerComponent implements OnInit {
existingBP:any = [];
loading = false;
  constructor(private router: Router, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getExistingBusinessPartner();
  }

  getExistingBusinessPartner() {
    this.loading = true;
    const url = 'Users/existingbusinesspartners';
    let data = {
      id : null
    }
    this.api.postService(url, data).subscribe(response => {
       this.existingBP = response;
       this.loading = false;
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
        this.loading = false;
      });
    }

}
