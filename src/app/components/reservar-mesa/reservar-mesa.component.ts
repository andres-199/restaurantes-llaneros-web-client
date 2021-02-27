import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Reserva } from 'src/app/restaurante-reservas/reserva.interface'
import { Restaurante } from 'src/app/restaurantes/restaurante.interface'

@Component({
  selector: 'app-reservar-mesa',
  templateUrl: './reservar-mesa.component.html',
  styleUrls: ['./reservar-mesa.component.css'],
})
export class ReservarMesaComponent implements OnInit {
  reserva: Reserva = {}
  restaurante: Restaurante
  now

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.restaurante = this.data.restaurante

    const year = new Date().getFullYear()
    const month: any = new Date().getMonth() + 1
    const _month = month < 10 ? `0${month}` : month
    const day = new Date().getDate()
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()

    this.now = `${year}-${_month}-${day}T${hour}:${minute}`
  }
}
