import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
empid: number;
employee: any = [];
employeeform: FormGroup;
bpform: FormGroup;
assignedBP: any = [];
assignableBP: any = [];
empStatus = true;
BPid: string;
loading = false;
passwordmatch = false;
newspace = false;
confirmspace = false;
flag = true;
submitted = false;
bpsubmitted = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiService, private toastr: ToastrService) {
    this.employeeform = this.fb.group({

        EmployeeName: new FormControl(null),
        FirstName: new FormControl(null),
        LastName: new FormControl(null),
        Password: new FormControl(null),
        Role: new FormControl(null),
        Emailid: new FormControl(null),
         // [ Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
        PhoneNo: new FormControl(null),
          // [Validators.pattern(/^[0-9]*$/), Validators.maxLength(15)]),
        CreatedBy: new FormControl(null),
        CreatedDate: new FormControl(null),
        newPassword: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    });
    this.bpform = this.fb.group({BPID: new FormControl('', Validators.required)});
   }

  ngOnInit() {
    this.empid = this.route.snapshot.params.id;
    this.getEmployee();
    this.getAssignedBPs();
    this.getAssignableBP();
  }
getEmployee() {
  this.loading = true;
  const url = 'Users/existingemployees?empid=' + this.empid;
  this.api.getService(url).subscribe(response => {
     this.employee = response;
     this.employeeform.controls.EmployeeName.setValue(this.employee.EmployeeName);
     this.employeeform.controls.FirstName.setValue(this.employee.FirstName);
     this.employeeform.controls.LastName.setValue(this.employee.LastName);
     this.employeeform.controls.Password.setValue(this.employee.Password);
     this.employeeform.controls.Role.setValue(this.employee.Role);
     this.employeeform.controls.Emailid.setValue(this.employee.Emailid);
     this.employeeform.controls.PhoneNo.setValue(this.employee.PhoneNo);
     this.employeeform.controls.CreatedBy.setValue(this.employee.CreatedBy);
     this.employeeform.controls.CreatedDate.setValue(this.employee.CreatedDate);

     if (this.employee.Status == false) {
      this.empStatus = false;
      this.employeeform.disable();
    } else {
      this.empStatus = true;
      this.employeeform.enable();
    }
     this.loading = false;

    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  getAssignedBPs() {
    this.loading = true;
    const url = 'Users/employeerelatedbps?empid=' + this.empid + '&alostatus=allocated';
    this.api.getService(url).subscribe(response => {
      this.assignedBP = response;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }
  getAssignableBP() {
    this.loading = true;
    const url = 'Users/employeerelatedbps?empid=' + this.empid + '&alostatus=notallocated';
    this.api.getService(url).subscribe(response => {
      this.assignableBP = response;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }
  AssigningBP() {
    this.loading = true;
    const album = {
      empid: this.empid,
      bpid: this.BPid
  };
    const data = album;
    const url = 'Users/bpassigning';
    this.api.postService(url, data).subscribe(response => {
      this.getAssignedBPs();
      this.getAssignableBP();
      this.loading = false;
      this.bpsubmitted = false;
      this.toastr.success('Business Partner Assigned successfully');
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  updateEmployee() {
        this.loading = true;
        this.employeeform.value.Password = this.employeeform.value.newPassword;
        this.employeeform.value.EmployeeID = this.empid;
        this.employeeform.value.PhoneNo = this.employee.PhoneNo;
        const url = 'Users/updateemployee?empid=' + this.empid;
        console.log(this.employeeform.value.Emailid);
        this.api.putService(url, this.employeeform.value).subscribe(response => {
          this.getEmployee();
          this.employeeform.value.newPassword = '';
          this.employeeform.value.confirmPassword = '';
          this.loading = false;
          this.submitted = false;
          this.toastr.success('Employee Details Updated successfully');
        }, error => {
          console.log(error);
          this.loading = false;
          this.toastr.error(error.error);
        });
  }

  updateEmployeeStatus(status) {
        this.loading = true;
        const url = 'Users/updateemployee?empid=' + this.empid;
        this.employeeform.value.Status = status;
        this.employeeform.value.EmployeeID = this.empid;
        this.employeeform.value.PhoneNo = this.employee.PhoneNo;
        this.api.putService(url, this.employeeform.value).subscribe(response => {
          this.getEmployee();
          this.employeeform.value.newPassword = '';
          this.employeeform.value.confirmPassword = '';
          this.loading = false;
          if (status == 0) {
            this.toastr.success('Employee Disabled successfully');
          } else {
            this.toastr.success('Employee Enabled successfully');
          }

        }, error => {
          this.loading = false;
          console.log(error);
          this.toastr.error(error.error);
        });
  }


  deletebleBP(bpid: string) {
    this.loading = true;
    const album = {
      empid: this.empid,
      bpid
  };
    const data = album;
    console.log(bpid);
    const url = 'Users/bpunassigned';
    this.api.postService(url, data).subscribe(response => {
      this.getAssignedBPs();
      this.getAssignableBP();
      this.loading = false;
      this.toastr.success('Business Partner UnAssigned Successfully');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  selectedBP(value) {
    this.loading = false;
    this.BPid = value;
    console.log(value);
  }
  checkemp() {
   // this.bpform.get('BPID').clearValidators();
   // this.bpform.get('BPID').updateValueAndValidity();
    this.submitted = true;
    if (this.employeeform.valid && !this.newspace  && !this.confirmspace && !this.passwordmatch) {

          this.updateEmployee();
          this.passwordmatch = false;
          this.newspace = false;
          this.confirmspace = false;
          this.employeeform.reset();
    }
  }
  checkbp() {
    this.bpsubmitted = true;
    if (this.bpform.valid) {
      this.AssigningBP();
      this.bpform.reset();
    }
  }
  pwdvalid() {

    if (this.employeeform.value.newPassword !== null) {
      if (this.employeeform.value.newPassword.startsWith(' ') || this.employeeform.value.newPassword.endsWith(' ')) {
        this.newspace = true;
      } else {
        this.newspace = false;

      }
    }
    if (this.employeeform.value.confirmPassword !== null) {
      if (this.employeeform.value.confirmPassword.startsWith(' ') || this.employeeform.value.confirmPassword.endsWith(' ')) {
        this.confirmspace = true;
      } else {
        this.confirmspace = false;
      }
    }
    if (this.employeeform.value.newPassword !== null && this.employeeform.value.confirmPassword !== null) {
      if (this.employeeform.value.newPassword.trim() === this.employeeform.value.confirmPassword.trim()) {
        this.passwordmatch = false;
      } else {
        this.passwordmatch = true;
      }

    }
  }
}
