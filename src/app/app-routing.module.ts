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
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'

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
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
