import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PerfilComponent } from './perfil.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { PerfilService } from './perfil.service'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ImageService } from '../components/images/image.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const routes: Routes = [{ path: '', component: PerfilComponent }]

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [PerfilService, ImageService],
})
export class PerfilModule {}
