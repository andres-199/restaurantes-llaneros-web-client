import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AddDireccionComponent } from 'src/app/components/add-direccion/add-direccion.component'
import { Carrito } from 'src/app/interfaces/carrito.interface'
import { Direccion } from 'src/app/interfaces/direccion.interface'
import { LoginService } from 'src/app/login/login.service'
import { PerfilService } from 'src/app/perfil/perfil.service'
import { Tercero } from 'src/app/registro/tercero.interface'
import { Restaurante } from 'src/app/restaurantes/restaurante.interface'

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: LoginService,
    private perfilService: PerfilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.restaurante = this.data?.restaurante
    this.ordenes = this.data?.ordenes
    this.getPerfil()
  }

  getPerfil() {
    const user = this.userService.user
    this.perfilService.getPerfil(user.tercero_id).subscribe({
      next: (perfil) => {
        if (perfil) {
          this.tercero = perfil.Tercero
        }
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
        //handle
      },
    })
  }
}
