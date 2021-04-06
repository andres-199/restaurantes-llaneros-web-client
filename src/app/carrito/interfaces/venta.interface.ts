import { Direccion } from 'src/app/interfaces/direccion.interface'
import { Imagen } from 'src/app/interfaces/imagen.interface'
import { MetodoPago } from 'src/app/metodos-pago/metodo-pago.interface'

export interface Venta {
  id?: number
  tercero_id?: number
  valor?: number
  fecha?: Date
  restaurante_id?: number
  soporte_pago?: Imagen
  valida?: boolean
  rechazada?: boolean
  direccion_entrega?: Direccion
  metodo_pago?: MetodoPago
}
