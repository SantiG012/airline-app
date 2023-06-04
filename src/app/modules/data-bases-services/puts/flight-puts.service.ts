import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,catchError,tap, throwError} from 'rxjs';
import { IVuelo } from 'src/app/interfaces/IVuelo';

@Injectable()
export class FlightPutsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  modifyDepartureAndArrivalCities(flight: IVuelo):Observable<any>{
    return this.http.put<any>(`${this.API_URL}/editarOrigenDestino`, flight).pipe(
        tap((_) => console.log(`modified flight with id=${flight.vueloId}`)),
        catchError(this.handleError('modifyDepartureAndArrivalCities'))
      );
  }

  modifyDepartureAndArrivalDates(flight: IVuelo):Observable<any>{
    return this.http.put<any>(`${this.API_URL}/editarFechasVuelo`, flight).pipe(
        tap((_) => console.log(`modified flight with id=${flight.vueloId}`)),
        catchError(this.handleError('modifyDepartureAndArrivalDates'))
      );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=> error);
    };
  }
}
