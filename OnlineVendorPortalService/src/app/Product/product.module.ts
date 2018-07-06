import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../Product/product.component';
import { ShareModule } from '../share/share.module';
import { ProductsearchComponent } from '../Product/productsearch/productsearch.component';
import { ProductcreationComponent } from '../Product/productcreation/productcreation.component';
import { ProductstatusComponent } from '../Product/productstatus/productstatus.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
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
  declarations: [ProductComponent, ProductsearchComponent,ProductcreationComponent,ProductstatusComponent],
})
export class ProductModule { }
