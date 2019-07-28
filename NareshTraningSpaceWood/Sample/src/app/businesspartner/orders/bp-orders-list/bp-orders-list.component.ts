import { DataTableDirective } from 'angular-datatables';
import { AuthService } from './../../../guards/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bp-orders-list',
  templateUrl: './bp-orders-list.component.html',
  styleUrls: ['./bp-orders-list.component.css']
})
export class BpOrdersListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
placedorders: any = [];
loading = false;

  constructor(private api: ApiService, private toastr: ToastrService, private auth: AuthService) { }

  ngOnInit() {
    this.dtOptions = {order: [0, 'desc']};
    this.placedOrders();
  }
  placedOrders() {
    this.loading = true;
    const orderdata = {
      id: this.auth.idFromToken(),
      orderstatus: 'all'
    };
    const url = 'Orders/orderslistbybp';
    this.api.postService(url, orderdata).subscribe(response => {
      this.placedorders = response;
      this.loading = false;
      if (this.placedOrders) {
        this.placedorders.forEach(element => {
          element.ordertotal = 0;
          element.tblswOrderItems.forEach(element1 => {
            element.ordertotal = element.ordertotal + ( element1.t_oqty * element1.t_pric);
          });
        });
      }
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error);
    });
  }

}
