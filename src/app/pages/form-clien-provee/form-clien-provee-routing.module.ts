import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormClienProveePage } from './form-clien-provee.page';

const routes: Routes = [
  {
    path: '',
    component: FormClienProveePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormClienProveePageRoutingModule {}
