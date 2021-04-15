import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Carrito } from './interfaces/carrito.interface'
import { Orden } from '../interfaces/orden.interface'
import { LoginService } from '../login/login.service'
import { MetodoPago } from '../metodos-pago/metodo-pago.interface'
import { Venta } from './interfaces/venta.interface'

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  totalOrdenes = new BehaviorSubject(0)
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.updateTotalOrdenes()
  }

  getOrdenes() {
    const terceroId = this.loginService.user?.tercero_id
    const url = environment.BACKEND_URL + `terceros/${terceroId}/ordenes`
    return this.http
      .get<Carrito[]>(url)
      .pipe(tap((ordenes) => this.totalOrdenes.next(ordenes.length)))
  }

  updateTotalOrdenes() {
    const user = this.loginService.user
    if (user) {
      this.getOrdenes().subscribe((ordenes) => {
        this.totalOrdenes.next(ordenes.length)
      })
    }
  }

  deleteOrden(orden: Carrito) {
    const url = environment.BACKEND_URL + `carrito/${orden.id}`
    return this.http.delete(url)
  }

  getPaymentMethods(restauranteId: number) {
    const url =
      environment.BACKEND_URL + `restaurantes/${restauranteId}/metodos-pago`
    return this.http.get<MetodoPago[]>(url)
  }

  createOrden(orden: Orden) {
    const url = environment.BACKEND_URL + 'carrito/ordenar'
    return this.http.post<Orden>(url, orden)
  }

  updateOrdenVenta(venta: Venta) {
    const url = environment.BACKEND_URL + 'ventas'
    return this.http.put<Venta>(url, venta)
  }
}
