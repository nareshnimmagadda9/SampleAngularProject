import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-upload-bporders',
  templateUrl: './upload-bporders.component.html',
  styleUrls: ['./upload-bporders.component.css']
})
export class UploadBpordersComponent implements OnInit {

  uploadform: FormGroup;
  uploadordersexcel: FormGroup;
  loading = false;
  empid: number;
  assignedBP: any = [];
  jsonsubmit = false;
  excelsubmit = false;
  headerfile: File;
  linefile: File;
  modalRef: BsModalRef;
  sofficelist: any;
  sordertypelist: any;
  masterserieslist: any;
  excelfile: File;
  filetype: any;


  constructor(private modalService: BsModalService, private api: ApiService, private route: ActivatedRoute, private toastr: ToastrService, private auth: AuthService) {
    this.uploadform = new FormGroup({
      bpid: new FormControl('', Validators.required),
      Header: new FormControl(null, Validators.required),
      Lines: new FormControl(null, Validators.required),
      salesoffice: new FormControl('', Validators.required),
      salesordertype: new FormControl('', Validators.required),
      masterseries: new FormControl('', Validators.required)
    });

    this.uploadordersexcel = new FormGroup({
      bpid: new FormControl('', Validators.required),
      Header: new FormControl(null, Validators.required),
      salesoffice: new FormControl('', Validators.required),
      salesordertype: new FormControl('', Validators.required),
      masterseries: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.empid = this.auth.idFromToken();
    this.getAssignedBPs();
    this.getSalesoffices();
    this.getSalesOrderTypes();
    this.getMasterSeries();
  }
  fileformatCheck(control: FormControl): { [s: string]: boolean } {
    return { err: true };
  }
  headerUpload(event: any) {
    this.uploadform.get('Header').clearValidators();
    this.uploadform.get('Header').updateValueAndValidity();
    if (event.target.files) {
      this.headerfile = event.target.files.item(0);
      ('json,JSON').indexOf(this.headerfile.type.split('/')[1]) != 0 ? this.filetype = true : this.filetype = false;
      if (this.filetype) {
        this.uploadform.get('Header').setValidators(this.fileformatCheck);
        this.uploadform.get('Header').updateValueAndValidity();
      }
    }
  }
  lineUpload(event: any) {
    this.uploadform.get('Lines').clearValidators();
    this.uploadform.get('Lines').updateValueAndValidity();
    if (event.target.files) {
      this.linefile = event.target.files.item(0);
      ('json,JSON').indexOf(this.linefile.type.split('/')[1]) != 0 ? this.filetype = true : this.filetype = false;
      if (this.filetype) {
        this.uploadform.get('Lines').setValidators(this.fileformatCheck);
        this.uploadform.get('Lines').updateValueAndValidity();
      }
    }
  }

  excelUpload(event: any) {
     this.uploadordersexcel.get('Header').clearValidators();
     this.uploadordersexcel.get('Header').updateValueAndValidity();
     if (event.target.files) {
      this.excelfile = event.target.files.item(0);
      ('xlsx,XLSX').indexOf(this.excelfile.name.split('.')[1]) != 0 ? this.filetype = true : this.filetype = false;
      if (this.filetype) {
        this.uploadordersexcel.get('Header').setValidators(this.fileformatCheck);
        this.uploadordersexcel.get('Header').updateValueAndValidity();
      }
    }
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
  uploadOrders() {
    debugger;
    const data = {
      BPID: this.uploadform.controls.bpid.value,
      salesoffice: this.uploadform.controls.salesoffice.value,
      salesordertype: this.uploadform.controls.salesordertype.value,
      masterseries: this.uploadform.controls.masterseries.value
    };
    const formdata = new FormData();
    formdata.append('data', JSON.stringify(data));
    if (this.headerfile) {
      formdata.append('headerfile', this.headerfile, this.headerfile.name);
    }
    if (this.linefile) {
      formdata.append('linefile', this.linefile, this.linefile.name);
    }
    const url = 'BulkUpload/bulkupload';

    this.api.fileService(url, formdata).subscribe(response => {
      this.jsonsubmit = false;
      this.toastr.success(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  uploadexcelOrders() {

    const data = {
      BPID: this.uploadordersexcel.controls.bpid.value,
      salesoffice: this.uploadordersexcel.controls.salesoffice.value,
      salesordertype: this.uploadordersexcel.controls.salesordertype.value,
      masterseries: this.uploadordersexcel.controls.masterseries.value
    };
    const formdata = new FormData();
    formdata.append('data', JSON.stringify(data));
    if (this.excelfile) {
      formdata.append('excelfile', this.excelfile, this.excelfile.name);
    }

    const url = 'BulkUpload/bulkexcelupload';

    this.api.fileService(url, formdata).subscribe(response => {
      this.excelsubmit = false;
      this.toastr.success(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  getSalesoffices() {
    const url = 'Orders/getsalesoffices';
    this.api.getService(url).subscribe(response => {
      this.sofficelist = response;
    });
  }
  getSalesOrderTypes() {
    const url = 'Orders/getsalesordertypes';
    this.api.getService(url).subscribe(response => {
      this.sordertypelist = response;
    });
  }
  getMasterSeries() {
    const url = 'Orders/masterseries';
    this.api.getService(url).subscribe(response => {
      this.masterserieslist = response;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  checkjsonupload() {
    this.jsonsubmit = true;
    if (this.uploadform.valid) {
      this.uploadOrders();
      this.uploadform.controls.bpid.setValue('');
      this.uploadform.controls.Header.setValue('');
      this.uploadform.controls.Lines.setValue('');
      this.uploadform.controls.salesoffice.setValue('');
      this.uploadform.controls.salesordertype.setValue('');
      this.uploadform.controls.masterseries.setValue('');
      this.jsonsubmit = false;
    }
  }

  checkexcelupload() {
    this.excelsubmit = true;
    if (this.uploadordersexcel.valid) {
      this.uploadexcelOrders();
      this.uploadordersexcel.controls.bpid.setValue('');
      this.uploadordersexcel.controls.Header.setValue('');
      this.uploadordersexcel.controls.salesoffice.setValue('');
      this.uploadordersexcel.controls.salesordertype.setValue('');
      this.uploadordersexcel.controls.masterseries.setValue('');
      this.excelsubmit = false;
    }
  }


}
