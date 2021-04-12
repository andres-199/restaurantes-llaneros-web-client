import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OrdenComponent } from './orden.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [OrdenComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    NgImageFullscreenViewModule,
    MatButtonModule,
  ],
})
export class OrdenModule {}
