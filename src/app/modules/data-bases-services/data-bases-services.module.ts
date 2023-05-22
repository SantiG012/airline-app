import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from './gets/flights.service';
import { SeatsService } from './gets/seats.service';
import { UserPostService } from './posts/user-post.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsService,
    SeatsService,
    UserPostService
  ]
})
export class DataBasesServicesModule { }
