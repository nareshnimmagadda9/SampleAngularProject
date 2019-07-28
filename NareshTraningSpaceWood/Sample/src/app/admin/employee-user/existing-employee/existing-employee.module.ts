import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExistingEmployeeComponent } from './existing-employee.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';

const routes:Routes=[
  {path:'',component:ExistingEmployeeComponent}
]
@NgModule({
  declarations: [ExistingEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    DataTablesModule
  ]
})
export class ExistingEmployeeModule { }
