import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable,throwError} from 'rxjs';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Injectable()
export class SeatsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://172.16.20.185:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSeatsByFlightId(id: string):Observable<DetalleAsiento[]>{
    return this.http.get<DetalleAsiento[]>(`${this.API_URL}/asientosVuelo/${id}`)
    .pipe(
      tap(_ => console.log(`fetched seats by flight id=${id}`)),
      catchError(this.handleError(`getSeatsByFlightId id=${id}`))
    );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return throwError(() => error);
    };
  }
}