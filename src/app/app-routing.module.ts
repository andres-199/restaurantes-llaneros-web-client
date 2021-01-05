import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((res) => res.HomeModule),
  },
  {
    path: 'restaurantes',
    loadChildren: () =>
      import('./restaurantes/restaurantes.module').then(
        (res) => res.RestaurantesModule
      ),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then(
        (res) => res.CategoriasModule
      ),
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
