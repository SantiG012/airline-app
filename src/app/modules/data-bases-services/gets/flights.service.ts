import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';

@Injectable()
export class FlightsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFlightsByOrigin(origin: string):Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.API_URL}/obtenerVuelosPorDestino/${origin}`)
    .pipe(
      tap(_ => console.log(`fetched flights by origin=${origin}`)),
      catchError(this.handleError<Vuelo[]>(`getFlightsByOrigin origin=${origin}`, []))
    );
  }

  getFlightsByOriginAndDestiny(origin: string, destiny: string):Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.API_URL}/obtenerVuelosPorOrigenDestino/${origin}/${destiny}`)
    .pipe(
      tap(_ => console.log(`fetched flights by origin=${origin} and destiny=${destiny}`)),
      catchError(this.handleError<Vuelo[]>(`getFlightsByOriginAndDestiny origin=${origin} and destiny=${destiny}`, []))
      );
  }

  getFlightById(id: string):Observable<Vuelo>{
    return this.http.get<Vuelo>(`${this.API_URL}/obtenerVuelo/${id}`)
    .pipe(
      tap(_ => console.log(`fetched flight by id=${id}`)),
      catchError(this.handleError<Vuelo>(`getFlightById id=${id}`))
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
