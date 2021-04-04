import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestaurantePlatosComponent } from './restaurante-platos.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { ImagesModule } from '../components/images/images.module'

const routes: Routes = [{ path: '', component: RestaurantePlatosComponent }]

@NgModule({
  declarations: [RestaurantePlatosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
    MatDialogModule,
    ImagesModule,
  ],
})
export class RestaurantePlatosModule {}
