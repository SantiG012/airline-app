import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Observable,throwError,catchError,tap} from 'rxjs';
import { IStopover } from 'src/app/interfaces/IStopover';

@Injectable()
export class StopoverPostsService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postStopover(stopovers: IStopover[]):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/guardarEscalas`, stopovers).pipe(
       tap((_) => console.log(`added stopover`)),
       catchError(this.handleError('postStopover')
      )
    );
  }

  private handleError(operation = 'postStopover') {
    return (error: HttpErrorResponse): Observable<string> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=> error);
    };
  }


}
