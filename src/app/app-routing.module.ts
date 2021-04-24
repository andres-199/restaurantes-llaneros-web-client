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
    path: 'restaurante/view',
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
  {
    path: 'restaurante/personal',
    loadChildren: () =>
      import('./restaurante-personal/restaurante-personal.module').then(
        (res) => res.RestaurantePersonalModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'restaurante/productos',
    loadChildren: () =>
      import('./restaurante-platos/restaurante-platos.module').then(
        (res) => res.RestaurantePlatosModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then((res) => res.PerfilModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'restaurante/mesas',
    loadChildren: () =>
      import('./restaurante-mesas/restaurante-mesas.module').then(
        (res) => res.RestauranteMesasModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'restaurante/reservas',
    loadChildren: () =>
      import('./restaurante-reservas/restaurante-reservas.module').then(
        (res) => res.RestauranteReservasModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'restaurante/ventas',
    loadChildren: () =>
      import('./restaurante-ventas/restaurante-ventas.module').then(
        (res) => res.RestauranteVentasModule
      ),
    canActivate: [LoginGuard, RoleGuard],
  },
  {
    path: 'carrito',
    loadChildren: () =>
      import('./carrito/carrito.module').then((res) => res.CarritoModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'metodos-pago',
    loadChildren: () =>
      import('./metodos-pago/metodos-pago.module').then(
        (res) => res.MetodosPagoModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'compras',
    loadChildren: () =>
      import('./compras/compras.module').then((r) => r.ComprasModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'mis-reservas',
    loadChildren: () =>
      import('./reservas/reservas.module').then((res) => res.ReservasModule),
    canActivate: [LoginGuard],
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
