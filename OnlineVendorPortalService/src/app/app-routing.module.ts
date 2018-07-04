import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/catalog/login/login.component';
import { DashboardComponent } from './catalog/dashboard/dashboard.component';
import { HomeComponent } from './catalog/home/home.component';
import { ProductComponent } from './Product/product.component';
import { ProductsearchComponent } from './Product/productsearch/productsearch.component';
import { ProductcreationComponent } from './Product/productcreation/productcreation.component';
import { ProductstatusComponent } from './Product/productstatus/productstatus.component';

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
    path: 'product',
    component: ProductComponent,
    children:
      [
        
        { path: 'ProductSearch', component: ProductsearchComponent },
        { path: 'CreateProduct', component: ProductcreationComponent },
        { path: 'ProductStatus', component: ProductstatusComponent }
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
