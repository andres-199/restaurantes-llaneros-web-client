import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToolbarModule } from './components/toolbar/toolbar.module'
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { MatPaginatorIntlCro } from './components/dinamyc-crud/mat-paginator-intl.service'
import { FooterModule } from './components/footer/footer.module'
import { MatNativeDateModule } from '@angular/material/core'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    HttpClientModule,
    FooterModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }],
  bootstrap: [AppComponent],
})
export class AppModule {}
