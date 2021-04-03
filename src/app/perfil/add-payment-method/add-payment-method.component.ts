import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MetodoPago } from 'src/app/metodos-pago/metodo-pago.interface'
import { PerfilService } from '../perfil.service'

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css'],
  providers: [PerfilService],
})
export class AddPaymentMethodComponent implements OnInit {
  metodoPago: MetodoPago
  paymentMethods: MetodoPago[]
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.metodoPago = this.data?.paymentMethod || { RestauranteMetodoPago: {} }
    this.getPaymenthMethods()
  }

  private getPaymenthMethods() {
    this.perfilService.getPaymentMethods().subscribe({
      next: (paymenthMethods) => {
        this.paymentMethods = paymenthMethods
      },
    })
  }

  onChangePaymentMethod(paymentMethod: MetodoPago) {
    this.metodoPago = { ...this.metodoPago, ...paymentMethod }
  }
}
