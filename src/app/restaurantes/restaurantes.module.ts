import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestaurantesComponent } from './restaurantes.component'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatCardModule } from '@angular/material/card'
import { RouterModule, Routes } from '@angular/router'
import { MatDialogModule } from '@angular/material/dialog'
import { FilterPeopleModule } from '../components/filter-people/filter-people.module'

export const routes: Routes = [{ path: '', component: RestaurantesComponent }]

@NgModule({
  declarations: [RestaurantesComponent],
  imports: [
    CommonModule,
    DinamycCrudModule,
    MatCardModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    FilterPeopleModule,
  ],
})
export class RestaurantesModule {}
