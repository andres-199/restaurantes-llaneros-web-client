import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showtoolbar = false

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.showtoolbar = e['url'] != '/login'
      })
  }
}
