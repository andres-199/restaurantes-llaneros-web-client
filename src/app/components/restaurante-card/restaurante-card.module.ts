import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RestauranteCardComponent } from './restaurante-card.component'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [RestauranteCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [RestauranteCardComponent],
})
export class RestauranteCardModule {}
