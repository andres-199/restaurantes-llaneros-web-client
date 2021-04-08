import { MetodoPago } from '../metodos-pago/metodo-pago.interface'
import { Carrito } from '../carrito/interfaces/carrito.interface'
import { Direccion } from './direccion.interface'

export interface Orden {
  detalles?: Carrito[]
  direccion_entrega?: Direccion
  metodo_pago?: MetodoPago
  fecha: Date
}
