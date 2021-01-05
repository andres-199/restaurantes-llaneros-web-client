import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-restaurante-view',
  templateUrl: './restaurante-view.component.html',
  styleUrls: ['./restaurante-view.component.css'],
})
export class RestauranteViewComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
  restaurante: string
  ngOnInit(): void {
    this.restaurante = this.activatedRoute.snapshot.params['restaurante']
    console.log(this.restaurante)
  }
}
