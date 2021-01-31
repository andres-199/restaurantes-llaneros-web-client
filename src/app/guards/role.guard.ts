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
      default:
        return true
    }
  }

  private isAdmin() {
    const user = this.loginService.user
    return user.rol_id === Roles.Admin
  }
}
