import { Component, OnInit } from '@angular/core'
import { CrudService } from '../components/dinamyc-crud/crud.service'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { origin } from '../util/origin.enum'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { Imagen } from '../interfaces/imagen.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  restaurantes: Restaurante[]

  imagenes: Imagen[] = [
    {path:'https://restaurantesllaneros.com:3602/original/fedfc99c-9c5a-4d8e-a5c1-8d7a7877c1f0.webp'},
    {path:'https://restaurantesllaneros.com:3602/original/87e502b5-f87a-4c39-b9d7-5726a1dfb4d5.webp'},
    {path:'https://restaurantesllaneros.com:3602/original/8313352c-fd8e-454f-8191-eece60a1e7c3.webp'},
    {path:'https://restaurantesllaneros.com:3602/original/50bd0c6d-7867-4cd5-9c3c-88ff4d901ad1.webp'}
   
  ]

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit() {
    this.getRestaurantes()
  }

  private getRestaurantes() {
    const subscription = this.crudService
      .findAll<Restaurante>(origin.RESTAURANTES)
      .pipe(
        map((restaurantes) => {
          restaurantes = restaurantes.map((restaurante) => {
            const imagen = restaurante.imagen
            if (imagen) {
              restaurante.imagen.path =
                environment.STORAGE_URL +
                imagen.path.replace('original', 'pequeno')
            }
            return restaurante
          })
          return restaurantes
        })
      )
      .subscribe({
        next: (restaurantes) => {
          this.restaurantes = restaurantes
        },
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }

  onClickRestaurante(restaurante: Restaurante) {
    this.router.navigate(['restaurante', 'view', restaurante.id])
  }
}
