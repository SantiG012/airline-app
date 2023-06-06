import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {

  @Input()flightInput!: IVuelo;

  constructor (private datePipe: DatePipe,
              private clipboard: Clipboard
    ) {}


  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onCopyFlightIdClick() {
    this.clipboard.copy(this.flightInput.vueloId);
  }

  onCopyJourneyIdClick() {
    this.clipboard.copy(this.flightInput.trayeactoId);
  }
}
