import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { Venta } from '../carrito/interfaces/venta.interface'
import {
  Col,
  DinamycCrudComponent,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Producto } from '../restaurante-platos/producto.interface'
import { OrdenComponent } from './orden/orden.component'
import { VentasService } from './ventas.service'

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

  public origin
  public iLoaded = false

  @ViewChild(DinamycCrudComponent) dinamycCrud: DinamycCrudComponent
  constructor(
    private dialog: MatDialog,
    private ventaServise: VentasService,
    private _snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const user = this.loginService.user
    this.origin = `restaurantes/${user.Tercero.restaurante_id}/ventas`
    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadVentas(ventas: Venta[]) {
    this.ventaServise.updateTotalVentas()
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
    const dialogRef = this.dialog.open(OrdenComponent, {
      minWidth: '600px',
      maxWidth: '700px',
      data: { venta },
    })

    dialogRef.afterClosed().subscribe((acepted) => {
      if (acepted) this.confirmVenta(venta)
      else if (acepted === false) this.rejectVenta(venta)
    })
  }

  private confirmVenta(venta: Venta) {
    this.ventaServise.confirmVenta(venta).subscribe({
      next: (_venta) => {
        const msg = `La orden de venta No. ${venta.id} fue aceptada y se le notificará al cliente que su pedido será enviado 🏍`
        this.showMsg(msg, 'top')
        this.dinamycCrud.getDataSource()
      },
    })
  }

  private rejectVenta(venta: Venta) {
    this.ventaServise.rejectVenta(venta).subscribe({
      next: (_venta) => {
        const msg = `La orden de venta No. ${venta.id} fue rechazada y se le notificará al cliente para que verifique la información.`
        this.showMsg(msg, 'top')
        this.dinamycCrud.getDataSource()
      },
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

  private showMsg(message: string, verticalPosition: any = 'bottom') {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
      verticalPosition,
    })
  }
}
