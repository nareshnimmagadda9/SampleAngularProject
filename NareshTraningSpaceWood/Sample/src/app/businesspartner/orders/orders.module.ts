import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpOrdersListComponent } from './bp-orders-list/bp-orders-list.component';
import { BpOrdersDetailsComponent } from './bp-orders-details/bp-orders-details.component';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { BpOrdersSavedComponent } from './bp-orders-saved/bp-orders-saved.component';
import { BpOrderComponent } from './bp-order/bp-order.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: OrdersComponent,
children: [
  {path: '', redirectTo: 'bp-orders-list'},
 {path: 'bp-orders-details', loadChildren: './bp-orders-details/bp-orders-details.module#BpOrdersDetailsModule'},
 {path: 'bp-orders-list', component: BpOrdersListComponent},
 {path: 'bp-orders-saved', component: BpOrdersSavedComponent},
 {path: 'bp-order/:id', component: BpOrderComponent}
]}
];
@NgModule({
  declarations: [OrdersComponent, BpOrdersListComponent, BpOrdersSavedComponent, BpOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
