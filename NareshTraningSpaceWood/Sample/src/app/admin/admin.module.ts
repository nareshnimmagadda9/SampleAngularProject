import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HttpModule } from '@angular/http';
import { BusinesspartnerUserRoutingModule } from './businesspartner-user/businesspartner-user-routing.module';
import { EmployeeUserRoutingModule } from './employee-user/employee-user-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    HttpModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
