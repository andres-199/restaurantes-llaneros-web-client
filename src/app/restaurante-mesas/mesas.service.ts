import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { MesasConfig } from './restaurante-mesas.component'

@Injectable()
export class MesasService {
  constructor(private http: HttpClient) {}

  createMesas(restauranteId: number, mesasConfig: MesasConfig) {
    const url = `${environment.BACKEND_URL}restaurantes/${restauranteId}/mesas-multiple`
    return this.http.post(url, mesasConfig)
  }
}
