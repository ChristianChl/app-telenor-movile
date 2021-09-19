import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FromPerfilPageRoutingModule } from './from-perfil-routing.module';

import { FromPerfilPage } from './from-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FromPerfilPageRoutingModule
  ],
  declarations: [FromPerfilPage]
})
export class FromPerfilPageModule {}
