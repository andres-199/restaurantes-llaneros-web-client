import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteMesasComponent } from './restaurante-mesas.component'
import { RouterModule, Routes } from '@angular/router'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { FormModule } from './form/form.module'
import { MesasService } from './mesas.service'
import { ToggleModule } from './toggle/toggle.module'

const routes: Routes = [
  {
    path: '',
    component: RestauranteMesasComponent,
  },
]

@NgModule({
  declarations: [RestauranteMesasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DinamycCrudModule,
    MatCardModule,
    MatDialogModule,
    FormModule,
    ToggleModule,
  ],
  providers: [MesasService],
})
export class RestauranteMesasModule {}
