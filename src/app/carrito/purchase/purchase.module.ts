import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PurchaseComponent } from './purchase.component'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [PurchaseComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class PurchaseModule {}
