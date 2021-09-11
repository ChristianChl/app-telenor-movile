import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ListUsuarioComponent,
    ItemUsuarioComponent
  ],
  exports: [
    ListUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
