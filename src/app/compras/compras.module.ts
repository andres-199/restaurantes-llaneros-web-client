import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComprasComponent } from './compras.component'
import { RouterModule, Routes } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module'

const routes: Routes = [{ path: '', component: ComprasComponent }]

@NgModule({
  declarations: [ComprasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
  ],
})
export class ComprasModule {}
