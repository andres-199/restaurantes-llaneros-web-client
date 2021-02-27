import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { AddProductoComponent } from '../components/add-producto/add-producto.component'
import { ProductoViewComponent } from '../components/producto-view/producto-view.component'
import { ReservarMesaComponent } from '../components/reservar-mesa/reservar-mesa.component'
import { LoginService } from '../login/login.service'
import { Producto } from '../restaurante-platos/producto.interface'
import { Reserva } from '../restaurante-reservas/reserva.interface'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { RestaurantesService } from '../restaurantes/restaurantes.service'

@Component({
  selector: 'app-restaurante-view',
  templateUrl: './restaurante-view.component.html',
  styleUrls: ['./restaurante-view.component.css'],
})
export class RestauranteViewComponent implements OnInit {
  restaurante: Restaurante
  restauranteId: number
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.restauranteId = this.activatedRoute.snapshot.params['id']
    this.getRestaurante()
  }

  private getRestaurante() {
    const susbcription = this.restaurantesService
      .getById(this.restauranteId)
      .subscribe({
        next: (restaurante: Restaurante) => {
          this.setupImges(restaurante)
          this.restaurante = restaurante
        },
        error: (err) => {},
        complete: () => {
          susbcription.unsubscribe()
        },
      })
  }

  private setupImges(restaurante: Restaurante) {
    const imagen = restaurante.imagen
    if (imagen) {
      restaurante.imagen.path =
        environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
    }

    restaurante.Productos = restaurante.Productos.map((producto) => {
      producto.Imagenes = producto.Imagenes.map((imagen) => {
        imagen.path =
          environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
        return imagen
      })
      return producto
    })
  }

  onClickReservar() {
    const data = { restaurante: this.restaurante }
    const dialogRef = this.dialog.open(ReservarMesaComponent, {
      width: '350px',
      data,
    })

    const subscription = dialogRef.afterClosed().subscribe({
      next: (reserva: Reserva) => {
        if (reserva) this.createReserva(reserva)
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }

  createReserva(reserva: Reserva) {
    const user = this.loginService.user
    reserva.tercero_id = user.tercero_id
    reserva.restaurante_id = this.restauranteId

    const subscription = this.restaurantesService
      .createReserva(reserva)
      .subscribe({
        next: (_reserva) => {
          const msg = `Se reservarón ${
            _reserva.numero_mesas
          } mesas para el ${_reserva.fecha.toLocaleString()}`
          this.showMsg(msg)
        },
        error: (err) => {},
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }

  showMsg(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
    })
  }

  onClickView(producto: Producto) {
    this.showProduct(producto)
  }

  private showProduct(producto: Producto) {
    const data = { producto }
    const dialogRef = this.dialog.open(ProductoViewComponent, {
      width: '500px',
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (producto: Producto) => {
        if (producto) this.onClickShoppingCart(producto)
      },
    })
  }

  onClickShoppingCart(producto: Producto) {
    const data = { producto }
    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '500px',
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (producto: Producto) => {},
    })
  }
}
