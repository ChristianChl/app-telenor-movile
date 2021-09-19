import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FromTipoDocumentoPageRoutingModule } from './from-tipo-documento-routing.module';

import { FromTipoDocumentoPage } from './from-tipo-documento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FromTipoDocumentoPageRoutingModule
  ],
  declarations: [FromTipoDocumentoPage]
})
export class FromTipoDocumentoPageModule {}
