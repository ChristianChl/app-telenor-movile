import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FromTipoDocumentoPage } from './from-tipo-documento.page';

const routes: Routes = [
  {
    path: '',
    component: FromTipoDocumentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FromTipoDocumentoPageRoutingModule {}
