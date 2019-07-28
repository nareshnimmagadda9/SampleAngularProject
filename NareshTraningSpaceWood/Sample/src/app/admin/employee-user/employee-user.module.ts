import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeUserRoutingModule } from './employee-user-routing.module';
import {HttpModule} from '@angular/http';
import { EmployeeUserComponent } from './employee-user.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [EmployeeUserComponent],
  imports: [
    CommonModule,
    HttpModule,
    EmployeeUserRoutingModule,
    DataTablesModule
  ]
})
export class EmployeeUserModule { }
