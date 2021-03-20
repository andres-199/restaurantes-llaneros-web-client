import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Direccion } from '../interfaces/direccion.interface'
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
}
