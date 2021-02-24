import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Imagen } from 'src/app/interfaces/imagen.interface'
import { environment } from 'src/environments/environment'

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImg(file: File) {
    const url = environment.STORAGE_URL + 'upload-img'
    const formData: FormData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post<Imagen[]>(url, formData)
  }

  saveImage(image: Imagen) {
    const url = environment.BACKEND_URL + 'imagenes'
    return this.http.post<Imagen>(url, image)
  }

  delete(imagenId: number) {
    const url = environment.BACKEND_URL + `imagenes/${imagenId}`
    return this.http.delete(url)
  }
}
