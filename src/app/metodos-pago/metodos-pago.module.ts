import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MetodosPagoComponent } from './metodos-pago.component'
import { MatCardModule } from '@angular/material/card'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: MetodosPagoComponent }]

@NgModule({
  declarations: [MetodosPagoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    DinamycCrudModule,
    RouterModule.forChild(routes),
  ],
})
export class MetodosPagoModule {}
