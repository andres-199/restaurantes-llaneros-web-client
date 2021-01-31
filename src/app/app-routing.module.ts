import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginGuard } from './guards/login.guard'
import { LogoutGuard } from './guards/logout.guard'
import { RoleGuard } from './guards/role.guard'

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
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then(
        (res) => res.CategoriasModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'restaurante',
    loadChildren: () =>
      import('./restaurante-view/restaurante-view.module').then(
        (res) => res.RestauranteViewModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((res) => res.LoginModule),
    canActivate: [LogoutGuard],
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((res) => res.RegistroModule),
    canActivate: [LogoutGuard],
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
