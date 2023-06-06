import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent {
  @Input() seatInput!:DetalleAsiento;
}
