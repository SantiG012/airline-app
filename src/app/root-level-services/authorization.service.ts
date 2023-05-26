import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';
import { Token } from '../interfaces/Token';
import { AdminLogInStatusDTO } from '../DTOs/adminDTOs/adminLogInStatusDTO';
import { Observable, Subject,tap,catchError,EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private adminLogInStatusSubject = new Subject<AdminLogInStatusDTO>();
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
      tap((_) => {
        const adminLogInStatusDTO: AdminLogInStatusDTO = {
          status: true,
          statusMessage: 'Log In Successful'
        };
        this.adminLogInStatusSubject.next(adminLogInStatusDTO);
      }),
      catchError(this.handleError<Token>())
    );
  }

  private handleError<T>(operation = 'Log In') {
    return (error: any): Observable<T> => { 
      const message = error.error.mensaje;

      const adminLogInStatusDTO: AdminLogInStatusDTO = {
        status: false,
        statusMessage: message
      };

      this.adminLogInStatusSubject.next(adminLogInStatusDTO);

      return EMPTY;
    };
  }

  getAdminLogInStatus(): Observable<AdminLogInStatusDTO> {
    return this.adminLogInStatus$;
  }
}
