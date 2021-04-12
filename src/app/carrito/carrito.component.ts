import { Component, OnInit } from '@angular/core'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { MatDialog } from '@angular/material/dialog'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Carrito } from './interfaces/carrito.interface'
import { Producto } from '../restaurante-platos/producto.interface'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { CarritoService } from './carrito.service'
import { ConfirmComponent } from './confirm/confirm.component'
import { PurchaseComponent } from './purchase/purchase.component'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  restaurantes$: Observable<Restaurante[]>
  restaurantes: Restaurante[] = []
  ordenesSelected: MatListOption[] = []
  iLoaded = false

  constructor(
    private carritoService: CarritoService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRestaurantes()
  }

  private getRestaurantes() {
    this.restaurantes$ = this.carritoService.getOrdenes().pipe(
      map((ordenes) =>
        ordenes.map((orden) => {
          this.setupImages(orden.Producto)
          return orden
        })
      ),
      map((ordenes) => {
        const restaurantes: Restaurante[] = []
        for (const orden of ordenes) {
          const index = restaurantes.findIndex(
            (restaurante) => restaurante.id == orden.Producto.restaurante_id
          )
          if (index >= 0) {
            restaurantes[index].Ordenes.push(orden)
          } else {
            const restaurante = { ...orden.Producto.Restaurant }
            restaurante.valorTotalOrdenes = 0
            restaurante.Ordenes = [orden]
            restaurantes.push(restaurante)
          }
        }
        return restaurantes
      })
    )

    this.restaurantes$.subscribe({
      next: (restaurantes) => {
        this.restaurantes = restaurantes
        this.iLoaded = true
      },
    })
  }

  onToggleAllOrders(
    ordenes: MatSelectionList,
    restaurante: Restaurante,
    event: MatCheckboxChange
  ) {
    if (event.checked) {
      ordenes.selectAll()
      for (const orden of ordenes.selectedOptions.selected) {
        const found = this.ordenesSelected.includes(orden)
        if (!found) this.ordenesSelected.push(orden)
      }
    } else {
      ordenes.selectedOptions.selected.forEach((orden) => {
        const index = this.ordenesSelected.indexOf(orden)
        if (index >= 0) this.ordenesSelected.splice(index, 1)
      })
      ordenes.deselectAll()
    }

    this.calculateValorTotalOrdenes(ordenes, restaurante)
  }

  private calculateValorTotalOrdenes(
    ordenes: MatSelectionList,
    restaurante: Restaurante
  ) {
    restaurante.valorTotalOrdenes = 0
    ordenes.options.forEach((option) => {
      if (option.selected) {
        const orden: Carrito = option.value
        restaurante.valorTotalOrdenes += orden.cantidad * orden.Producto.precio
      }
    })
  }

  onToggleOrder(orden: MatListOption, restaurante: Restaurante) {
    const _orden: Carrito = orden.value
    const total = _orden.cantidad * _orden.Producto.precio
    if (orden.selected) {
      restaurante.valorTotalOrdenes += total
      this.ordenesSelected.push(orden)
    } else {
      restaurante.valorTotalOrdenes -= total
      const index = this.ordenesSelected.indexOf(orden)
      if (index >= 0) this.ordenesSelected.splice(index, 1)
    }
  }

  private setupImages(producto: Producto) {
    producto.Imagenes = producto.Imagenes.map((imagen) => {
      imagen.path =
        environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
      return imagen
    })
    return producto
  }

  onClickDelete() {
    if (this.ordenesSelected?.length > 0) {
      const data = { ordenes: this.ordenesSelected.length }
      const dialogRef = this.dialog.open(ConfirmComponent, { data })

      dialogRef.afterClosed().subscribe((confirm) => {
        if (confirm) this.deleteSelectedOrders()
      })
    }
  }

  private async deleteSelectedOrders() {
    for (const orden of this.ordenesSelected) {
      const _orden: Carrito = orden.value

      await this.carritoService.deleteOrden(_orden).toPromise()

      for (const [i, restaurante] of this.restaurantes.entries()) {
        const index = restaurante.Ordenes.indexOf(_orden)
        if (index >= 0) restaurante.Ordenes.splice(index, 1)
        if (restaurante.Ordenes.length < 1) this.restaurantes.splice(i, 1)
      }
      const msg = `Se eliminó ${_orden.Producto?.nombre} del carrito ✔`
      this.showMsg(msg)
    }

    this.ordenesSelected = []
  }

  private showMsg(message: string, verticalPosition: any = 'bottom') {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
      verticalPosition,
    })
  }

  onClickOrdenar(restaurante: Restaurante) {
    let ordenes: Carrito[] = []
    for (const orden of this.ordenesSelected) {
      const _orden = orden.value
      const found = restaurante.Ordenes.includes(_orden)
      if (found) ordenes.push(_orden)
    }

    if (!(ordenes.length > 0)) {
      const msg = 'Selecciona almenos un producto 🍗🥓🥩🍖'
      this.showMsg(msg)
      return false
    }

    const dialogRef = this.dialog.open(PurchaseComponent, {
      data: { restaurante, ordenes },
      minWidth: '500px',
      maxWidth: '700px',
    })

    dialogRef.afterClosed().subscribe((orden) => {
      if (orden) {
        this.getRestaurantes()
        const msg =
          'Orden registrada ✔, en um momento el Restaurante revisará tu orden.'
        this.showMsg(msg, 'top')
      }
    })
  }
}
