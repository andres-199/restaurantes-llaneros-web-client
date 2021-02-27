import { Component, OnInit } from '@angular/core'
import { Col } from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { origin } from '../util/origin.enum'
import { Reserva } from './reserva.interface'

@Component({
  selector: 'app-restaurante-reservas',
  templateUrl: './restaurante-reservas.component.html',
  styleUrls: ['./restaurante-reservas.component.css'],
})
export class RestauranteReservasComponent implements OnInit {
  public columnsToDisplay = ['Tercero', 'fecha', 'numero_mesas']

  public cols: Col[] = [
    { header: 'CLIENTE', field: 'Tercero' },
    { header: 'FECHA', field: 'fecha', type: 'date' },
    { header: 'MESAS ', field: 'numero_mesas' },
  ]

  public origin
  public iLoaded = false

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${usuario.Tercero.restaurante_id}/reservas`

    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadReservas(reservas: Reserva[]) {
    reservas = reservas.map((reserva) => {
      reserva.Tercero = reserva.Tercero.nombre as any
      return reserva
    })
  }
}
