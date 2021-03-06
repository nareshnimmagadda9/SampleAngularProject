import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareComponent } from './share.component';
import { HeaderComponent } from '../share/header/header.component';
import { SidebarComponent } from '../share/sidebar/sidebar.component';
import { FooterComponent } from '../share/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ShareComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ], exports: [HeaderComponent, SidebarComponent,
    FooterComponent]
})
export class ShareModule { }
