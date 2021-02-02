import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Tercero } from '../registro/tercero.interface'
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
}
