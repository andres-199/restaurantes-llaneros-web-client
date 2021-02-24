import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { ReservarMesaComponent } from '../components/reservar-mesa/reservar-mesa.component'
import { LoginService } from '../login/login.service'
import { Reserva } from '../restaurante-reservas/reserva.interface'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { RestaurantesService } from '../restaurantes/restaurantes.service'

@Component({
  selector: 'app-restaurante-view',
  templateUrl: './restaurante-view.component.html',
  styleUrls: ['./restaurante-view.component.css'],
})
export class RestauranteViewComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantesService: RestaurantesService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}
  restaurante: Restaurante
  restauranteId: number
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
        this.createReserva(reserva)
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
}
