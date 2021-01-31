import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { RegistroService } from './registro.service'
import { Tercero } from './tercero.interface'
import md5 from 'md5'
import { BackendResponse } from '../interfaces/backend-response.interface'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
export enum SnackBarActions {
  Aceptar = 'Aceptar',
}
export type PasswordRegister = { psw1?: string; psw2?: string }
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  password: PasswordRegister
  tercero: Tercero
  url_image = environment.IMAGES_URL + '3YvFXvDrFyM'
  constructor(
    private snackBar: MatSnackBar,
    private service: RegistroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tercero = {}
    this.password = {}
  }

  onSubmit(form) {
    if (!form.valid) {
      this.snackBar.open(
        'Debe llenar los campos marcados con "*"',
        SnackBarActions.Aceptar
      )
      return false
    }

    if (this.password.psw1 !== this.password.psw2) {
      this.snackBar.open(
        'Las contraseñas no coinciden',
        SnackBarActions.Aceptar
      )
      return false
    }

    this.tercero.Usuario = {
      user: this.tercero.email,
      password: md5(this.password.psw1),
    }

    this.register()
  }

  private register() {
    const subscription = this.service.register(this.tercero).subscribe({
      next: (response: BackendResponse) => {
        this.snackBar
          .open(response.message, SnackBarActions.Aceptar)
          .afterDismissed()
          .subscribe({
            next: () => {
              this.router.navigate(['login'])
            },
          })
      },
      error: (e: HttpErrorResponse) => {
        this.snackBar.open(e.error.message, SnackBarActions.Aceptar)
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }
}
