import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterModule, Routes } from '@angular/router'
import { CrudService } from '../components/dinamyc-crud/crud.service'
import { RestauranteCardModule } from '../components/restaurante-card/restaurante-card.module'
import { MatCardModule } from '@angular/material/card'
import { IvyCarouselModule } from 'angular-responsive-carousel'

const routes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RestauranteCardModule,
    MatCardModule,
    IvyCarouselModule,
  ],
  providers: [CrudService],
})
export class HomeModule {}
