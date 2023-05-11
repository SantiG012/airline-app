import { Component } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import {SeatsService} from 'src/app/modules/data-bases-services/gets/seats.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  seats!: DetalleAsiento[];

  constructor(private seatsService: SeatsService) {}
}
