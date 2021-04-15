import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
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

  getVentas() {
    const user = this.loginService.user
    const url =
      environment.BACKEND_URL +
      `restaurantes/${user.Tercero.restaurante_id}/ventas`
    return this.http.get<Venta[]>(url)
  }

  updateTotalVentas() {
    this.getVentas().subscribe((ventas) => {
      this.totalVentas.next(ventas.length)
    })
  }
}
