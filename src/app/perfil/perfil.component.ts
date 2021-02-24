import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { ImageService } from '../components/images/image.service'
import { Imagen } from '../interfaces/imagen.interface'
import { Roles } from '../interfaces/roles.enum'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { Perfil } from './perfil.interface'
import { PerfilService } from './perfil.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  iLoaded = false
  showRestauranteTab = false
  perfil: Perfil
  loadingPhoto = false
  user: Usuario
  imagen: Imagen
  constructor(
    private loginService: LoginService,
    private perfilService: PerfilService,
    private imageService: ImageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.user
    if (this.user.rol_id === Roles.Restaurante) this.showRestauranteTab = true
    this.getPerfil(this.user.tercero_id)
  }

  private getPerfil(terceroId: number) {
    const subscription = this.perfilService.getPerfil(terceroId).subscribe({
      next: (perfil) => {
        this.perfil = perfil
        if (this.user.rol_id === Roles.Restaurante) {
          this.setImagen()
        }
      },
      error: (err) => {},
      complete: () => {
        this.iLoaded = true
        this.loadingPhoto = false
        subscription.unsubscribe()
      },
    })
  }

  private setImagen() {
    const imagen = this.perfil.Restaurante?.imagen
    if (imagen) {
      this.imagen = { ...imagen }
      if (!this.imagen.path.includes('http')) {
        this.imagen.path =
          environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
      }
    } else {
      this.imagen = {
        path: 'assets/images/profile-no-img.png',
      }
    }
  }

  onLoadRestauranteImage(files: File[]) {
    this.loadingPhoto = true
    const subscription = this.imageService.uploadImg(files[0]).subscribe({
      next: (images) => {
        this.perfil.Restaurante.imagen = images[0]
        this.updateRestaurante()
      },
      error: (err) => {},
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }

  onSubmitInfoPersonal() {
    this.updateTercero()
  }

  onSubmitInfoRestaurante() {
    this.updateRestaurante()
  }

  private updateRestaurante() {
    const subscription = this.perfilService
      .updateRestaurante(this.perfil.Restaurante)
      .subscribe({
        next: (res) => {
          this.getPerfil(this.user.tercero_id)
          const msg = 'Se actualizó la información del restaurante'
          this.showMsg(msg)
        },
        error: (err) => {},
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }

  private updateTercero() {
    const subscription = this.perfilService
      .updateTercero(this.perfil.Tercero)
      .subscribe({
        next: (res) => {
          this.getPerfil(this.user.tercero_id)
          const msg = 'Se actualizó la información personal'
          this.showMsg(msg)
        },
        error: (err) => {},
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }

  private showMsg(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 7000,
    })
  }
}
