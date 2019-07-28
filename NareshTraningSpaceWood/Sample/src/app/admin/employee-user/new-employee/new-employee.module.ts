import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEmployeeComponent } from './new-employee.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';

const routes:Routes=[
  {path:'',component:NewEmployeeComponent}
]

@NgModule({
  declarations: [NewEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    DataTablesModule
  ]
})
export class NewEmployeeModule { }
