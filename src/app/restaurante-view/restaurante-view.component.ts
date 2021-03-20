import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { CarritoService } from '../carrito/carrito.service'
import { Categoria } from '../categorias/categoria.interface'
import { AddProductoComponent } from '../components/add-producto/add-producto.component'
import { ProductoViewComponent } from '../components/producto-view/producto-view.component'
import { ReservarMesaComponent } from '../components/reservar-mesa/reservar-mesa.component'
import { Carrito } from '../interfaces/carrito.interface'
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
  avatarStyle: string
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.restauranteId = this.activatedRoute.snapshot.params['id']
    this.getRestaurante()
  }

  private getRestaurante() {
    this.restaurantesService
      .getById(this.restauranteId)
      .pipe(
        map((restaurante) => {
          const categorias: Categoria[] = []
          for (const producto of restaurante.Productos) {
            const index = categorias.findIndex(
              (categoria) => categoria.id === producto.Categoria.id
            )
            if (index >= 0) {
              categorias[index].Productos.push(producto)
            } else {
              const categoria = producto.Categoria
              categoria.Productos = [producto]
              categorias.push(categoria)
            }
          }
          restaurante.Categorias = categorias
          return restaurante
        })
      )
      .subscribe({
        next: (restaurante: Restaurante) => {
          this.setupImages(restaurante)
          this.restaurante = restaurante
          this.avatarStyle = `background-image: url(${restaurante.imagen.path})`
        },
        error: (err) => {},
      })
  }

  private setupImages(restaurante: Restaurante) {
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

    dialogRef.afterClosed().subscribe({
      next: (reserva: Reserva) => {
        if (reserva) this.createReserva(reserva)
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

  showMsg(message: string, verticalPosition?: 'bottom' | 'top') {
    verticalPosition = verticalPosition || 'bottom'
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
      verticalPosition,
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
    const isLogedIn = this.loginService.isLogedIn
    if (!isLogedIn) {
      const msg =
        'Ingresa con tu cuenta o registrate para agregar productos 🥓🍖🥩🍗🍔🥐🥞🍠🍤🍪🍩🍮 al carrito'
      this.showMsg(msg, 'top')
      return
    }

    const data = { producto }
    const dialogRef = this.dialog.open(AddProductoComponent, {
      width: '500px',
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (carrito: Carrito) => {
        if (carrito) this.addShoppingCart(carrito)
      },
    })
  }

  private addShoppingCart({ Producto, cantidad }: Carrito) {
    const user = this.loginService.user
    const carrito: Carrito = {
      fecha: new Date(),
      producto_id: Producto.id,
      tercero_id: user.tercero_id,
      cantidad,
    }

    this.restaurantesService.addShoppingCart(carrito).subscribe({
      next: (carrito) => {
        this.carritoService.updateTotalOrdenes()
        const msg = `Se agragarón ${cantidad} ${Producto.nombre} al carrito`
        this.showMsg(msg, 'top')
      },
      error: (err) => {
        this.showMsg('No es posible agregar al carrito.')
      },
    })
  }
}
