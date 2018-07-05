import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { ShareModule } from '../share/share.module';
import { AddinventoryComponent } from '../Inventory/addinventory/addinventory.component';


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule
  ],
  declarations: [InventoryComponent,
    AddinventoryComponent]
})
export class InventoryModule { }
