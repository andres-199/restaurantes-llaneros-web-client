import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Imagen } from 'src/app/interfaces/imagen.interface'
import { environment } from 'src/environments/environment'
import { ImageService } from './image.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  imagenes: Imagen[]
  title: string
  iLoading = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.imagenes = this.data.imagenes
    this.title = this.data.title
    this.validateImages()
  }

  onLoadImage(files: File[]) {
    this.iLoading = true
    const subscription = this.imageService.uploadImg(files[0]).subscribe({
      next: (images) => {
        this.saveImage(images[0])
      },
      error: (err) => {},
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }

  deleteImage(image: Imagen) {
    const subscription = this.imageService.delete(image.id).subscribe({
      next: (response) => {
        const index = this.imagenes.indexOf(image)
        this.imagenes.splice(index, 1)
      },
      error: () => {},
      complete: () => {
        subscription.unsubscribe()
      },
    })
  }

  private saveImage(image: Imagen) {
    image = { ...image, ...this.data.foreignKey }
    const subscription = this.imageService.saveImage(image).subscribe({
      next: (image) => {
        if (this.imagenes.length === 1 && this.imagenes[0].is_empty) {
          this.imagenes[0] = image
        } else {
          this.imagenes.push(image)
        }
        this.validateImages()
      },
      error: (err) => {},
      complete: () => {
        this.iLoading = false
        subscription.unsubscribe()
      },
    })
  }

  private validateImages() {
    if (!this.imagenes) return this.setAddImage()
    if (!(this.imagenes.length > 0)) return this.setAddImage()
    this.imagenes = this.imagenes.map((imagen) => {
      if (!imagen.path.includes('http'))
        imagen.path = environment.STORAGE_URL + imagen.path
      return imagen
    })
  }

  private setAddImage() {
    this.imagenes = [
      {
        nombre: 'Cargar Imagen',
        path: 'assets/images/add-image.jpg',
        is_empty: true,
      },
    ]
  }
}
