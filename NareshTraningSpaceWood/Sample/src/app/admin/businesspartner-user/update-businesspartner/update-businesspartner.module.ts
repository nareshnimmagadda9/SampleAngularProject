import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateBusinesspartnerComponent } from './update-businesspartner.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


const routes:Routes=[
  {path:'',component:UpdateBusinesspartnerComponent}
]
@NgModule({
  declarations: [UpdateBusinesspartnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpModule
  ]
})
export class UpdateBusinesspartnerModule { }
