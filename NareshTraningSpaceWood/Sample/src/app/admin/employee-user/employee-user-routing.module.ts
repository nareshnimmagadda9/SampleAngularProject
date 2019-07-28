import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeUserComponent } from './employee-user.component';

const routes:Routes=[{
  path:'',component:EmployeeUserComponent,
  children:[
    {path: '', redirectTo: 'new-employee'},
    {path:'existing-employee',loadChildren:'./existing-employee/existing-employee.module#ExistingEmployeeModule'},
    {path:'new-employee',loadChildren:'./new-employee/new-employee.module#NewEmployeeModule'},
    {path:'update-employee/:id',loadChildren:'./update-employee/update-employee.module#UpdateEmployeeModule'}
  ]
}];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class EmployeeUserRoutingModule { }
