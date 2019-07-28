import { ApiUrlService } from './../../../services/apiUrl.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../guards/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bp-order',
  templateUrl: './bp-order.component.html',
  styleUrls: ['./bp-order.component.css']
})
export class BpOrderComponent implements OnInit {

  orderid: any;
  placeditems: any;
  orderTotal: any;
  successOrder: any;
  uploadData: any;
  loading = false;
  modalRef: BsModalRef;
  uploadform: FormGroup;
  submitted: boolean;
  uploadfile: File;
  file: any;
  docdetails: any;
  serverpath: any;
  filetype: any;
  constructor(private api: ApiService,
              private toastr: ToastrService,
              private authservice: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              private apiUrl: ApiUrlService
  ) {
    this.uploadform = new FormGroup({
      doctype: new FormControl('', Validators.required),
      docfile: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

    this.orderid = this.route.snapshot.params.id;
    this.orderDetailsByorderid();
    this.serverpath = this.apiUrl.serverpath;
    this.getDocuments();
  }

  orderDetailsByorderid() {
    this.loading = true;
    const url = 'Orders/getordersbyid?id=' + this.orderid;
    this.api.getService(url).subscribe(response => {
      this.placeditems = response;
      this.getOrderTotal();
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }
  placeOrder() {
    console.log(this.placeditems);
    this.loading = true;
    this.placeditems.t_orderstatus = 'Placed';
    const url = 'Orders/updateorder?id=' + this.orderid;
    this.api.putService(url, this.placeditems).subscribe((data) => {
      this.successOrder = data;
      this.loading = false;
      this.router.navigate(['business-partner/orders/bp-orders-details/bp-successorder', this.successOrder.id]);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  getOrderTotal() {
    this.orderTotal = 0;
    this.placeditems.tblswOrderItems.forEach(element => {

      element.total = element.t_oqty * element.t_pric;
      this.orderTotal = this.orderTotal + element.total;
    });
  }




  cancelOrder() {
    console.log(this.placeditems);
    this.loading = true;
    this.placeditems.t_orderstatus = 'cancelled';
    const url = 'Orders/updateorder?id=' + this.orderid;
    this.api.putService(url, this.placeditems).subscribe((data) => {
      this.successOrder = data;
      this.loading = false;
      this.router.navigate(['business-partner/orders/bp-orders-details/bp-canceledorder', this.successOrder.id]);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  deleteOrder() {
    console.log(this.placeditems);
    this.loading = true;
    this.placeditems.t_orderstatus = 'cancelled';
    const url = 'Orders/deletecancelledorder/' + this.orderid;
    this.api.postService(url, this.orderid).subscribe((data) => {
      this.successOrder = data;
      this.toastr.success('Oreder Cancelled Successfully');
      this.loading = false;
      localStorage.removeItem('CartItems');
      this.router.navigate(['business-partner/orders/bp-orders-details/bp-canceledorder', this.successOrder]);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

  fileSizeCheck(control: FormControl): { [s: string]: boolean } {
    return { nisF: true };
  }
  fileformatCheck(control: FormControl): { [s: string]: boolean } {
    return { err: true };
  }

  documentupload(file: FileList) {
   // this.uploadform.get('docfile').clearValidators();
    //this.uploadform.get('docfile').updateValueAndValidity();
    this.uploadfile = file.item(0);

    const otherdoc_doc_fileSize = this.uploadfile.size;
    console.log(otherdoc_doc_fileSize);
    if (file) {
      console.log(this.uploadfile.type);
      ('jpg,pdf,png,JPG,JPEG,jpeg,PNG,PDF').indexOf(this.uploadfile.type.split('/')[1]) <= 1 ? this.filetype = true : this.filetype = false;
      if (this.filetype) {
        this.uploadform.get('docfile').setValidators(this.fileformatCheck);
        this.uploadform.get('docfile').updateValueAndValidity();
      }
    }
    if (otherdoc_doc_fileSize > 5000000) {
      this.uploadform.get('docfile').setValidators(this.fileSizeCheck);
      this.uploadform.get('docfile').updateValueAndValidity();
    }
    if (this.uploadfile) {
      this.file = this.uploadfile.name;
    }
  }
  uploadDocument() {
    const url = 'Orders/uploaddocumnets';
    const data = {
      DocumentName: this.uploadform.value.doctype,
      OrderID: this.orderid,
      CreatedBy: this.authservice.idFromToken()
    };
    const formdata: FormData = new FormData();
    if (this.uploadfile) {
      formdata.append('docfile', this.uploadfile, this.uploadfile.name);
    }

    formdata.append('data', JSON.stringify(data));

    this.api.fileService(url, formdata).subscribe(response => {
      this.uploadData = response;
      this.submitted = false;
      this.toastr.success(response);
    
     
      this.getDocuments();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  getDocuments() {
    const url = 'Orders/getdocuments?orderid=' + this.orderid;
    this.api.getService(url).subscribe(response => {
      this.docdetails = response;

    }, error => {
      this.toastr.error(error.error);
    });

  }
  deleteDocument(filename: string) {
    console.log(filename);

    const url = 'Orders/deleteuploadeddocument?filename=' + filename;
    this.api.postService(url, filename).subscribe(response => {
      this.toastr.success(response);
      this.getDocuments();
    }, error => {
      this.toastr.error(error.error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.submitted = false;
    this.uploadform.controls.doctype.setValue('');
    this.uploadform.controls.docfile.setValue('');
    this.modalRef = this.modalService.show(template);
  }
  checkvalid() {
    this.submitted = true;
    if (this.uploadform.valid) {
      this.uploadDocument();
      this.modalRef.hide();
      this.uploadform.reset();
      console.log(this.uploadform.value.doctype);
      console.log(this.uploadform.value.docfile);


    }
  }

  removeItem(id: any) {
    if (this.placeditems.tblswOrderItems.length > 1) {
      this.placeditems.tblswOrderItems.forEach((element, index) => {
        if (element.id === id) {
          this.placeditems.tblswOrderItems.splice(index, 1);
        }
        this.getOrderTotal();
      });
    } else {
      this.toastr.error('Order Should Contains at least one Item');
    }
  }
}
