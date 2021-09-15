import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductoPageRoutingModule } from './list-producto-routing.module';

import { ListProductoPage } from './list-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductoPageRoutingModule
  ],
  declarations: [ListProductoPage]
})
export class ListProductoPageModule {}
