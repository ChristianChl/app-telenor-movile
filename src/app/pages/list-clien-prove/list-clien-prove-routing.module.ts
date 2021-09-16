import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListClienProvePage } from './list-clien-prove.page';

const routes: Routes = [
  {
    path: '',
    component: ListClienProvePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListClienProvePageRoutingModule {}
