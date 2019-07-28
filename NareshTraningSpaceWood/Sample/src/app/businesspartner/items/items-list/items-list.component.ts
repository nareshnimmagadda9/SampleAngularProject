import { element } from 'protractor';
import { AuthService } from './../../../guards/auth.service';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

class Item {
  t_item: number;
  t_desc: string;
  t_citg: string;
  status: number;
}

class DataTablesResponse {
  data: any[];
  Results: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
  RecordCount: number;
  PageCount: number;
}



@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, AfterViewInit  {

  dtOptions: DataTables.Settings = {};
bpid: any;
  dataParams: any = {};
  itemsList: Item[];
  data: any;
  resultdata: any;
  cartitems: any;
  loading = false;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  allItems: any = [];
  constructor(private apiService: ApiService,
              private toastr: ToastrService,
              private auth: AuthService,
              private http: HttpClient,
              private router: Router) { }



  ngOnInit() {
    this.getAllItem();
    if (localStorage.getItem('CartItems')) {
      this.cartitems = JSON.parse(localStorage.getItem('CartItems'));
    } else {
      this.cartitems = [];
    }
    // const that = this;

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     this.data = dataTablesParameters;
    //     this.dataParams['columns'] = {};
    //     this.dataParams['order'] = {};
    //     this.data.columns.forEach(element => {
    //         let name = element.data;
    //         this.dataParams.columns[name] = element.search.value;
    //     });
    //     this.data.order.forEach(element => {
    //         this.dataParams.order['columnname'] = 't_item';
    //         this.dataParams.order['direction'] = element.dir;
    //     });
    //     this.dataParams.length = this.data.length;
    //     this.dataParams.search = this.data.search.value;
    //     this.dataParams.currentPage = (this.data.length + this.data.start) / this.data.length;

    //     that.http
    //       .post<DataTablesResponse>(
    //         'http://localhost:51068/api/Items',
    //         this.dataParams, {}
    //       ).subscribe(resp => {
    //         if(resp.Results) {
    //           resp.Results.forEach(element => {
    //             element.status = 0;
    //             this.cartitems.forEach((element1, index) => {
    //               if(element1.t_item == element.t_item) {
    //                 element.status = 1;
    //               }
    //            });
    //           });
    //         }
    //         that.itemsList = resp.Results;

    //         callback({
    //           recordsTotal: resp.RecordCount,
    //           recordsFiltered: resp.RecordCount,
    //           data: []
    //         });
    //       });
    //   },
    //   columns: [{ data: 't_item' }, { data: 't_desc' }, { data: 't_citg' }, { data: '' }]
    // };
  }

  // ngAfterViewInit(): void {
  //   this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.destroy();
  //     dtInstance.columns().every(function() {
  //       const that = this;
  //       $('input', this.header()).on('keyup change', function () {
  //         if (that.search() !== this['value']) {
  //           that
  //             .search(this['value'])
  //             .draw();
  //         }
  //       });
  //     });
  //   });
  // }

  ngAfterViewInit(): void {
    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.columns().every(function () {
    //     const that = this;
    //     $('input', this.footer()).on('keyup change', function () {
    //       if (that.search() !== this['value']) {
    //         that.search(this['value']).draw();
    //       }
    //     });
    //   });
    // });
  }

  getAllItem() {
    this.loading = true;
    const data = {
      bpid: this.auth.idFromToken()
    };

    const url = 'Items/getitemslist';
    this.apiService.postService(url, data).subscribe(response => {
      this.loading = false;
      response.forEach(element => {
        element.status = 0;
        this.cartitems.forEach((element1, index) => {
          if (element1.t_item == element.t_item) {
            element.status = 1;
            element.t_pric = element1.t_pric;
            element.t_oqty = element1.t_oqty;
          }
       });
      });
      this.allItems = response;

    },
      (error) => {
        this.loading = false;
        if (error.error != null) {
          this.toastr.error(error.error.Message, error.status);
        } else {
          this.toastr.error(error.status);
        }
      });
  }

  addtoCart(item) {
    this.allItems.forEach(element => {

        if (item.t_item == element.t_item) {
          if (element.t_pric == 0) {
            element.t_pric = 1;
          }
          if (element.t_oqty == 0) {
            element.t_oqty = 1;
          }
          element.status = 1;
          this.cartitems.push(element);
          localStorage.setItem('CartItems', JSON.stringify(this.cartitems));
        }
    });
  }

  placeOrder() {
    if (this.cartitems.length > 0) {
      this.router.navigate(['business-partner/orders/bp-orders-details/bp-placeorder']);
    } else {
      this.toastr.error('To place order at least one item to be selected.');
    }
  }

  priceChange(item, value) {
    item.t_pric = value;
  }

  quantityChange(item, value) {
    item.t_oqty = value;
  }

  removeFromCart(item) {
    this.allItems.forEach(element => {
        if (item.t_item == element.t_item) {
           element.status = 0;
           this.cartitems.forEach((element1, index) => {
              if (element1.t_item == element.t_item) {
                this.cartitems.splice(index, 1);
              }
           });
           localStorage.setItem('CartItems', JSON.stringify(this.cartitems));
        }
    });
  }
}
