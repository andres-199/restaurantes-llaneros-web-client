import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Direccion } from 'src/app/interfaces/direccion.interface'

@Component({
  selector: 'app-add-direccion',
  templateUrl: './add-direccion.component.html',
  styleUrls: ['./add-direccion.component.css'],
})
export class AddDireccionComponent implements OnInit {
  direccion: Direccion
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    this.direccion = this.data?.direccion || {}
  }
}
