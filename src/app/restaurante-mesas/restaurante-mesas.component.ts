import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  Col,
  DinamycCrudComponent,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { origin } from '../util/origin.enum'
import { FormComponent } from './form/form.component'
import { Mesa } from './mesa.interface'

@Component({
  selector: 'app-restaurante-mesas',
  templateUrl: './restaurante-mesas.component.html',
  styleUrls: ['./restaurante-mesas.component.css'],
})
export class RestauranteMesasComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'cupo', 'habilitada', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'CUPO', field: 'cupo' },
    { header: 'HABILITADA ', field: 'habilitada' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'cupo', label: 'Cupo', type: 'number' },
  ]

  public origin
  public usuario: Usuario
  public iLoaded = false
  constructor(private loginService: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${this.usuario.Tercero.restaurante_id}/mesas`

    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadMesas(mesas: Mesa[]) {
    if (!(mesas.length > 0)) this.onCreateMesas()
  }

  onCreateMesas() {
    const dialogRef = this.dialog.open(FormComponent)

    dialogRef.afterClosed().subscribe((mesasConfig) => {
      if (mesasConfig) {
        console.log('mesas config>>>>>>>>>>>>', mesasConfig)
      }
    })
  }
}
