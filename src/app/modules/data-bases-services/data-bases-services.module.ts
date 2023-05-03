import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsByOriginService } from './gets/flights/flights-by-origin.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsByOriginService
  ]
})
export class DataBasesServicesModule { }
