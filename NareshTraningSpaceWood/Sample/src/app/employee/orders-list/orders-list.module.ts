import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';

const routes:Routes=[
  {path:'',component:OrdersListComponent}
]

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    DataTablesModule
  ]
})
export class OrdersListModule { }
