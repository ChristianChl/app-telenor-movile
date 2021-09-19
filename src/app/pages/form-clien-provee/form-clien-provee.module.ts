import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormClienProveePageRoutingModule } from './form-clien-provee-routing.module';

import { FormClienProveePage } from './form-clien-provee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClienProveePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormClienProveePage]
})
export class FormClienProveePageModule {}
