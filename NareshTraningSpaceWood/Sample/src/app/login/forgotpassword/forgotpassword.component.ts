import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;
  submitted: boolean;
  loading = false;
  constructor(private router: Router,
              private api: ApiService,
              private toastr: ToastrService,
              private auth: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      id : new FormControl(null, Validators.required),
      utype : new FormControl('', Validators.required),
    });
  }

  login() {
    this.submitted = true;

    if (this.form.valid) {
    this.loading = true;
    const details = {
      id: this.form.value.id,
      utype: this.form.value.utype
    };
    const url = 'Login/forgotpassword';
    this.api.postService(url, details).subscribe(response => {
        this.loading = false;
        this.toastr.success(response);
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
        this.loading = false;
      });
    }
  }


}
