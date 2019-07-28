import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',component: AdminComponent,
      children : [
          {path: '', redirectTo: 'employee-user'},
          { path: 'businesspartner-user', loadChildren: './businesspartner-user/businesspartner-user.module#BusinesspartnerUserModule' },
          { path: 'employee-user', loadChildren: './employee-user/employee-user.module#EmployeeUserModule' }]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports : [RouterModule]
})
export class AdminRoutingModule { }

