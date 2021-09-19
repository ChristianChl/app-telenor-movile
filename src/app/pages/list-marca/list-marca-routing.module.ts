import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMarcaPage } from './list-marca.page';

const routes: Routes = [
  {
    path: '',
    component: ListMarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMarcaPageRoutingModule {}
