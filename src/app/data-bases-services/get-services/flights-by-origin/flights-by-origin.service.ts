import { Injectable } from '@angular/core';
import { DataBasesServicesModule } from '../../data-bases-services.module';

@Injectable({
  providedIn: DataBasesServicesModule
})
export class FlightsByOriginService {

  constructor() { }
}
