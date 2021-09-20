import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'
import { LoginService } from './login/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit {
  showtoolbar = false
  isHome=false
  isLogedIn=false
  constructor(private router: Router,private loginService:LoginService) {}

  ngOnInit() {
    
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isLogedIn = this.loginService.isLogedIn
        this.showtoolbar = e['url'] != '/login'
        this.isHome= e['url'] === '/inicio'|| e['url'] === '/'
      })
  }
}
