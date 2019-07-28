import { DataTableDirective } from 'angular-datatables';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-bp-orders-saved',
  templateUrl: './bp-orders-saved.component.html',
  styleUrls: ['./bp-orders-saved.component.css']
})
export class BpOrdersSavedComponent implements OnInit {
  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
savedorders: any;
loading = false;
  constructor(private api: ApiService, private toastr: ToastrService, private auth: AuthService) { }

  ngOnInit() {
    this.dtOptions = {order: [0, 'desc']};
    this.savedOrders();
  }
  savedOrders() {
    this.loading = true;
    const orderdata = {
      id: this.auth.idFromToken(),
      orderstatus: 'saved'
    };
    const url = 'Orders/orderslistbybp';
    this.api.postService(url, orderdata).subscribe(response => {
      this.loading = false;
      this.savedorders = response;
      if(this.savedorders) {
        this.savedorders.forEach(element => {
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
