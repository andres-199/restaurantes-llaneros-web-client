import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { Venta } from '../carrito/interfaces/venta.interface'
import { PurchaseComponent } from '../carrito/purchase/purchase.component'
import {
  Col,
  DinamycCrudComponent,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Producto } from '../restaurante-platos/producto.interface'
import { OrdenComponent } from '../restaurante-ventas/orden/orden.component'

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
    'opciones',
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
  @ViewChild(DinamycCrudComponent) dinamycCrud: DinamycCrudComponent
  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

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

      compra['telefono'] = compra.direccion_entrega.telefono
      compra.direccion_entrega = compra.direccion_entrega.direccion as any

      compra['productos'] = []
      for (const detalle of compra.DetalleVenta) {
        const producto = `${detalle.cantidad} ${detalle.Producto.nombre}`
        compra['productos'].push(producto)
        detalle.Producto = this.setupImages(detalle.Producto)
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

  onClickCompra(compra: Venta) {
    const isContraEntrega = compra.metodo_pago.contra_entrega
    const soportePago = compra.soporte_pago

    if (compra.rechazada || (!isContraEntrega && !soportePago))
      this.onSupportLoad(compra)
    else this.showOrden(compra)
  }

  private showOrden(compra: Venta) {
    const dialogRef = this.dialog.open(OrdenComponent, {
      minWidth: '600px',
      maxWidth: '700px',
      data: { compra },
    })
  }

  private onSupportLoad(compra: Venta) {
    const dialogRef = this.dialog.open(PurchaseComponent, {
      data: { restaurante: compra.Restaurant, ordenVenta: compra },
      minWidth: '500px',
      maxWidth: '700px',
    })

    dialogRef.afterClosed().subscribe((orden) => {
      if (orden) {
        this.dinamycCrud.getDataSource()
        const msg =
          'Orden registrada ✔, en un momento el Restaurante revisará tu orden.'
        this.showMsg(msg, 'top')
      }
    })
  }

  private showMsg(message: string, verticalPosition: any = 'bottom') {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
      verticalPosition,
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
