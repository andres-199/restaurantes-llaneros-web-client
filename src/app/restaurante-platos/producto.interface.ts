import { Categoria } from '../categorias/categoria.interface'
import { Imagen } from '../interfaces/imagen.interface'
import { Restaurante } from '../restaurantes/restaurante.interface'

export interface Producto {
  id?: number
  nombre?: string
  descripcion?: string
  precio?: number
  restaurante_id?: number
  categoria_id?: number
  Imagenes?: Imagen[]
  Categoria?: Categoria
  Restaurant?: Restaurante
}
