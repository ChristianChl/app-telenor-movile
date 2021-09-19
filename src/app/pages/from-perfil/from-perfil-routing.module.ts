import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FromPerfilPage } from './from-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: FromPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FromPerfilPageRoutingModule {}
