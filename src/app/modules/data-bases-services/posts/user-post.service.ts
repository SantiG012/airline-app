import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of,catchError,tap} from 'rxjs';
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
       tap((newUser: User) => console.log(`added user w/ id=${newUser.usuarioId}`)),
       catchError(this.handleError<User>('postUser'))
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
