import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment'
import { Restaurante } from '../restaurantes/restaurante.interface'
import { RestaurantesService } from '../restaurantes/restaurantes.service'

@Component({
  selector: 'app-restaurante-view',
  templateUrl: './restaurante-view.component.html',
  styleUrls: ['./restaurante-view.component.css'],
})
export class RestauranteViewComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantesService: RestaurantesService
  ) {}
  restaurante: Restaurante = {}
  ngOnInit(): void {
    this.restaurante.id = this.activatedRoute.snapshot.params['id']
    this.getRestaurante()
  }

  private getRestaurante() {
    const susbcription = this.restaurantesService
      .getById(this.restaurante.id)
      .subscribe({
        next: (restaurante: Restaurante) => {
          const imagen = restaurante.imagen
          if (imagen) {
            restaurante.imagen.path =
              environment.STORAGE_URL +
              imagen.path.replace('original', 'pequeno')
          }
          this.restaurante = restaurante
        },
        error: (err) => {},
        complete: () => {
          susbcription.unsubscribe()
        },
      })
  }
}
