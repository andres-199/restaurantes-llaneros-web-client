import { Producto } from '../restaurante-platos/producto.interface'

export interface Categoria {
  id?: number
  nombre?: string
  descripcion?: string
  Productos?: Producto[]
}
