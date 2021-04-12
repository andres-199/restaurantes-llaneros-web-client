import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { environment } from 'src/environments/environment'
import { Venta } from '../carrito/interfaces/venta.interface'
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { Producto } from '../restaurante-platos/producto.interface'
import { OrdenComponent } from './orden/orden.component'

@Component({
  selector: 'app-restaurante-ventas',
  templateUrl: './restaurante-ventas.component.html',
  styleUrls: ['./restaurante-ventas.component.css'],
})
export class RestauranteVentasComponent implements OnInit {
  public columnsToDisplay = [
    'fecha',
    'Tercero',
    'telefono',
    'direccion_entrega',
    'valor',
    'metodo_pago',
    'estado',
  ]

  public cols: Col[] = [
    { header: 'FECHA', field: 'fecha', type: 'date' },
    { header: 'CLIENTE', field: 'Tercero' },
    { header: 'TELEFONO ', field: 'telefono' },
    { header: 'DIRECCIÓN', field: 'direccion_entrega' },
    { header: 'VALOR', field: 'valor', type: 'money' },
    { header: 'METODO DE PAGO', field: 'metodo_pago', type: 'payment-method' },
    { header: 'ESTADO', field: 'estado', type: 'chips' },
  ]

  public origin = 'ventas'

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onLoadVentas(ventas: Venta[]) {
    console.log(ventas)

    ventas = ventas.map((venta) => {
      const { nombre, apellido } = venta.Tercero
      venta.Tercero = (nombre + ' ' + apellido) as any
      venta['telefono'] = venta.direccion_entrega.telefono
      venta.direccion_entrega = venta.direccion_entrega.direccion as any
      venta['estado'] = venta.valida
        ? [{ text: 'Aprovada', color: 'accent' }]
        : venta.rechazada
        ? [{ text: 'Rechazada', color: 'primary' }]
        : [{ text: 'Pendiente', color: 'warn' }]

      venta.DetalleVenta = venta.DetalleVenta.map((detalle) => {
        detalle.Producto = this.setupImages(detalle.Producto)
        return detalle
      })

      return venta
    })
  }

  onClickVenta(venta: Venta) {
    console.log(venta)

    const dialogRef = this.dialog.open(OrdenComponent, {
      minWidth: '600px',
      maxWidth: '700px',
      data: { venta },
    })
  }

  private setupImages(producto: Producto) {
    producto.Imagenes = producto.Imagenes.map((imagen) => {
      imagen.path =
        environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
      return imagen
    })
    return producto
  }
}
