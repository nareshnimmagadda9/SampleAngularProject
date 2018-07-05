import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
// Services
import { AuthService } from './auth/auth.service';
import { VendorService } from './auth/vendor.service';
import { QrCodeReader } from './auth/qr-code-reader.service';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CatalogModule } from '../app/catalog/catalog.module';
import { ShareModule } from '../app/share/share.module';
import { ProductModule } from '../app/Product/product.module';
import { InventoryModule } from '../app/Inventory/inventory.module';

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
    InventoryModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, VendorService, QrCodeReader],
  bootstrap: [AppComponent]
})
export class AppModule { }
