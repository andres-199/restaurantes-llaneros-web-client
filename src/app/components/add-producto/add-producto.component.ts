import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Carrito } from 'src/app/interfaces/carrito.interface'
import { Producto } from 'src/app/restaurante-platos/producto.interface'

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
})
export class AddProductoComponent implements OnInit {
  carrito: Carrito = {}
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.carrito.Producto = this.data.producto
    this.carrito.cantidad = 1
  }
}
