import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormComponent } from './form.component'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class FormModule {}
