import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Carrito } from '../interfaces/carrito.interface'
import { Producto } from '../restaurante-platos/producto.interface'
import { CarritoService } from './carrito.service'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  ordenes$: Observable<Carrito[]>

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.ordenes$ = this.carritoService.getOrdenes().pipe(
      map((ordenes) =>
        ordenes.map((orden) => {
          this.setupImages(orden.Producto)
          return orden
        })
      )
    )

    this.ordenes$.subscribe((ordenes) => {
      console.log(ordenes)
    })
  }

  private setupImages(producto: Producto) {
    producto.Imagenes = producto.Imagenes.map((imagen) => {
      imagen.path =
        environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
      return imagen
    })
    return producto
  }
}
