import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {

  @Input()flightInput!: Vuelo;
  idCopied: boolean = false;

  constructor (private datePipe: DatePipe,
              private clipboard: Clipboard
    ) {}


  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onClick() {
    this.clipboard.copy(this.flightInput.vueloId);
    this.idCopied = true;
    setTimeout(() => {
      this.idCopied = false;
    } 
    , 3000);
  }
}
