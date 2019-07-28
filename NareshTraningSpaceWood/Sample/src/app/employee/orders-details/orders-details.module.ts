import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersDetailsComponent } from './orders-details.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: '', component: OrdersDetailsComponent}
];
@NgModule({
  declarations: [OrdersDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    ReactiveFormsModule
  ]
})
export class OrdersDetailsModule { }
