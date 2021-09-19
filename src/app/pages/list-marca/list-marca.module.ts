import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMarcaPageRoutingModule } from './list-marca-routing.module';

import { ListMarcaPage } from './list-marca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMarcaPageRoutingModule
  ],
  declarations: [ListMarcaPage]
})
export class ListMarcaPageModule {}
