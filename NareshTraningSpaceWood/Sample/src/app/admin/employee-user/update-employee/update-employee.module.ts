import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateEmployeeComponent } from './update-employee.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'',component:UpdateEmployeeComponent}
]
@NgModule({
  declarations: [UpdateEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TabsModule.forRoot()
  ]
})
export class UpdateEmployeeModule { }
