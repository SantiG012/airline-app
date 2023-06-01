import { Injectable } from '@angular/core';
import { IVuelo } from 'src/app/interfaces/IVuelo';
@Injectable()
export class FlightConfirmationService {

  constructor() { }

  corroborateFlight(origin:string,destiny:string,flights:IVuelo[]): boolean {
    return flights.some(flight => flight.origen === origin && flight.destino === destiny);
  }
}
