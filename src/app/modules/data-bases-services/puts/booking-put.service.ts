import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable,of,catchError,tap, throwError} from 'rxjs';
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

  payBooking(bookingId:string):Observable<any>{
    return this.http.put<any>(`${this.API_URL}/pagarReserva/${bookingId}`, this.httpOptions).pipe(
        tap((_) => console.log(`paid booking`)),
        catchError(this.handleError('payBooking'))
      );
  }
  
  private handleError(operation = 'fetch invoice') {
    return (error: HttpErrorResponse): Observable<never> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=>error)
    };
  }
}
