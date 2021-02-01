import { Component, Inject, OnInit } from '@angular/core'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { Tercero } from 'src/app/registro/tercero.interface'
import { TerceroService } from 'src/app/services/tercero.service'

@Component({
  selector: 'app-filter-people',
  templateUrl: './filter-people.component.html',
  styleUrls: ['./filter-people.component.css'],
})
export class FilterPeopleComponent implements OnInit {
  title: string
  filteredOptions: Observable<string[]>
  terceros: Tercero[] = []
  terceroSelected: Tercero

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private terceroService: TerceroService
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
  }

  search(value: string) {
    if (value.length < 3) {
      this.terceros = []
      return false
    }

    const susbscription = this.terceroService.search(value).subscribe({
      next: (_terceros: Tercero[]) => {
        this.terceros = _terceros
      },
      complete: () => {
        susbscription.unsubscribe()
      },
    })
  }

  displayFn(tercero: Tercero): string {
    return tercero && tercero.nombre
      ? `${tercero.nombre} - ${tercero.email}`
      : ''
  }

  onSelectedTercero(event: MatAutocompleteSelectedEvent) {
    this.terceroSelected = event.option.value
  }
}
