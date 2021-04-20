import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComprasComponent } from './compras.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: ComprasComponent }]

@NgModule({
  declarations: [ComprasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ComprasModule {}
