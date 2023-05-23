import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of,catchError,tap} from 'rxjs';
import { Booking } from 'src/app/interfaces/booking';

@Injectable()
export class BookingPostService {
  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/reserva';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postBooking(booking: Booking[]):Observable<Booking[]>{	
    return this.http.post<Booking[]>(`${this.API_URL}/guardarReservas`, booking).pipe(
       tap((newBooking: Booking[]) => console.log(`added booking w/ id=${newBooking[0].reservaId}`)),
       catchError(this.handleError<Booking[]>('postBooking'))
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
