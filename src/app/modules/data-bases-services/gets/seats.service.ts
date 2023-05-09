import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Injectable()
export class SeatsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSeatsByFlightId(id: string):Observable<DetalleAsiento[]>{
    return this.http.get<DetalleAsiento[]>(`${this.API_URL}/asientosVuelo/${id}`)
    .pipe(
      tap(_ => console.log(`fetched seats by flight id=${id}`)),
      catchError(this.handleError<any>(`getSeatsByFlightId id=${id}`))
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