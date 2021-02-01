import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  Col,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { FilterPeopleComponent } from '../components/filter-people/filter-people.component'
import { Tercero } from '../registro/tercero.interface'
import { origin } from '../util/origin.enum'
import { Restaurante } from './restaurante.interface'

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
})
export class RestaurantesComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'descripcion', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre', width: '25%' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
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

  constructor(private dialog: MatDialog) {}

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

  private addPeople(restaurante: Restaurante, tercero: Tercero) {}
}
