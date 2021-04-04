import { Direccion } from '../interfaces/direccion.interface'
import { Usuario } from './usuario.interface'

export interface Tercero {
  id?: number
  nombre?: string
  apellido?: string
  email?: string
  identificacion?: string
  restaurante_id?: number
  Usuario?: Usuario
  Direcciones?: Direccion[]
}
