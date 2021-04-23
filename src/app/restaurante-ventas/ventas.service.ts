import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Venta } from '../carrito/interfaces/venta.interface'
import { LoginService } from '../login/login.service'

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  totalVentas = new BehaviorSubject(0)
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.updateTotalVentas()
  }

  confirmVenta(venta: Venta) {
    venta = { id: venta.id, valida: true }
    const url = environment.BACKEND_URL + `ventas`
    return this.http.put<Venta>(url, venta)
  }

  rejectVenta(venta: Venta) {
    venta = { id: venta.id, rechazada: true }
    const url = environment.BACKEND_URL + `ventas`
    return this.http.put<Venta>(url, venta)
  }

  getVentas(restauranteId: number) {
    const url = environment.BACKEND_URL + `restaurantes/${restauranteId}/ventas`
    return this.http.get<Venta[]>(url)
  }

  updateTotalVentas() {
    const user = this.loginService.user || {}
    const restauranteId = user.Tercero?.restaurante_id

    if (restauranteId)
      this.getVentas(restauranteId).subscribe((ventas) => {
        ventas = ventas.filter((venta) => !venta.valida && !venta.rechazada)
        this.totalVentas.next(ventas.length)
      })
  }
}
