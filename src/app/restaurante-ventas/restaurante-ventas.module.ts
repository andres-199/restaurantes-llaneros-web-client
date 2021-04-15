import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteVentasComponent } from './restaurante-ventas.component'
import { RouterModule, Routes } from '@angular/router'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { OrdenModule } from './orden/orden.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [
  {
    path: '',
    component: RestauranteVentasComponent,
  },
]

@NgModule({
  declarations: [RestauranteVentasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DinamycCrudModule,
    MatCardModule,
    MatDialogModule,
    OrdenModule,
    MatSnackBarModule,
  ],
})
export class RestauranteVentasModule {}
