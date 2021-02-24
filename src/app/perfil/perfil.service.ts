import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
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
}
