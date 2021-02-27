import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductoViewComponent } from './producto-view.component'
import { IvyCarouselModule } from 'angular-responsive-carousel'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatChipsModule } from '@angular/material/chips'

@NgModule({
  declarations: [ProductoViewComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [ProductoViewComponent],
})
export class ProductoViewModule {}
