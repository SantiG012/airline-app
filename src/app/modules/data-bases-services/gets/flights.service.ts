import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { catchError, tap,} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';

@Injectable()
export class FlightsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFlightsByOrigin(origin: string):Observable<IVuelo[]>{
    return this.http.get<IVuelo[]>(`${this.API_URL}/obtenerVuelosPorOrigen/${origin}`)
    .pipe(
      tap(_ => console.log(`fetched flights by origin=${origin}`)),
      catchError(this.handleError(`getFlightsByOrigin origin=${origin}`))
    );
  }

  getFlightsByOriginAndDestiny(origin: string, destiny: string):Observable<IVuelo[]>{
    return this.http.get<IVuelo[]>(`${this.API_URL}/obtenerVuelosPorOrigenDestino/${origin}/${destiny}`)
    .pipe(
      tap(_ => console.log(`fetched flights by origin=${origin} and destiny=${destiny}`)),
      catchError(this.handleError(`getFlightsByOriginAndDestiny origin=${origin} and destiny=${destiny}`))
      );
  }

  getFlightById(id: string):Observable<IVuelo>{
    return this.http.get<IVuelo>(`${this.API_URL}/obtenerVuelo/${id}`)
    .pipe(
      tap(_ => console.log(`fetched flight by id=${id}`)),
      catchError(this.handleError(`getFlightById id=${id}`))
    );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=> error);
    };

  }
}
