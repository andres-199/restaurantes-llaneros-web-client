import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { environment } from 'src/environments/environment'
import {
  Col,
  DinamycCrudComponent,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component'
import { ImagesComponent } from '../components/images/images.component'
import { Imagen } from '../interfaces/imagen.interface'
import { LoginService } from '../login/login.service'
import { Usuario } from '../registro/usuario.interface'
import { origin } from '../util/origin.enum'
import { Producto } from './producto.interface'

/**
 * @todo categorias de producto
 */
@Component({
  selector: 'app-restaurante-platos',
  templateUrl: './restaurante-platos.component.html',
  styleUrls: ['./restaurante-platos.component.css'],
})
export class RestaurantePlatosComponent implements OnInit {
  public columnsToDisplay = [
    'nombre',
    'precio',
    'descripcion',
    'Imagenes',
    'opciones',
  ]

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'nombre' },
    { header: 'PRECIO', field: 'precio' },
    { header: 'DESCRIPCION ', field: 'descripcion' },
    { header: 'IMAGENES', field: 'Imagenes', type: 'image' },
  ]

  public formFields: FormField[] = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'precio', label: 'Precio', type: 'number' },
    { name: 'descripcion', label: 'Descripción', type: 'textArea' },
  ]

  menuOptions: MenuOption[] = [
    {
      icon: 'linked_camera',
      label: 'Imagenes',
      handler: (producto: Producto) => this.onClickImages(producto),
    },
  ]

  public origin
  public usuario: Usuario
  public iLoaded = false

  @ViewChild(DinamycCrudComponent) dinamycCrud: DinamycCrudComponent
  constructor(private loginService: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usuario = this.loginService.user
    this.origin = `${origin.RESTAURANTES}/${this.usuario.Tercero.restaurante_id}/productos`

    setTimeout(() => {
      this.iLoaded = true
    })
  }

  onLoadData(productos: Producto[]) {
    productos = productos.map((producto) => {
      producto.Imagenes = producto.Imagenes.map((imagen) => {
        if (!imagen.path.includes('http'))
          imagen.path =
            environment.STORAGE_URL + imagen.path.replace('original', 'pequeno')
        return imagen
      })
      return producto
    })
  }

  private onClickImages(producto: Producto) {
    const imagenes = producto.Imagenes
    const title = producto.nombre
    const foreignKey = { producto_id: producto.id }
    const data = { imagenes, title, foreignKey }

    const dialogRef = this.dialog.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    })

    const subscription = dialogRef.afterClosed().subscribe({
      next: (imagenes: Imagen[]) => {
        this.dinamycCrud.getDataSource()
      },
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }
}
