import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { AuthService } from '../guards/auth.service';
import { ApiUrlService } from '../services/apiUrl.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;
  loading = false;
  siteUrl: any;
  constructor(private router: Router,
    private api: ApiService,
    private toastr: ToastrService,
    private auth: AuthService,
    private apiUrl: ApiUrlService,
    private http: HttpClient
 ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      utype: new FormControl('', Validators.required),
    });
    this.siteUrl = this.apiUrl.appurl;
  }

  login() {
    debugger;
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      const url = 'Login/CheckUser?email=' + this.form.value.id + '&password=' + this.form.value.password + '&utype=' + this.form.value.utype;
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'No-Auth': 'True'
      });
      const options = { headers: httpHeaders };

      this.http.post(this.apiUrl.url + url, JSON.stringify(this.form.value), options).subscribe(response => {
         
          localStorage.setItem('token', response.toString());
          const role = this.auth.roleFromToken();
          this.loading = false;
          this.router.navigate(['/' + role]);
        }, error => {
          console.log(error);
          this.toastr.error(error.error);
          this.loading = false;
        });
    }
  }

}


