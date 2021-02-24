import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteViewComponent } from './restaurante-view.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { ProductoCardModule } from '../components/producto-card/producto-card.module'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { ReservarMesaModule } from '../components/reservar-mesa/reservar-mesa.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [{ path: ':id', component: RestauranteViewComponent }]

@NgModule({
  declarations: [RestauranteViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    ProductoCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReservarMesaModule,
    MatSnackBarModule,
  ],
})
export class RestauranteViewModule {}
