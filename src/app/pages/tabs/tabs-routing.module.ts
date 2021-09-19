import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
        
      },
      {
        path: 'listPersonas',
        loadChildren: () => import('../list-clien-prove/list-clien-prove.module').then( m => m.ListClienProvePageModule)
      },
      {
        path: 'listProductos',
        loadChildren: () => import('../list-producto/list-producto.module').then( m => m.ListProductoPageModule)
      },
      {
        path: 'listMarca',
        loadChildren: () => import('../list-marca/list-marca.module').then( m => m.ListMarcaPageModule)
      },
      {
        path: 'listCategoria',
        loadChildren: () => import('../list-categoria/list-categoria.module').then( m => m.ListCategoriaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
