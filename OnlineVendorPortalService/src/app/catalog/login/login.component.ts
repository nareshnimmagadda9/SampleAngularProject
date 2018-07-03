import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '~/../src/app/auth/auth.service';
import { VendorService } from '~/../src/app/auth/vendor.service'
import { userinfo } from '~/../src/app/model/userinfo';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  arrData: userinfo[];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private vendorService: VendorService,
    public toastr: ToastrService
  ) { }
  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.service.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
  async Userlogin() {
    if (this.form.value.userName != "" && this.form.value.password != "") {
      this.arrData = await this.vendorService.getUserDetails(this.form.value.userName, this.form.value.password);
      if (this.arrData["ErrNumber"] != "0") {
        //if (this.arrData["UserName"].toLowerCase() == this.form.value.userName.toLowerCase()) {
        this.service.sendToken(this.form.value.userName);
        localStorage.setItem("LoggedInUserType", this.arrData["UserRole"]);
        localStorage.setItem("LoggedInUserName", this.arrData["UserName"]);
        this.router.navigateByUrl('/dashboard');
        //}
      }
      else {
        this.toastr.error("The UserName or password you entered is incorrect.", "",
         { timeOut: 3000,positionClass: 'toast-top-center',});
      }
    }
    else {
      this.toastr.error("Please enter Username and Password", "",
       { timeOut: 3000,positionClass: 'toast-top-center',});
    }
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

}
