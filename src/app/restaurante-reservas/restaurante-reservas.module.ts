import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteReservasComponent } from './restaurante-reservas.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: RestauranteReservasComponent }]

@NgModule({
  declarations: [RestauranteReservasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RestauranteReservasModule {}
