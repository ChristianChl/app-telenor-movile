import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { ItemUsuarioComponent } from './item-usuario/item-usuario.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [
    ListUsuarioComponent,
    ItemUsuarioComponent,
    HeaderComponent,
    AvatarSelectorComponent
  ],
  exports: [
    ListUsuarioComponent,
    HeaderComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
