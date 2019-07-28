import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadBpordersComponent } from './upload-bporders.component';
import { TabsModule } from 'ngx-bootstrap';

const routes: Routes = [
  {path: '', component: UploadBpordersComponent}
];
@NgModule({
  declarations: [UploadBpordersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ]
})
export class UploadBpordersModule { }
