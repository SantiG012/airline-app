import { Injectable } from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';
@Injectable()
export class FlightConfirmationService {

  constructor() { }

  corroborateFlight(origin:string,destiny:string,flights:Vuelo[]): boolean {
    return flights.some(flight => flight.origen === origin && flight.destino === destiny);
  }
}
