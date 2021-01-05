import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Tercero } from './tercero.interface'

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  register(tercero: Tercero) {
    const url = environment.BACKEND_URL + 'terceros'
    return this.http.post(url, tercero)
  }
}
