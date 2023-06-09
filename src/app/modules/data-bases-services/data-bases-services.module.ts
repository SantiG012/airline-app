import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from './gets/flights.service';
import { SeatsService } from './gets/seats.service';
import { UserPostService } from './posts/user-post.service';
import { BookingPostService } from './posts/booking-post.service';
import { InvoiceGetService } from './gets/invoice-get.service';
import { BookingPutService } from './puts/booking-put.service';
import { BookingGetsService } from './gets/booking-gets.service';
import { PlanePostsService } from './posts/plane-posts.service';
import { FlightPostsService } from './posts/flight-posts.service';
import { FlightPutsService } from './puts/flight-puts.service';
import { StopoverPostsService } from './posts/stopover-posts.service';
import { SeatPutsService } from './puts/seat-puts.service';
import { PlaneGetsService } from './gets/plane-gets.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FlightsService,
    SeatsService,
    UserPostService,
    BookingPostService,
    InvoiceGetService,
    BookingPutService,
    BookingGetsService,
    PlanePostsService,
    FlightPostsService,
    FlightPutsService,
    StopoverPostsService,
    SeatPutsService,
    PlaneGetsService
  ]
})
export class DataBasesServicesModule { }
