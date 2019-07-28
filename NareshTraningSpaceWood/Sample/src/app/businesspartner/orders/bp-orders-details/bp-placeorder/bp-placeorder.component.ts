import { AuthService } from './../../../../guards/auth.service';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bp-placeorder',
  templateUrl: './bp-placeorder.component.html',
  styleUrls: ['./bp-placeorder.component.css']
})
export class BpPlaceorderComponent implements OnInit {

  cartitems: any;
  modalRef: BsModalRef;
  successOrder: any;
  date = new Date();
  orderTotal: any;
  loading = false;

  constructor(private modalService: BsModalService,
              private api: ApiService,
              private router: Router,
              private toastr: ToastrService,
              private authservice: AuthService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {
    if (localStorage.getItem('CartItems')) {
      this.cartitems = JSON.parse(localStorage.getItem('CartItems'));
      this.gettotalPrice();
    } else {
      this.cartitems = [];
    }
    console.log(this.cartitems);
  }

  gettotalPrice() {
    this.orderTotal = 0;
    this.cartitems.forEach(element => {
      element.total = element.t_oqty * element.t_pric;
      this.orderTotal = this.orderTotal + element.total;
    });
  }

  removeFromCart(item) {
    this.cartitems.forEach((element1, index) => {
      if (item.t_item === element1.t_item) {
        this.cartitems.splice(index, 1);
      }
    });
    this.gettotalPrice();
    localStorage.setItem('CartItems', JSON.stringify(this.cartitems));
    if (this.cartitems) {
      if (this.cartitems.length == 0) {
        this.toastr.success('Order Cancelled Successfully');
        this.router.navigate(['business-partner/items/item-list']);
      }
    }
  }
  placeOrder() {
    debugger;
    this.loading = true;
    console.log(this.cartitems);
    this.cartitems.forEach((element, index) => {
      if (element.t_pric == 0) {
        this.cartitems[index].t_pric = 0;
      }
      if (element.t_oqty == 0) {
        this.cartitems[index].t_oqty = 1;
      }
    });

    const date = new Date();
    const orderdetails = {
      t_bpid: this.authservice.idFromToken(),
      // 't_sotp': 'string',
      t_cofc: 'T-48',
      t_pdat: date,
      t_prdt: date,
      t_stat: 1,
      t_ccur: 'INR',
      // 't_cdec': 'string',
      t_orno: 'string',
      t_odat: date,
      t_time: date,
      t_desc: 'inprocess',
      t_Refcntd: 0,
      t_Refcntu: 0,
      t_orderstatus: 'Placed',
      tblswOrderItems: this.cartitems
    };
    const url = 'Orders/placeorder';
    this.api.postService(url, orderdetails).subscribe((data) => {
      this.successOrder = data;
      console.log(this.successOrder.toString());
      localStorage.removeItem('CartItems');
      this.loading = false;
      this.router.navigate(['business-partner/orders/bp-orders-details/bp-successorder', this.successOrder.t_orno]);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });


  }

  saveOrder() {
    console.log(this.cartitems);
    const date = new Date();
    this.loading = true;
    const orderdetails = {
      t_bpid: this.authservice.idFromToken(),
      // 't_sotp': 'string',
      t_cofc: 'T-48',
      t_pdat: date,
      t_prdt: date,
      t_stat: 1,
      t_ccur: 'INR',
      // 't_cdec': 'string',
      t_orno: 'string',
      t_odat: date,
      t_time: date,
      t_desc: 'NotSubmited',
      t_Refcntd: 0,
      t_Refcntu: 0,
      t_orderstatus: 'saved',
      tblswOrderItems: this.cartitems
    };
    const url = 'Orders/placeorder';
    this.api.postService(url, orderdetails).subscribe((data) => {
      this.successOrder = data;
      console.log(this.successOrder.toString());
      localStorage.removeItem('CartItems');
      this.loading = false;
      this.router.navigate(['business-partner/orders/bp-orders-saved']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });


  }

  priceChange(item, value) {
    item.t_pric = value;
    localStorage.setItem('CartItems', JSON.stringify(this.cartitems));
    this.gettotalPrice();
  }

  quantityChange(item, value) {
    item.t_oqty = value;
    localStorage.setItem('CartItems', JSON.stringify(this.cartitems));
    this.gettotalPrice();
  }

  cancelOrder() {
    localStorage.removeItem('CartItems');
    this.modalRef.hide();
    this.toastr.success('Order Cancelled Successfully');
    this.router.navigate(['business-partner/items/item-list']);
  }



}
