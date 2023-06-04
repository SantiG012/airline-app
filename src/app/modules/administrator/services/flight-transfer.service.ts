import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IVuelo } from 'src/app/interfaces/IVuelo';

@Injectable()
export class FlightTransferService {
  private flightSubject = new Subject<IVuelo>();

  constructor() { }

  addNextFlight(flight:IVuelo) {
    this.flightSubject.next(flight);
  }

  getLastFlight(): Observable<IVuelo> {
    return this.flightSubject.asObservable();
  }
}
