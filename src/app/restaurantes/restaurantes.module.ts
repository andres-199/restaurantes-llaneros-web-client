import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestaurantesComponent } from './restaurantes.component'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatCardModule } from '@angular/material/card'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [{ path: '', component: RestaurantesComponent }]

@NgModule({
  declarations: [RestaurantesComponent],
  imports: [
    CommonModule, DinamycCrudModule,
    MatCardModule
    , RouterModule.forChild(routes)
  ]
})
export class RestaurantesModule { }
