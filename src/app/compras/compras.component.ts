import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Venta } from '../carrito/interfaces/venta.interface'
import { Col } from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  public columnsToDisplay = [
    'fecha',
    'Restaurant',
    'productos',
    'valor',
    'metodo_pago',
    'estado',
  ]

  public cols: Col[] = [
    { header: 'FECHA', field: 'fecha', type: 'date', width: '15%' },
    { header: 'RESTAURANTE', field: 'Restaurant', type: 'payment-method' },
    { header: 'PRODUCTOS', field: 'productos', type: 'list' },
    { header: 'VALOR', field: 'valor', type: 'money' },
    { header: 'METODO DE PAGO', field: 'metodo_pago', type: 'payment-method' },
    { header: 'ESTADO', field: 'estado', type: 'chips' },
  ]

  public origin
  public iLoaded = false
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const user = this.loginService.user
    this.origin = `terceros/${user.tercero_id}/compras`
    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadCompras(compras: Venta[]) {
    compras = compras.map((compra) => {
      compra.Restaurant.imagen = (environment.STORAGE_URL +
        compra.Restaurant.imagen.path) as any

      compra['productos'] = []
      for (const detalle of compra.DetalleVenta) {
        const producto = `${detalle.cantidad} ${detalle.Producto.nombre}`
        compra['productos'].push(producto)
      }

      compra['estado'] = compra.valida
        ? [{ text: 'Aprovada', color: 'primary' }]
        : compra.rechazada
        ? [{ text: 'Rechazada', color: 'warn' }]
        : !compra.soporte_pago && !compra.metodo_pago.contra_entrega
        ? [{ text: 'Sin Soporte de Pago', color: 'warn' }]
        : [{ text: 'Pendiente', color: 'accent' }]

      return compra
    })
  }

  onClickCompra(compra: Venta) {}
}
