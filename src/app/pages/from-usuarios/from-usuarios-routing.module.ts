import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FromUsuariosPage } from './from-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: FromUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FromUsuariosPageRoutingModule {}
