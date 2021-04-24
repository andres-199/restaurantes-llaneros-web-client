import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReservasComponent } from './reservas.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'

const routes: Routes = [{ path: '', component: ReservasComponent }]

@NgModule({
  declarations: [ReservasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
  ],
})
export class ReservasModule {}
