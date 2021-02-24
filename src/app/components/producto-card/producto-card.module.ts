import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductoCardComponent } from './producto-card.component'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [ProductoCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [ProductoCardComponent],
})
export class ProductoCardModule {}
