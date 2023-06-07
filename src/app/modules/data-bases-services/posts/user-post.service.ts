import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable,catchError,tap, throwError} from 'rxjs';
import { User } from 'src/app/interfaces/user';


@Injectable()
export class UserPostService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/usuario';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.API_URL}/guardarUsuario`, user).pipe(
       tap((_) => console.log(`added user`)),
       catchError(this.handleError('postUser'))
      );
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<never> => { 
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);
      return throwError(()=> error);
    };
  }
}
