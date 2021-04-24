import { Component, OnInit } from '@angular/core'
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Reserva } from '../restaurante-reservas/reserva.interface'

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  public columnsToDisplay = [
    'restaurante',
    'direccion',
    'fecha',
    'numero_mesas',
    'opciones',
  ]

  public cols: Col[] = [
    { header: 'RESTAURANTE', field: 'restaurante' },
    { header: 'DIRECCIÓN', field: 'direccion' },
    { header: 'FECHA', field: 'fecha', type: 'date' },
    { header: 'MESAS ', field: 'numero_mesas' },
  ]

  public origin
  public iLoaded = false

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const user = this.loginService.user
    this.origin = `terceros/${user.tercero_id}/reservas`
    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadReservas(reservas: Reserva[]) {
    reservas = reservas.map((reserva) => {
      reserva['restaurante'] = reserva.Restaurant?.nombre
      reserva['direccion'] = reserva.Restaurant?.direccion
      return reserva
    })
    console.log(reservas)
  }
}
