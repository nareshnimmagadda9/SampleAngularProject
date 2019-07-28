import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsComponent } from './items.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '', component: ItemsComponent,
      children : [
          { path: '', redirectTo: 'item-list' },
          { path: 'item-list', component : ItemsListComponent }
      ]
  }
];
@NgModule({
  declarations: [ItemsComponent, ItemsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule
  ]
})
export class ItemsModule { }
