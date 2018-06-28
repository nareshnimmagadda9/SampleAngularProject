import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/catalog/login/login.component';
import { DashboardComponent } from './catalog/dashboard/dashboard.component';
import { HomeComponent } from './catalog/home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,

  }, {
    path: '',
    component: HomeComponent,

  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
