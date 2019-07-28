
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BusinesspartnerComponent } from './businesspartner.component';

const routes: Routes = [{
  path: '', component: BusinesspartnerComponent,
  
  children: [
    {path: '', redirectTo: 'items'},
    {path: 'items', loadChildren: './items/items.module#ItemsModule'},
    {path: 'orders', loadChildren: './orders/orders.module#OrdersModule'}
     ]
}];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BusinesspartnerRoutingModule { }
