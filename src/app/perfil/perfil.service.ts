import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Direccion } from '../interfaces/direccion.interface'
import { MetodoPago } from '../metodos-pago/metodo-pago.interface'
import { Tercero } from '../registro/tercero.interface'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { Perfil } from './perfil.interface'

@Injectable()
export class PerfilService {
  constructor(private http: HttpClient) {}

  getPerfil(terceroId: number) {
    const url = environment.BACKEND_URL + `terceros/${terceroId}/perfil`
    return this.http.get<Perfil>(url)
  }

  updateRestaurante(restaurante: Restaurante) {
    const url = environment.BACKEND_URL + 'restaurantes'
    return this.http.put(url, restaurante)
  }

  updateTercero(tercero: Tercero) {
    const url = environment.BACKEND_URL + 'terceros'
    return this.http.put(url, tercero)
  }

  createDireccion(direccion: Direccion) {
    const url = environment.BACKEND_URL + 'direcciones'
    return this.http.post<Direccion>(url, direccion)
  }

  updateDireccion(direccion: Direccion) {
    const url = environment.BACKEND_URL + 'direcciones'
    return this.http.put<Direccion>(url, direccion)
  }

  deleteDireccion(direccionId: number) {
    const url = environment.BACKEND_URL + 'direcciones/' + direccionId
    return this.http.delete(url)
  }

  getPaymentMethods() {
    const url = environment.BACKEND_URL + 'metodos-pago'
    return this.http.get<MetodoPago[]>(url)
  }

  createRestaurantePaymentMethod(paymentMethod: MetodoPago) {
    const url = environment.BACKEND_URL + 'restaurantes-metodos-pago'
    return this.http.post(url, paymentMethod.RestauranteMetodoPago)
  }

  updateRestaurantePaymentMethod(paymentMethod: MetodoPago) {
    const url = environment.BACKEND_URL + 'restaurantes-metodos-pago'
    return this.http.put(url, paymentMethod.RestauranteMetodoPago)
  }

  deleteRestaurantePaymentMethod(paymentMethod: MetodoPago) {
    const url =
      environment.BACKEND_URL +
      'restaurantes-metodos-pago/' +
      paymentMethod.RestauranteMetodoPago.id
    return this.http.delete(url)
  }
}
