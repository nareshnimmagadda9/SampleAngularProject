import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { VendorService } from './auth/vendor.service';
import { CatalogModule } from '../app/catalog/catalog.module';
import { ShareModule } from '../app/share/share.module';
import { ProductModule } from '../app/Product/product.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CatalogModule,
    ShareModule,
    HttpModule,
    ProductModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, VendorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
