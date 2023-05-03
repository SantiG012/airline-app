import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Vuelo } from 'src/app/interfaces/vuelo';
@Injectable()
export class FlightsByOriginAndDestinyService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8080/vuelo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getFlightsByOriginAndDestiny(origin: string, destiny: string){
    return this.http.get<Vuelo[]>(`${this.API_URL}/obtenerVuelosPorOrigenDestino/${origin}/${destiny}`);
  }

}
