import { Inject, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddPaymentMethodComponent } from './add-payment-method.component'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MetodoPago } from 'src/app/metodos-pago/metodo-pago.interface'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [AddPaymentMethodComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
  ],
})
export class AddPaymentMethodModule {}
