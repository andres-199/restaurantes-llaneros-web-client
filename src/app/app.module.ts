import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToolbarModule } from './components/toolbar/toolbar.module'
import { HttpClientModule } from '@angular/common/http'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { MatPaginatorIntlCro } from './components/dinamyc-crud/mat-paginator-intl.service'
import { FooterModule } from './components/footer/footer.module'
import { MatNativeDateModule } from '@angular/material/core'
import { registerLocaleData } from '@angular/common'
import localeEsCo from '@angular/common/locales/es-CO'
registerLocaleData(localeEsCo, 'es')

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
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
