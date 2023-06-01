import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,of,catchError,tap,throwError} from 'rxjs';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Injectable()
export class FlightPostsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postFlight(flight: Vuelo):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/guardarVuelo`, flight).pipe(
       tap((_) => console.log(`added flight`)),
       catchError(this.handleError('postFlight'))
      );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<HttpErrorResponse> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }



}
