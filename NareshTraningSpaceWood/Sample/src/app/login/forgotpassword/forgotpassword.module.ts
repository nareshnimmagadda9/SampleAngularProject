import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotpasswordComponent } from './forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes=[
  {path:'',component:ForgotpasswordComponent}
]
@NgModule({
  declarations: [ForgotpasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    ReactiveFormsModule
  ]
})
export class ForgotpasswordModule { }
