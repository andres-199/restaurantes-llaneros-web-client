import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PurchaseComponent } from './purchase.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'

@NgModule({
  declarations: [PurchaseComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatListModule],
})
export class PurchaseModule {}
