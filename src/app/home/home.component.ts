import { Component, OnInit } from '@angular/core'
import { CrudService } from '../components/dinamyc-crud/crud.service'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { origin } from '../util/origin.enum'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  restaurantes: Restaurante[]

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.getRestaurantes()
  }

  private getRestaurantes() {
    const subscription = this.crudService
      .findAll<Restaurante>(origin.RESTAURANTES)
      .pipe(
        map((restaurantes) => {
          restaurantes = restaurantes.map((restaurante) => {
            if (restaurante.imagen)
              restaurante.imagen = `${environment.IMAGES_URL}${restaurante.imagen}/100x100`
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
}
