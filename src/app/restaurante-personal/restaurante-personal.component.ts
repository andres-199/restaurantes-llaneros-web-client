import { Component, OnInit } from '@angular/core'
import {
  Col,
  DisableButtonRule,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { origin } from '../util/origin.enum'

@Component({
  selector: 'app-restaurante-personal',
  templateUrl: './restaurante-personal.component.html',
  styleUrls: ['./restaurante-personal.component.css'],
})
export class RestaurantePersonalComponent implements OnInit {
  public columnsToDisplay = [
    'nombre',
    'apellido',
    'identificacion',
    'email',
    'opciones',
  ]
  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'APELLIDO', field: 'apellido' },
    { header: 'IDENTIFICACIÓN', field: 'identificacion' },
    { header: 'CORREO', field: 'email' },
  ]
  public formFields: FormField[] = []
  public origin
  public usuario: Usuario
  public iLoaded = false
  public disableButtonRule: DisableButtonRule

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${this.usuario.Tercero.restaurante_id}/personal`
    this.disableButtonRule = {
      action: 'disableDelete',
      where: { attribute: 'id', value: this.usuario.tercero_id },
    }
    setTimeout(() => {
      this.iLoaded = true
    })
  }
}
