import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
@Injectable()
export class FlightsByOriginAndDestinyService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFlightsByOriginAndDestiny(origin: string, destiny: string):Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.API_URL}/obtenerVuelosPorOrigenDestino/${origin}/${destiny}`)
    .pipe(
      tap(_ => console.log(`fetched flights by origin=${origin} and destiny=${destiny}`)),
      catchError(this.handleError<Vuelo[]>(`getFlightsByOriginAndDestiny origin=${origin} and destiny=${destiny}`, []))
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
