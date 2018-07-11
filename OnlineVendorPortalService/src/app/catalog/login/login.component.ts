import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '~/../src/app/auth/auth.service';
import { VendorService } from '~/../src/app/auth/vendor.service'
import { userinfo } from '~/../src/app/model/userinfo';
import swal from 'sweetalert2';


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
        this.service.sendToken(this.form.value.userName);
        localStorage.setItem("LoggedInUserType", this.arrData["UserRole"]);
        localStorage.setItem("LoggedInUserName", this.arrData["UserName"]);
        localStorage.setItem("LoginCount", "0");
        this.router.navigateByUrl('/dashboard');
        // window.location.reload();
      }
      else {
        swal("","The UserName or password you entered is incorrect.","error");
      }
    }
    else {
      swal("","Please enter Username and Password","error");
    }
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

}
