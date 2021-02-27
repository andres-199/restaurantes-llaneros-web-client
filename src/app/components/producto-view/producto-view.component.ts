import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Producto } from 'src/app/restaurante-platos/producto.interface'

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.css'],
})
export class ProductoViewComponent implements OnInit {
  producto: Producto = {}
  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit(): void {
    this.producto = this.data.producto
  }
}
