import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PerfilComponent } from './perfil.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{ path: '', component: PerfilComponent }]

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PerfilModule {}
