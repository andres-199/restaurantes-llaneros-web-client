import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'
import { RegistroService } from './registro.service'
import { Tercero } from './tercero.interface'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  tercero: Tercero
  url_image = environment.IMAGES_URL + '3YvFXvDrFyM'
  constructor(
    private snackBar: MatSnackBar,
    private service: RegistroService
  ) {}

  ngOnInit(): void {
    this.tercero = {}
  }

  onSubmit(form) {
    if (!form.valid) {
      this.snackBar.open('Debe llenar los campos marcados con "*"', 'Aceptar')
      return false
    }

    this.register()
  }

  private register() {
    const subscription = this.service.register(this.tercero).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (e) => {},
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }
}
