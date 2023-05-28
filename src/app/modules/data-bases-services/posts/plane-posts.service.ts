import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable,of,catchError,tap} from 'rxjs';
import { Plane } from 'src/app/interfaces/Plane';

@Injectable()
export class PlanePostsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/avion';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postPlane(plane: Plane):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/guardarAvion`, plane).pipe(
       tap((_) => console.log(`added plane`)),
       catchError(this.handleError('postPlane')
      )
    );
  }

  private handleError(operation = 'postPlane') {
    return (error: HttpErrorResponse): Observable<string> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return of("No se ha podido crear el vuelo. Intente más tarde");
    };
  }
}
