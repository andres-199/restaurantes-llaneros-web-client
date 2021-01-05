import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegistroComponent } from './registro.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [{ path: '', component: RegistroComponent }]

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class RegistroModule {}
