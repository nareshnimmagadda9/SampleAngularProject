import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { HttpModule } from '@angular/http';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UploadBpordersComponent } from './upload-bporders/upload-bporders.component';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    HttpModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
