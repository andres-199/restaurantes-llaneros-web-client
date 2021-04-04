import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { ConfirmComponent } from '../carrito/confirm/confirm.component'
import { AddDireccionComponent } from '../components/add-direccion/add-direccion.component'
import { ImageService } from '../components/images/image.service'
import { Direccion } from '../interfaces/direccion.interface'
import { Imagen } from '../interfaces/imagen.interface'
import { Roles } from '../interfaces/roles.enum'
import { LoginService } from '../login/login.service'
import { MetodoPago } from '../metodos-pago/metodo-pago.interface'
import { Usuario } from '../registro/usuario.interface'
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component'
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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
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

  onClickAddDirection() {
    const dialogRef = this.dialog.open(AddDireccionComponent, {
      width: '450px',
    })

    dialogRef.afterClosed().subscribe({
      next: (direccion: Direccion) => {
        if (direccion) this.createDireccion(direccion)
      },
    })
  }

  private createDireccion(direccion: Direccion) {
    direccion.tercero_id = this.perfil.Tercero.id
    this.perfilService.createDireccion(direccion).subscribe({
      next: (_direccion) => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se registró la dirección ${_direccion.direccion}`
        this.showMsg(msg)
      },
    })
  }

  onClickEditDireccion(direccion: Direccion) {
    const data = { direccion }
    const dialogRef = this.dialog.open(AddDireccionComponent, {
      width: '450px',
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (direccion: Direccion) => {
        if (direccion) this.updateDireccion(direccion)
      },
    })
  }

  private updateDireccion(direccion: Direccion) {
    this.perfilService.updateDireccion(direccion).subscribe({
      next: (_direccion) => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se actualizó la dirección `
        this.showMsg(msg)
      },
    })
  }

  onClickDeleteDireccion(direccion: Direccion) {
    this.perfilService.deleteDireccion(direccion.id).subscribe({
      next: () => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se Eliminó la dirección `
        this.showMsg(msg)
      },
    })
  }

  onClickAddPaymentMethod() {
    const dialogRef = this.dialog.open(AddPaymentMethodComponent, {
      width: '450px',
    })

    dialogRef.afterClosed().subscribe({
      next: (paymentMethod: MetodoPago) => {
        if (paymentMethod) this.addPaymentMethod(paymentMethod)
      },
    })
  }

  private addPaymentMethod(paymentMethod: MetodoPago) {
    paymentMethod.RestauranteMetodoPago.restaurante_id = this.user.Tercero?.restaurante_id

    this.perfilService.createRestaurantePaymentMethod(paymentMethod).subscribe({
      next: (response) => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se agregó el metodo de pago 💳 ${paymentMethod.nombre}`
        this.showMsg(msg)
      },
    })
  }

  onClickUpdatePaymentMethod(paymentMethod: MetodoPago) {
    const dialogRef = this.dialog.open(AddPaymentMethodComponent, {
      width: '450px',
      data: { paymentMethod },
    })

    dialogRef.afterClosed().subscribe({
      next: (paymentMethod: MetodoPago) => {
        if (paymentMethod) this.updatePaymentMethod(paymentMethod)
      },
    })
  }

  private updatePaymentMethod(paymentMethod: MetodoPago) {
    this.perfilService.updateRestaurantePaymentMethod(paymentMethod).subscribe({
      next: (response) => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se actualizó el metodo de pago 💳 ${paymentMethod.nombre}`
        this.showMsg(msg)
      },
    })
  }

  onClickDeletePaymentMethod(paymentMethod: MetodoPago) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Eliminar Metodo de Pago',
        body: 'Desea eliminar el metodo se pago ' + paymentMethod.nombre + '?',
      },
    })

    dialogRef.afterClosed().subscribe((del) => {
      if (del) this.deletePaymentMethod(paymentMethod)
    })
  }

  private deletePaymentMethod(paymentMethod: MetodoPago) {
    this.perfilService.deleteRestaurantePaymentMethod(paymentMethod).subscribe({
      next: (response) => {
        this.getPerfil(this.user.tercero_id)
        const msg = `Se eliminó el metodo de pago 💳 ${paymentMethod.nombre}`
        this.showMsg(msg)
      },
    })
  }
}
