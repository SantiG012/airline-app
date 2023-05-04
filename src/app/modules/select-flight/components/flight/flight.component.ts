import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  @Input() flight!: Vuelo;

  constructor(private datePipe: DatePipe) { }

  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}
