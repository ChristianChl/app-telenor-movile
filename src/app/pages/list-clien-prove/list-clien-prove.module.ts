import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClienProvePageRoutingModule } from './list-clien-prove-routing.module';

import { ListClienProvePage } from './list-clien-prove.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListClienProvePageRoutingModule
  ],
  declarations: [ListClienProvePage]
})
export class ListClienProvePageModule {}
