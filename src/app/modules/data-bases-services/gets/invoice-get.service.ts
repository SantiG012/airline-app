import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,catchError,tap,of} from 'rxjs';
import { Invoice } from 'src/app/interfaces/invoice';

@Injectable()
export class InvoiceGetService {
  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/reserva';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getInvoiceByBookingId(bookingId: string):Observable<Invoice> {
    return this.http.get<Invoice>(`${this.API_URL}/obtenerFactura/${bookingId}`)
    .pipe(
      tap(_ => console.log(`fetched invoice by bookingId=${bookingId}`)),
      catchError(this.handleError<Invoice>(`getInvoiceByBookingId bookingId=${bookingId}`))
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
