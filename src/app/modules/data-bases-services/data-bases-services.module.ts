import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from './gets/flights/flights.service';
import { GetSeatsByFlightIdService } from './gets/flights/get-seats-by-flight-id.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsService,
    GetSeatsByFlightIdService
  ]
})
export class DataBasesServicesModule { }
