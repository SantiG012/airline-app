import { Injectable } from '@angular/core';
import { DataBasesServicesModule } from '../../data-bases-services.module';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: DataBasesServicesModule
})
export class FlightsByOriginService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFlightsByOrigin(origin: string):Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.API_URL}/obtenerVuelosPorDestino/${origin}`);
  }
}
