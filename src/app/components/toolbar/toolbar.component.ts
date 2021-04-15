import { Component, OnInit, ViewChild } from '@angular/core'
import { MatMenuTrigger } from '@angular/material/menu'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/carrito/carrito.service'
import { Roles } from 'src/app/interfaces/roles.enum'
import { LoginService } from 'src/app/login/login.service'
import { Usuario } from 'src/app/registro/usuario.interface'
import { VentasService } from 'src/app/restaurante-ventas/ventas.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isLogedIn: boolean
  user: Usuario
  roles = Roles
  totalOrdenes = 0
  totalVentas = 0
  closeRestauranteMenuTimeOut

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger

  constructor(
    private loginService: LoginService,
    private router: Router,
    private carritoServie: CarritoService,
    private ventaService: VentasService
  ) {}

  ngOnInit() {
    this.isLogedIn = this.loginService.isLogedIn
    this.user = this.loginService.user
    this.carritoServie.totalOrdenes.subscribe((totalOrdenes) => {
      this.totalOrdenes = totalOrdenes
    })
    this.ventaService.totalVentas.subscribe((totalVentas) => {
      this.totalVentas = totalVentas
    })
  }

  onLogin() {
    this.router.navigate(['login'])
  }

  onLogout() {
    this.loginService.logout()
    this.router.navigate([''])
    this.isLogedIn = this.loginService.isLogedIn
    this.carritoServie.updateTotalOrdenes()
  }

  onMouseEnterRestaurante() {
    if (this.closeRestauranteMenuTimeOut) {
      clearTimeout(this.closeRestauranteMenuTimeOut)
    }

    this.menuTrigger.openMenu()
  }

  onMouseLeaveRestaurante() {
    this.closeRestauranteMenuTimeOut = setTimeout(() => {
      this.menuTrigger.closeMenu()
    }, 50)
  }

  onClickHome() {
    this.router.navigate([''])
  }
}
