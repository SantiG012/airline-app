import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,catchError,tap, throwError} from 'rxjs';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Injectable()
export class SeatPutsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  modifySeat(seat: DetalleAsiento):Observable<any>{
    return this.http.put<any>(`${this.API_URL}/editarAsiento`, seat).pipe(
        tap((_) => console.log(`modified seat with id=${seat.idDetalleAsiento}`)),
        catchError(this.handleError('modifySeat'))
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
