import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/catalog/login/login.component';
import { DashboardComponent } from './catalog/dashboard/dashboard.component';
import { HomeComponent } from './catalog/home/home.component';
import { ProductsearchComponent } from './Product/productsearch/productsearch.component';
import { ProductcreationComponent } from './Product/productcreation/productcreation.component';
import { ProductstatusComponent } from './Product/productstatus/productstatus.component';
import { ProductComponent } from './Product/product.component';
import { InventoryComponent } from './Inventory/inventory.component';
import { AddinventoryComponent } from './Inventory/addinventory/addinventory.component';


import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'productservices',
    component: ProductComponent,
    canActivate: [AuthGuard],
    children:
      [
        { path: 'productsearch', component: ProductsearchComponent },
        { path: 'createproduct', component: ProductcreationComponent },
        { path: 'productstatus', component: ProductstatusComponent }
      ]
  },
  {
    path: 'inventoryservices',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    children:
      [
        { path: 'createinventory', component: AddinventoryComponent },
      ]
  },
  { path: '', component: HomeComponent, },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
