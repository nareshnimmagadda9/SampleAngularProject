import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBusinesspartnerComponent } from './new-businesspartner.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes:Routes=[
    {path:'',component:NewBusinesspartnerComponent}
]
@NgModule({
  declarations: [NewBusinesspartnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    DataTablesModule
  ]
})
export class NewBusinesspartnerModule { }
