import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilterPeopleComponent } from './filter-people.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [FilterPeopleComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [FilterPeopleComponent],
})
export class FilterPeopleModule {}
