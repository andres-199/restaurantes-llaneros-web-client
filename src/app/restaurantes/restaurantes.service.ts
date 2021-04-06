import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Categoria } from '../categorias/categoria.interface'
import { Carrito } from '../carrito/interfaces/carrito.interface'
import { Tercero } from '../registro/tercero.interface'
import { Reserva } from '../restaurante-reservas/reserva.interface'
import { Restaurante } from './restaurante.interface'

@Injectable({
  providedIn: 'root',
})
export class RestaurantesService {
  constructor(private http: HttpClient) {}

  addPeople(tercero: Tercero) {
    const url = environment.BACKEND_URL + 'restaurantes/agregar-personal'
    return this.http.post(url, tercero)
  }

  getById(restauranteId: number) {
    const url = environment.BACKEND_URL + `restaurantes/${restauranteId}`
    return this.http.get<Restaurante>(url)
  }

  createReserva(reserva: Reserva) {
    const url = environment.BACKEND_URL + 'reservas'
    return this.http.post<Reserva>(url, reserva)
  }

  addShoppingCart(carrito: Carrito) {
    const url = environment.BACKEND_URL + 'carrito'
    return this.http.post<Carrito>(url, carrito)
  }

  getCategorias() {
    const url = environment.BACKEND_URL + 'categorias'
    return this.http.get<Categoria[]>(url)
  }
}
