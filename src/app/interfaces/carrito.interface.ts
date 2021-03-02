import { Producto } from '../restaurante-platos/producto.interface'

export interface Carrito {
  id?: number
  tercero_id?: number
  producto_id?: number
  cantidad?: number
  fecha?: Date
  Producto?: Producto
}
