import { BpPlaceorderComponent } from './bp-placeorder/bp-placeorder.component';
import { BpNeworderComponent } from './bp-neworder/bp-neworder.component';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { BpOrdersDetailsComponent } from './bp-orders-details.component';
import { BpSuccessorderComponent } from './bp-successorder/bp-successorder.component';
import { BpCanceledorderComponent } from './bp-canceledorder/bp-canceledorder.component';

const routes: Routes = [
  {path: '', component: BpOrdersDetailsComponent,
  children : [
 {path: 'bp-neworder', component: BpNeworderComponent},
 {path: 'bp-placeorder', component: BpPlaceorderComponent},
 {path: 'bp-successorder/:id', component: BpSuccessorderComponent},
 {path: 'bp-canceledorder/:id', component: BpCanceledorderComponent}
  ]}
];


@NgModule({
  declarations: [BpPlaceorderComponent, BpNeworderComponent, BpOrdersDetailsComponent, BpSuccessorderComponent, BpCanceledorderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule
  ]
})
export class BpOrdersDetailsModule { }
