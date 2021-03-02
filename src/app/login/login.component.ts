import { Component, OnInit } from '@angular/core'
import md5 from 'md5'
import { LoginService } from './login.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { Usuario } from '../registro/usuario.interface'
import { SnackBarActions } from '../registro/registro.component'
import { HttpErrorResponse } from '@angular/common/http'
import { CarritoService } from '../carrito/carrito.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {
  username: string
  password: string
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {}

  public onLogin() {
    if (!this.username || !this.password) {
      return false
    }

    const loginData: Usuario = {
      usuario: this.username,
      contrasena: md5(this.password),
    }

    const subscription = this.loginService.login(loginData).subscribe({
      next: (user) => {
        this.loginService.user = user
        this.router.navigate([''])
        this.carritoService.updateTotalOrdenes()
      },
      error: (e: HttpErrorResponse) => {
        this.snackBar.open(e.error.error, SnackBarActions.Aceptar)
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }
}
