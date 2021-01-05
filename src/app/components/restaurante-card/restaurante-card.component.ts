import { Component, Input, OnInit } from '@angular/core'
import { Restaurante } from 'src/app/restaurantes/restaurante.interface'

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.component.html',
  styleUrls: ['./restaurante-card.component.css'],
})
export class RestauranteCardComponent implements OnInit {
  @Input() restaurante: Restaurante
  constructor() {}

  ngOnInit(): void {}
}
