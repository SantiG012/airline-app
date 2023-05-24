import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import { Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';
import {FlightsService} from 'src/app/modules/data-bases-services/gets/flights.service';
import { Observable,tap} from 'rxjs';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {

  @Input() flightId!: string;
  flight!: Vuelo;

  constructor (private datePipe: DatePipe,
              private router:Router,
              private flightsService:FlightsService
    ) {}

  ngOnInit(){
    this.flightsService.getFlightById(this.flightId).subscribe(
      flight => this.flight = flight
    );
  }

  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onClick() {
    //this.router.navigate(['seleccionarAsientos'], { queryParams: { ID:this.flight.id,SEATS:this.SEATS} });
  }
}
