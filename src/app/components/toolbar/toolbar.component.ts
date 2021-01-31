import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Roles } from 'src/app/interfaces/roles.enum'
import { LoginService } from 'src/app/login/login.service'
import { Usuario } from 'src/app/registro/usuario.interface'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isLogedIn: boolean
  user: Usuario
  roles = Roles
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.isLogedIn = this.loginService.isLogedIn
    this.user = this.loginService.user
  }

  onLogin() {
    this.router.navigate(['login'])
  }

  onLogout() {
    this.loginService.logout()
    this.router.navigate([''])
    this.isLogedIn = this.loginService.isLogedIn
  }
}
