import { Component, OnInit } from '@angular/core'
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'

@Component({
  selector: 'app-metodos-pago',
  templateUrl: './metodos-pago.component.html',
  styleUrls: ['./metodos-pago.component.css'],
})
export class MetodosPagoComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'descripcion', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'descripcion', label: 'Descripción', type: 'textArea' },
  ]

  public origin = 'metodos-pago'

  constructor() {}

  ngOnInit(): void {}
}
