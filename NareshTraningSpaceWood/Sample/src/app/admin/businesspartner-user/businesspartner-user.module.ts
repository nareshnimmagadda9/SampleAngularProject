import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BusinesspartnerUserRoutingModule } from './businesspartner-user-routing.module';
import { BusinesspartnerUserComponent } from './businesspartner-user.component';


@NgModule({
  declarations: [BusinesspartnerUserComponent],
  imports: [
    CommonModule,
    HttpModule,
    BusinesspartnerUserRoutingModule
  ]
})
export class BusinesspartnerUserModule { }
