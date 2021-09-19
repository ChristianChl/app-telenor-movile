import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'form-clien-provee',
    loadChildren: () => import('./pages/form-clien-provee/form-clien-provee.module').then( m => m.FormClienProveePageModule)
  },
  {
    path: 'form-categoria',
    loadChildren: () => import('./pages/form-categoria/form-categoria.module').then( m => m.FormCategoriaPageModule)
  },
  {
    path: 'form-marca',
    loadChildren: () => import('./pages/form-marca/form-marca.module').then( m => m.FormMarcaPageModule)
  },
  {
    path: 'from-usuarios',
    loadChildren: () => import('./pages/from-usuarios/from-usuarios.module').then( m => m.FromUsuariosPageModule)
  },
  {
    path: 'from-tipo-documento',
    loadChildren: () => import('./pages/from-tipo-documento/from-tipo-documento.module').then( m => m.FromTipoDocumentoPageModule)
  },
  {
    path: 'from-perfil',
    loadChildren: () => import('./pages/from-perfil/from-perfil.module').then( m => m.FromPerfilPageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'

  },
  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
