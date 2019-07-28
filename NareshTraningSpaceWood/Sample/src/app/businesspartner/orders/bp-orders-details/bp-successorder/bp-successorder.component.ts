import { ApiService } from './../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bp-successorder',
  templateUrl: './bp-successorder.component.html',
  styleUrls: ['./bp-successorder.component.css']
})
export class BpSuccessorderComponent implements OnInit {
orderid: any;
orderDetails: any;
orderTotal:any;
  constructor(private api: ApiService, private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.orderid = this.route.snapshot.params.id;
    console.log(this.orderid);
    this.getOrderDetails();

  }
  getOrderDetails() {
    this.orderTotal = 0;
    const url = 'Orders/getordersbyid?id=' + this.orderid;
    this.api.getService(url).subscribe(response => {
    this.orderDetails = response;
    this.orderDetails.tblswOrderItems.forEach(element => {
      
      element.total = element.t_oqty * element.t_pric;
      this.orderTotal = this.orderTotal + element.total;
    });
    console.log(this.orderDetails);
    
   }, error => {
    console.log(error);
    this.toastr.error(error.error);
    });
  }
}
