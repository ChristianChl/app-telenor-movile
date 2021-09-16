import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMarcaPageRoutingModule } from './form-marca-routing.module';

import { FormMarcaPage } from './form-marca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMarcaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormMarcaPage]
})
export class FormMarcaPageModule {}
