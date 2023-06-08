import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';
import { Token } from '../interfaces/Token';
import { Observable, Subject,tap,catchError,EMPTY, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private adminLogInStatusSubject = new Subject<boolean>();
  adminLogInStatus$ = this.adminLogInStatusSubject.asObservable();

  readonly API_URL = 'http://localhost:8080/admin';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(admin: Admin) {
    return this.http.post<Token>(this.API_URL + '/verificarCredenciales', admin, this.httpOptions)
    .pipe(
      tap((token:Token) => {
        this.setAdminLogInStatus(true);
        this.setLocalStorage(token);
      }),
      catchError(this.handleError())
    );
  }

  private handleError(operation = 'Log In') {
    return (error: HttpErrorResponse):Observable<never> => { 

      console.log('Error al intentar ' + operation + ' el administrador: ' + error.error.mensaje);
      console.error(error);


      this.setAdminLogInStatus(false);

      return throwError(()=> error);
    };
  }

  getAdminLogInStatus(): Observable<boolean> {
    return this.adminLogInStatus$;
  }

  isLogIn(): boolean {
    const admin = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
  
    if (admin && expirationTime) {
      const currentTime = Date.now();
      const expirationTimeNumber = parseInt(expirationTime);
  
      if (expirationTimeNumber > currentTime) {
        return true;
      }
    }
  
    return false;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  }

  setAdminLogInStatus(status:boolean):void {

    this.adminLogInStatusSubject.next(status);
  }

  private setLocalStorage(token: Token): void {
    const expirationTime = new Date().getTime() + (60 * 1000); 

    localStorage.setItem('token', token.token);
    localStorage.setItem('expirationTime', expirationTime.toString());
  }
  
}
