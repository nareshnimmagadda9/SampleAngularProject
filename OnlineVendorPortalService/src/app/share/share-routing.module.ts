import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '~/../src/app/catalog/home/home.component';
import{DashboardComponent} from '~/../src/app/catalog/dashboard/dashboard.component';


const routes: Routes = [
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
export class ShareRoutingModule { }
