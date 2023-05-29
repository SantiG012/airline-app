import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {

  @Input()flightInput!: Vuelo;

  constructor (private datePipe: DatePipe,
              private router:Router
    ) {}


  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onClick() {
    console.log("Click en el vuelo");
    //TODO - Copiar el ID del vuelo en el portapapeles
  }
}
