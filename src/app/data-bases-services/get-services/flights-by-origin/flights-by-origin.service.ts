import { Injectable } from '@angular/core';
import { DataBasesServicesModule } from '../../data-bases-services.module';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: DataBasesServicesModule
})
export class FlightsByOriginService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  getFlightsByOrigin(origin: string){
    return this.http.get(`${this.API_URL}/obtenerVuelosPorDestino/${origin}`);
  }
}
