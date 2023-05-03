import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  @Input() flight!: Vuelo;
}
