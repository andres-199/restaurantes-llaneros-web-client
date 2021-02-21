import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteViewComponent } from './restaurante-view.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'

const routes: Routes = [{ path: ':id', component: RestauranteViewComponent }]

@NgModule({
  declarations: [RestauranteViewComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule],
})
export class RestauranteViewModule {}
