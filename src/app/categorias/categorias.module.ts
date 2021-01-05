import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriasComponent } from './categorias.component'
import { RouterModule, Routes } from '@angular/router'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'
import { MatCardModule } from '@angular/material/card'

export const routes: Routes = [{ path: '', component: CategoriasComponent }]

@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    DinamycCrudModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoriasModule {}
