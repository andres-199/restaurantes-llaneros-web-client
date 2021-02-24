import { Component, Input, OnInit } from '@angular/core'
import { Producto } from 'src/app/restaurante-platos/producto.interface'

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css'],
})
export class ProductoCardComponent implements OnInit {
  @Input() producto: Producto
  constructor() {}

  ngOnInit(): void {}
}
