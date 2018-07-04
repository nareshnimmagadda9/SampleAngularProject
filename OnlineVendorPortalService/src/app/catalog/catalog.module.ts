import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';


import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatSlideToggleModule
} from '@angular/material';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import { CatalogComponent } from './catalog.component';
import { DashboardComponent } from '../catalog/dashboard/dashboard.component';
import { HomeComponent } from '../catalog/home/home.component';
import { LoginComponent } from 'src/app/catalog/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,FormsModule, ReactiveFormsModule,ShareModule
  ],
  declarations: [
    CatalogComponent,
    DashboardComponent,
    HomeComponent, LoginComponent
    ]
})
export class CatalogModule { }
