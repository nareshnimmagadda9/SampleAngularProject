import { ApiUrlService } from './../../services/apiUrl.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../guards/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
  orderid: any;
  placeditems: any;
  sofficelist: any;
  sordertypelist: any;
  masterserieslist: any;
  approveform: FormGroup;
  modalRef: BsModalRef;
  submitted: boolean;
  loading = false;
  orderTotal: any;
  docdetails: any;
  serverpath: any;
  constructor(private api: ApiService,
              private toastr: ToastrService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private router: Router,
              private apiUrl: ApiUrlService
              ) {
                this.approveform = new FormGroup({
                  salesoffice : new FormControl('', Validators.required),
                  salesordertype : new FormControl('', Validators.required),
                  masterseries : new FormControl('', Validators.required),
                });
              }

  openModal(template: TemplateRef<any>) {
      this.submitted = false;
      this.approveform.controls.salesoffice.setValue('');
      this.approveform.controls.salesordertype.setValue('');
      this.approveform.controls.masterseries.setValue('');
      this.modalRef = this.modalService.show(template);
      }
  ngOnInit() {

    this.orderid = this.route.snapshot.params.id;
    this.orderDetailsByorderid();
    this.serverpath = this.apiUrl.serverpath;
    this.getSalesoffices();
    this.getSalesOrderTypes();
    this.getMasterSeries();
  }
 orderDetailsByorderid() {
    const url = 'Orders/getordersbyid?id=' + this.orderid;
    this.api.getService(url).subscribe(response => {
      this.placeditems = response;
      this.getOrderTotal();
      if (this.placeditems.t_orderstatus === 'Approved') {
        this.getDocuments();
      }
      console.log(this.placeditems);

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
  getSalesoffices() {
    const url = 'Orders/getsalesoffices' ;
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
  approveOrder() {
    this.placeditems.t_sotp = this.approveform.controls.salesordertype.value;
    this.placeditems.t_cofc = this.approveform.controls.salesoffice.value;
    this.placeditems.t_orderstatus = 'Inprocess';
    console.log(this.placeditems.t_sotp);
    console.log(this.placeditems.t_cofc);
    const url = 'Orders/approveorder';
    this.api.postService(url, this.placeditems).subscribe(response => {
    this.submitted = false;
    this.toastr.success(response);
    this.router.navigate(['employee/orders-list']);

  }, error => {
    console.log(error);
    this.toastr.error(error.error);
    });
  }
  checkapprove() {
    this.submitted = true;
    if (this.approveform.valid) {
      this.approveOrder();
      this.modalRef.hide();
      this.approveform.reset();
      console.log(this.approveform.value.salesoffice);
      console.log(this.approveform.value.salesordertype);
      console.log(this.approveform.value.masterseries);

    }
  }

  getOrderTotal() {
    this.orderTotal = 0;
    this.placeditems.tblswOrderItems.forEach(element => {

      element.total = element.t_oqty * element.t_pric;
      this.orderTotal = this.orderTotal + element.total;
    });
  }

  rejectedOrders() {
    console.log(this.placeditems);
    this.loading = true;
    this.placeditems.t_orderstatus = 'Rejected';
    const url = 'Orders/updateorder?id=' + this.orderid;
    this.api.putService(url, this.placeditems).subscribe((data) => {
      this.loading = false;
      this.toastr.success('Order Rejected Successfully');
      this.router.navigate(['employee/orders-list']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }
}
