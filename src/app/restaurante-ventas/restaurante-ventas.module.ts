import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteVentasComponent } from './restaurante-ventas.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: RestauranteVentasComponent,
  },
]

@NgModule({
  declarations: [RestauranteVentasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RestauranteVentasModule {}
