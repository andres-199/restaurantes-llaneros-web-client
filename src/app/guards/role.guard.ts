import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Roles } from '../interfaces/roles.enum'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const path: string = route.routeConfig.path

    switch (path) {
      case 'categorias':
        return this.isAdmin()

      case 'restaurantes':
        return this.isAdmin()

      case 'restaurante/personal':
        return this.isRestaurante()

      case 'restaurante/productos':
        return this.isRestaurante()

      case 'restaurante/mesas':
        return this.isRestaurante()

      case 'restaurante/reservas':
        return this.isRestaurante()

      case 'restaurante/ventas':
        return this.isRestaurante()

      default:
        return false
    }
  }

  private isRestaurante() {
    const user = this.loginService.user
    return user.rol_id === Roles.Restaurante
  }

  private isAdmin() {
    const user = this.loginService.user
    return user.rol_id === Roles.Admin
  }
}
