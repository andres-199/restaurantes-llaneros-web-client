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

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.restaurante = this.data.restaurante
  }
}
