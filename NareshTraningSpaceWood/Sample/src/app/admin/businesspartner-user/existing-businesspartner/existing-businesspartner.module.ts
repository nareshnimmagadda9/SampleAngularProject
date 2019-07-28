import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistingBusinesspartnerComponent } from './existing-businesspartner.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {path:'',component:ExistingBusinesspartnerComponent}
];
@NgModule({
  declarations: [ExistingBusinesspartnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    DataTablesModule
  ]
})
export class ExistingBusinesspartnerModule { }
