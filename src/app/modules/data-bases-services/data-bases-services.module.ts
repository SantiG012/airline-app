import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsByOriginService } from './gets/flights/flights-by-origin.service';
import { FlightsByOriginAndDestinyService } from './gets/flights/flights-by-origin-and-destiny.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsByOriginService,
    FlightsByOriginAndDestinyService
  ]
})
export class DataBasesServicesModule { }
