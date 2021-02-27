import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Producto } from 'src/app/restaurante-platos/producto.interface'

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css'],
})
export class ProductoCardComponent implements OnInit {
  @Input() producto: Producto
  @Input() hideActions = false

  @Output() onClickView = new EventEmitter<Producto>()
  @Output() onClickShoppingCart = new EventEmitter<Producto>()
  constructor() {}

  ngOnInit(): void {}
}
