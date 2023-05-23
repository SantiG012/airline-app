import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,tap,catchError} from 'rxjs';
import { Booking } from 'src/app/interfaces/booking'; 

@Injectable()
export class BookingGetsService {
  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/reserva';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUserBookings(id: string):Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.API_URL}/obtenerReservasUsuario/${id}`).pipe(
      tap(_ => console.log(`fetched flights by id=${id}`)),
      catchError(this.handleError<Booking[]>(`getUserBookedFlights id=${id}`, []))
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
