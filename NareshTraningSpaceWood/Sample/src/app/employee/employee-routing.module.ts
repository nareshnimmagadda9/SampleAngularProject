import { UploadBpordersComponent } from './upload-bporders/upload-bporders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', component: EmployeeComponent,
  children: [
    {path: '', redirectTo: 'orders-list'},
    {path: 'orders-details/:id', loadChildren: './orders-details/orders-details.module#OrdersDetailsModule'},
    {path: 'orders-list', loadChildren: './orders-list/orders-list.module#OrdersListModule'},
    {path: 'bulkupload', loadChildren: './upload-bporders/upload-bporders.module#UploadBpordersModule'}
  ]
},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
