import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BusinesspartnerUserComponent } from './businesspartner-user.component';

const routes:Routes=[{
  path:'',component:BusinesspartnerUserComponent,
  children:[
    {path: '', redirectTo: 'new-businesspartner'},
    {path:'existing-businesspartner',loadChildren:'./existing-businesspartner/existing-businesspartner.module#ExistingBusinesspartnerModule'},
    {path:'new-businesspartner',loadChildren:'./new-businesspartner/new-businesspartner.module#NewBusinesspartnerModule'},
    {path:'update-businesspartner/:id',loadChildren:'./update-businesspartner/update-businesspartner.module#UpdateBusinesspartnerModule'}
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
export class BusinesspartnerUserRoutingModule { }
