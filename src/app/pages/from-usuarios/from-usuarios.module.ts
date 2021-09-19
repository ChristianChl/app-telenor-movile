import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FromUsuariosPageRoutingModule } from './from-usuarios-routing.module';

import { FromUsuariosPage } from './from-usuarios.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    FromUsuariosPageRoutingModule
  ],
  declarations: [FromUsuariosPage]
})
export class FromUsuariosPageModule {}
