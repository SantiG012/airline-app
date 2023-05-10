import { Component } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  seats!: DetalleAsiento[];
}
