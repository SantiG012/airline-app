import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class FlightIdTransferService {
  private flightIdSubject = new Subject<string>();

  constructor() { }

  addNextFlightId(flightId:string) {
    this.flightIdSubject.next(flightId);
  }

  getLastFlightId(): Observable<string> {
    return this.flightIdSubject.asObservable();
  }
}
