import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of,catchError,tap} from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';

@Injectable()
export class BookingPutService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/reserva';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  payBooking(bookingId:string):Observable<Booking>{
    return this.http.put<Booking>(`${this.API_URL}/pagarReserva/${bookingId}`, this.httpOptions).pipe(
        tap((newBooking: Booking) => console.log(`paid booking w/ id=${newBooking.reservaId}`)),
        catchError(this.handleError<Booking>('payBooking'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
