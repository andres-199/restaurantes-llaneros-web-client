import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'
import { AddDireccionComponent } from 'src/app/components/add-direccion/add-direccion.component'
import { Carrito } from 'src/app/interfaces/carrito.interface'
import { Direccion } from 'src/app/interfaces/direccion.interface'
import { Orden } from 'src/app/interfaces/orden.interface'
import { LoginService } from 'src/app/login/login.service'
import { MetodoPago } from 'src/app/metodos-pago/metodo-pago.interface'
import { PerfilService } from 'src/app/perfil/perfil.service'
import { Tercero } from 'src/app/registro/tercero.interface'
import { Restaurante } from 'src/app/restaurantes/restaurante.interface'
import { CarritoService } from '../carrito.service'

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers: [PerfilService],
})
export class PurchaseComponent implements OnInit {
  restaurante: Restaurante
  ordenes: Carrito[]
  step = 0
  tercero: Tercero
  metodosPago: MetodoPago[]
  direccionSelected: Direccion
  metodoPagoSelected: MetodoPago
  ordenVenta

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: LoginService,
    private perfilService: PerfilService,
    private dialog: MatDialog,
    private carritoService: CarritoService,
    private dialogRef: MatDialogRef<PurchaseComponent>
  ) {}

  ngOnInit(): void {
    this.restaurante = this.data?.restaurante
    this.ordenes = this.data?.ordenes
    this.getPerfil()
    this.getPaymentMethods()
  }

  private getPerfil() {
    const user = this.userService.user
    this.perfilService.getPerfil(user.tercero_id).subscribe({
      next: (perfil) => {
        if (perfil) {
          this.tercero = perfil.Tercero
        }
      },
    })
  }

  private getPaymentMethods() {
    this.carritoService.getPaymentMethods(this.restaurante.id).subscribe({
      next: (paymentMethods) => {
        this.metodosPago = paymentMethods
      },
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
    direccion.tercero_id = this.tercero.id
    this.perfilService.createDireccion(direccion).subscribe({
      next: (_direccion) => {
        this.getPerfil()
      },
    })
  }

  onCLickDireccion(directionList) {
    this.direccionSelected = directionList.selectedOptions.selected[0]?.value
  }

  onCLickMetodoPago(paymentMethodList) {
    this.metodoPagoSelected =
      paymentMethodList.selectedOptions.selected[0]?.value
  }

  onClickOrdenar() {
    this.createOrden()
  }

  private createOrden() {
    const orden: Orden = {
      fecha: new Date(),
      detalles: this.ordenes,
      direccion_entrega: this.direccionSelected,
      metodo_pago: this.metodoPagoSelected,
    }

    return this.carritoService.createOrden(orden).subscribe({
      next: (_orden) => {
        if (this.metodoPagoSelected.contra_entrega) this.dialogRef.close(_orden)
        else this.ordenVenta = _orden
      },
    })
  }
}
