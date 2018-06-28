import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../catalog/dashboard/dashboard.component'
import { ProductcreationComponent } from './dashboard/Product/productcreation/productcreation.component';
import { ProductsearchComponent } from './dashboard/Product/productsearch/productsearch.component';
import { ProductstatusComponent } from './dashboard/Product/productstatus/productstatus.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'Creation', component: ProductcreationComponent }
    ]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'Search', component: ProductsearchComponent, }]
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'Status', component: ProductstatusComponent }]
  },
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
export class CatalogRoutingModule { }
