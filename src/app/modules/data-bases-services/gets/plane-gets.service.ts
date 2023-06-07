import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable,catchError,tap, throwError} from 'rxjs';
import { IPlane } from 'src/app/interfaces/IPlane';

@Injectable()
export class PlaneGetsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/avion';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPlanes():Observable<IPlane[]>{
    return this.http.get<IPlane[]>(`${this.API_URL}/obtenerAviones`).pipe(
       tap((_) => console.log(`Fetch planes`)),
       catchError(this.handleError('getPlanes')
      )
    );
  }

  private handleError(operation = 'getPlanes') {
    return (error: HttpErrorResponse): Observable<never> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=>error)
    };
  }
}
