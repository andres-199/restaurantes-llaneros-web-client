import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Usuario } from '../registro/usuario.interface'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private backendUrl = environment.BACKEND_URL

  public get isLogedIn(): any {
    return localStorage.getItem('user') ? true : false
  }

  public get user(): any {
    return JSON.parse(localStorage.getItem('user'))
  }

  public set user(value: any) {
    localStorage.setItem('user', JSON.stringify(value))
  }

  constructor(private router: Router, private http: HttpClient) {}

  public login(loginData: Usuario) {
    const url = this.backendUrl + 'auth/login'
    return this.http.post(url, loginData)
  }

  public logout() {
    localStorage.removeItem('user')
    this.router.navigate([''])
  }
}
