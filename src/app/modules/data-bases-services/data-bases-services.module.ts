import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from './gets/flights/flights.service';
import { SeatsService } from './gets/seats/seats.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsService,
    SeatsService
  ]
})
export class DataBasesServicesModule { }
