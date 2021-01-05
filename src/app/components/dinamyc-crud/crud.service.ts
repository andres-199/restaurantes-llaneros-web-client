import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { origin } from 'src/app/util/origin.enum'

@Injectable()
export class CrudService {
  private urlBase = environment.BACKEND_URL
  constructor(private http: HttpClient) {}

  public findAll<T>(origin: origin) {
    const url = this.urlBase + origin
    return this.http.get<T[]>(url)
  }

  public create(origin, data) {
    const url = this.urlBase + origin
    return this.http.post(url, data)
  }

  public update(origin, data) {
    const url = this.urlBase + origin
    return this.http.put(url, data)
  }

  public delete(origin) {
    const url = this.urlBase + origin
    return this.http.delete(url)
  }
}
