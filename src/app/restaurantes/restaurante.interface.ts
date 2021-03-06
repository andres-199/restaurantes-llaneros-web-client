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
}
