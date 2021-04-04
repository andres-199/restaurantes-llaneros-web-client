import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddProductoComponent } from './add-producto.component'
import { ProductoCardModule } from '../producto-card/producto-card.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [AddProductoComponent],
  imports: [
    CommonModule,
    ProductoCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class AddProductoModule {}
