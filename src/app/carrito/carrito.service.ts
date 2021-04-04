import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Carrito } from '../interfaces/carrito.interface'
import { LoginService } from '../login/login.service'
import { MetodoPago } from '../metodos-pago/metodo-pago.interface'

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  totalOrdenes = new BehaviorSubject<number>(0)
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.updateTotalOrdenes()
  }

  getOrdenes() {
    const terceroId = this.loginService.user?.tercero_id
    const url = environment.BACKEND_URL + `terceros/${terceroId}/ordenes`
    return this.http.get<Carrito[]>(url)
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
}
