import { ApiService } from './../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-businesspartner',
  templateUrl: './update-businesspartner.component.html',
  styleUrls: ['./update-businesspartner.component.css']
})
export class UpdateBusinesspartnerComponent implements OnInit {
  bpid: number;
  businesspartners: any = [];
  loading = false;
  bpform: FormGroup;
  passwordmatch = false;
  newspace = false;
  confirmspace = false;
  submitted = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiService, private toastr: ToastrService) {
    this.bpform = this.fb.group({
      FirstName: new FormControl(null),
      LastName: new FormControl(null),
      Emailid: new FormControl(null),
      Password: new FormControl(null),
      NewPassword: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      ConfirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      Address: new FormControl(null),
      Address2: new FormControl(null),
      City: new FormControl(null),
      State: new FormControl(null),
      Zip: new FormControl(null),
    });
  }


  ngOnInit() {
    this.bpid = this.route.snapshot.params.id;
    this.getBusinessPartner();
  }
  getBusinessPartner() {
    this.loading = true;
    const url = 'Users/existingbusinesspartners';
    const post = {
      id: this.bpid
    };
    this.api.postService(url, post).subscribe(response => {
      this.loading = false;
      this.businesspartners = response;
      this.bpform.controls.FirstName.setValue(this.businesspartners.BPID);
      this.bpform.controls.LastName.setValue(this.businesspartners.PhoneNo);
      this.bpform.controls.Emailid.setValue(this.businesspartners.Emailid);
      this.bpform.controls.Password.setValue(this.businesspartners.Password);
      this.bpform.controls.Address.setValue(this.businesspartners.t_ln01);
      this.bpform.controls.Address2.setValue(this.businesspartners.t_ln02);
      this.bpform.controls.City.setValue(this.businesspartners.t_ccit);
      this.bpform.controls.State.setValue(this.businesspartners.deca);
      this.bpform.controls.Zip.setValue(this.businesspartners.pstc);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  updateBusinessPartner() {
    if (this.bpform.value.NewPassword != null && this.bpform.value.ConfirmPassword != null) {
      if (this.bpform.value.NewPassword == this.bpform.value.ConfirmPassword) {
        this.passwordmatch = false;
        this.bpform.controls.Password.setValue(this.bpform.controls.ConfirmPassword.value);
        this.loading = true;
        const data = {
          id: this.bpid,
          bpdata: this.bpform.value
        };
        const url = 'Users/updatebusinesspartner';
        console.log(this.bpform.value.Emailid);
        this.api.postService(url, data).subscribe(response => {
          this.getBusinessPartner();
          this.loading = false;
          this.submitted = false;
          this.bpform.value.NewPassword = '';
          this.bpform.value.ConfirmPassword = '';
          this.toastr.success('Business Partner Details Updated successfully');
        }, error => {
          console.log(error);
          this.loading = false;
          this.toastr.error(error.error);
        });
      }
    } else {
      this.passwordmatch = true;
    }
  }
  chechValid() {
    this.submitted = true;
    if (this.bpform.valid && !this.newspace && !this.confirmspace && !this.passwordmatch) {
      this.updateBusinessPartner();
      this.passwordmatch = false;
      this.newspace = false;
      this.confirmspace = false;
      this.bpform.reset();
    }
  }
  pwdvalid() {

    if (this.bpform.value.NewPassword !== null) {
      if (this.bpform.value.NewPassword.startsWith(' ') || this.bpform.value.NewPassword.endsWith(' ')) {
        this.newspace = true;
      } else {
        this.newspace = false;

      }
    }
    if (this.bpform.value.ConfirmPassword !== null) {
      if (this.bpform.value.ConfirmPassword.startsWith(' ') || this.bpform.value.ConfirmPassword.endsWith(' ')) {
        this.confirmspace = true;
      } else {
        this.confirmspace = false;
      }
    }
    if (this.bpform.value.NewPassword !== null && this.bpform.value.ConfirmPassword !== null) {
      if (this.bpform.value.NewPassword.trim() === this.bpform.value.ConfirmPassword.trim()) {
        this.passwordmatch = false;
      } else {
        this.passwordmatch = true;
      }

    }
  }

}
