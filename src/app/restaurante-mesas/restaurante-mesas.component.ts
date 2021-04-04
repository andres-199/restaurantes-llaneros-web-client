import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  Col,
  DinamycCrudComponent,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { origin } from '../util/origin.enum'
import { FormComponent } from './form/form.component'
import { Mesa } from './mesa.interface'
import { MesasService } from './mesas.service'
import { ToggleComponent } from './toggle/toggle.component'

export interface MesasConfig {
  cupoMesas: number
  cantidadMesas: number
}

@Component({
  selector: 'app-restaurante-mesas',
  templateUrl: './restaurante-mesas.component.html',
  styleUrls: ['./restaurante-mesas.component.css'],
})
export class RestauranteMesasComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'cupo', 'habilitada_text', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'CUPO', field: 'cupo' },
    { header: 'HABILITADA ', field: 'habilitada_text' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'cupo', label: 'Cupo', type: 'number' },
  ]

  public origin
  public usuario: Usuario
  public iLoaded = false
  public menuOptions: MenuOption[] = [
    {
      icon: 'restore',
      label: 'Cambiar de estado',
      handler: (mesa: Mesa) => {
        this.changeStatus(mesa)
      },
    },
  ]

  @ViewChild(DinamycCrudComponent) dinamycCrud: DinamycCrudComponent
  constructor(
    private loginService: LoginService,
    private dialog: MatDialog,
    private mesasService: MesasService
  ) {}

  ngOnInit(): void {
    this.usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${this.usuario.Tercero.restaurante_id}/mesas`

    setTimeout(() => {
      this.iLoaded = true
    })
  }

  changeStatus(mesa: Mesa) {
    const dialogRef = this.dialog.open(ToggleComponent, { data: mesa })
    dialogRef.afterClosed().subscribe((_mesa: Mesa) => {
      if (_mesa) {
        this.dinamycCrud.update(mesa)
      }
    })
  }

  onLoadMesas(mesas: Mesa[]) {
    if (!(mesas.length > 0)) {
      this.onCreateMesas()
      return
    }
    mesas = mesas.map((mesa) => {
      mesa.habilitada_text = mesa.habilitada ? 'Sí' : 'No'
      return mesa
    })
  }

  private onCreateMesas() {
    const dialogRef = this.dialog.open(FormComponent)

    dialogRef.afterClosed().subscribe((mesasConfig) => {
      if (mesasConfig) {
        this.createMesas(mesasConfig)
      }
    })
  }

  private createMesas(mesasConfig: MesasConfig) {
    const restauranteId = this.usuario.Tercero.restaurante_id
    const subscription = this.mesasService
      .createMesas(restauranteId, mesasConfig)
      .subscribe({
        next: (response) => {
          this.dinamycCrud.getDataSource()
          this.dinamycCrud.onSuccess()
        },
        error: (err) => {},
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }
}
