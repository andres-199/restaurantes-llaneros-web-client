import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  Col,
  DinamycCrudComponent,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { FilterPeopleComponent } from '../components/filter-people/filter-people.component'
import { SnackBarActions } from '../registro/registro.component'
import { Tercero } from '../registro/tercero.interface'
import { origin } from '../util/origin.enum'
import { Restaurante } from './restaurante.interface'
import { RestaurantesService } from './restaurantes.service'

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
})
export class RestaurantesComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'descripcion', 'Personal', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre', width: '25%' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
    { header: 'PERSONAL', field: 'Personal', width: '20%', type: 'list' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción', type: 'textArea' },
  ]

  public origin = origin.RESTAURANTES

  menuOptions: MenuOption[] = [
    {
      icon: 'people',
      label: 'Agregar personal',
      handler: (restaurante) => this.onAddPeople(restaurante),
    },
  ]

  @ViewChild(DinamycCrudComponent) dinamycCrud: DinamycCrudComponent
  constructor(
    private dialog: MatDialog,
    private restauranteService: RestaurantesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  private onAddPeople(restaurante: Restaurante) {
    const data = {
      title: restaurante.nombre,
    }

    const dialogRef = this.dialog.open(FilterPeopleComponent, {
      data,
      minWidth: '500px',
    })

    const subscription = dialogRef.afterClosed().subscribe({
      next: (tercero: Tercero) => {
        this.addPeople(restaurante, tercero)
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }

  private addPeople(restaurante: Restaurante, tercero: Tercero) {
    tercero.restaurante_id = restaurante.id
    const subscription = this.restauranteService.addPeople(tercero).subscribe({
      next: (response: any) => {
        this.dinamycCrud.getDataSource()
        this.snackBar.open(response?.message, SnackBarActions.Aceptar)
      },
      error: (e) => {},
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }
}
