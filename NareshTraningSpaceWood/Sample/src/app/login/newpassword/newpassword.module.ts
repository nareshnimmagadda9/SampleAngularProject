import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NewpasswordComponent } from './newpassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'',component:NewpasswordComponent}
]
@NgModule({
  declarations: [NewpasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ]
})
export class NewpasswordModule { }
