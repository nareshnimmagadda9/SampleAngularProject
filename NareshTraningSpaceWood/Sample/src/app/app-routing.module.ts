import { RouteGuardService } from './guards/route-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch : 'full' , redirectTo: 'login'},
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'forgotpassword', loadChildren: './login/forgotpassword/forgotpassword.module#ForgotpasswordModule' },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    canLoad: [RouteGuardService], data: { expectedRole: 'admin'}
   },

  {
    path: 'business-partner', loadChildren: './businesspartner/businesspartner.module#BusinesspartnerModule',
     canLoad: [RouteGuardService], data: { expectedRole: 'business-partner' }
  },
  { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule',
  canLoad: [RouteGuardService], data: { expectedRole: 'employee' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }


