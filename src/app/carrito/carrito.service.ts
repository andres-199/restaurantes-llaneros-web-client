import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Carrito } from '../interfaces/carrito.interface'
import { LoginService } from '../login/login.service'

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
}
