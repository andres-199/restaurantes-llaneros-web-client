import { Component, OnInit } from '@angular/core'
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { origin } from '../util/origin.enum'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
})
export class CategoriasComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'descripcion', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción', type: 'textArea' },
  ]

  public origin = origin.CATEGORIAS

  constructor() {}

  ngOnInit(): void {}
}
