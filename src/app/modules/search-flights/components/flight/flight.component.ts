import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { IVuelo } from 'src/app/interfaces/IVuelo';



@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {

  @Input()flightInput!: IVuelo;
  @Input()bookingIdInput!: string;

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
    this.router.navigate(['pagos'], { queryParams: { booking:this.bookingIdInput} });
  }
}
