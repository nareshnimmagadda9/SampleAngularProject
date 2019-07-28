import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinesspartnerComponent } from './businesspartner.component';
import { HttpModule } from '@angular/http';
import { BusinesspartnerRoutingModule } from './businesspartner-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [BusinesspartnerComponent],
  imports: [
    CommonModule,
// tslint:disable-next-line: deprecation
    HttpModule,
    BusinesspartnerRoutingModule,
    SharedModule
  ]
})
export class BusinesspartnerModule { }
