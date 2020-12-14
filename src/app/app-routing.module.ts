import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(res => res.HomeModule) },
  { path: 'restaurantes', loadChildren: () => import('./restaurantes/restaurantes.module').then(res => res.RestaurantesModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
