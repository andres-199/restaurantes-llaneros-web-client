import { Categoria } from '../categorias/categoria.interface'
import { Carrito } from '../carrito/interfaces/carrito.interface'
import { Imagen } from '../interfaces/imagen.interface'
import { MetodoPago } from '../metodos-pago/metodo-pago.interface'
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
  MetodosPago?: MetodoPago[]
}
