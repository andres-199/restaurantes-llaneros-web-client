import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToggleComponent } from './toggle.component'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [ToggleComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class ToggleModule {}
