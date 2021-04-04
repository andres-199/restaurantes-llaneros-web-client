import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddDireccionComponent } from './add-direccion.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AddDireccionComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [AddDireccionComponent],
})
export class AddDireccionModule {}
