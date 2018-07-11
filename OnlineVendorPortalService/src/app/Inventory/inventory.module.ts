import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { ShareModule } from '../share/share.module';
import { AddinventoryComponent } from '../Inventory/addinventory/addinventory.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule

  ],
  declarations: [InventoryComponent,
    AddinventoryComponent]
})
export class InventoryModule { }
