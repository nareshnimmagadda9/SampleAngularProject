import { DataTableDirective } from 'angular-datatables';
import { AuthService } from './../../guards/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  placedorders: any;
  constructor(private api: ApiService, private toastr: ToastrService, private auth: AuthService) { }

  ngOnInit() {
    this.dtOptions = {order: [0, 'desc']};
    this.placedOrders();
  }
  placedOrders() {
    const orderdata = {
      id: this.auth.idFromToken()
    };
    const url = 'Orders/orderslistbyemployee';
    this.api.postService(url, orderdata).subscribe(response => {
      this.placedorders = response;
      if(this.placedOrders) {
        this.placedorders.forEach(element => {
          element.ordertotal = 0;
          element.tblswOrderItems.forEach(element1 => {
            element.ordertotal = element.ordertotal + ( element1.t_oqty * element1.t_pric);
          });
        });
      }
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }
  
}
