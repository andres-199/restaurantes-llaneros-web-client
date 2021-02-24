import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReservarMesaComponent } from './reservar-mesa.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [ReservarMesaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class ReservarMesaModule {}
