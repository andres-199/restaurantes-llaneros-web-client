import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Mesa } from '../mesa.interface'

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public mesa: Mesa) {}

  ngOnInit(): void {}
}
