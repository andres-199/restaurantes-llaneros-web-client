import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CarritoComponent } from './carrito.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'

const routes: Routes = [{ path: '', component: CarritoComponent }]

@NgModule({
  declarations: [CarritoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatListModule,
    MatIconModule,
  ],
})
export class CarritoModule {}
