import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Observable, of} from 'rxjs';

@Injectable()
export class GetSeatsByFlightIdService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getSeatsByFlightId(id: string){
    return this.http.get(`${this.API_URL}/asientosVuelo/${id}`)
    .pipe(
      tap(_ => console.log(`fetched seats by flight id=${id}`)),
      catchError(this.handleError<any>(`getSeatsByFlightId id=${id}`))
    );
  } //TODO: Type the server response

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
