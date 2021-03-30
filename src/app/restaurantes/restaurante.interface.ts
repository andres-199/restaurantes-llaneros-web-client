import { Categoria } from '../categorias/categoria.interface'
import { Carrito } from '../interfaces/carrito.interface'
import { Imagen } from '../interfaces/imagen.interface'
import { Mesa } from '../restaurante-mesas/mesa.interface'
import { Producto } from '../restaurante-platos/producto.interface'

export interface Restaurante {
  id?: number
  nombre?: string
  descripcion?: string
  imagen?: Imagen
  Productos?: Producto[]
  Mesas?: Mesa[]
  direccion?: string
  Categorias: Categoria[]
  Ordenes?: Carrito[]
  valorTotalOrdenes?: number
}
