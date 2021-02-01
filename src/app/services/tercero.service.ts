import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TerceroService {
  constructor(private http: HttpClient) {}

  search(value: string) {
    const url = environment.BACKEND_URL + 'terceros/buscar'
    return this.http.get(url, { params: { value } })
  }
}
