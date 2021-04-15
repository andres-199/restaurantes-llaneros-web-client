import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Venta } from 'src/app/carrito/interfaces/venta.interface'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
})
export class OrdenComponent implements OnInit {
  venta: Venta
  showPaymentSupportFull = false
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.venta = this.data.venta
  }

  get paymentSupportThumbnail() {
    return (
      environment.STORAGE_URL +
      this.venta.soporte_pago?.path.replace('original', 'pequeno')
    )
  }

  get paymentSupportFull() {
    return environment.STORAGE_URL + this.venta.soporte_pago?.path
  }
}
