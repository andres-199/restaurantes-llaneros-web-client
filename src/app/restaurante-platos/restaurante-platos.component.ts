import { Component, OnInit } from '@angular/core'
import {
  Col,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { origin } from '../util/origin.enum'

@Component({
  selector: 'app-restaurante-platos',
  templateUrl: './restaurante-platos.component.html',
  styleUrls: ['./restaurante-platos.component.css'],
})
export class RestaurantePlatosComponent implements OnInit {
  public columnsToDisplay = ['nombre', 'precio', 'descripcion', 'opciones']

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'PRECIO', field: 'precio' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'precio', label: 'Precio', type: 'number' },
    { name: 'descripcion', label: 'Descripción', type: 'textArea' },
  ]

  public origin
  public usuario: Usuario
  public iLoaded = false
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${this.usuario.Tercero.restaurante_id}/productos`

    setTimeout(() => {
      this.iLoaded = true
    })
  }
}
