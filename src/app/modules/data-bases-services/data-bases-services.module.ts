import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsService } from './gets/flights.service';
import { SeatsService } from './gets/seats.service';
import { UserPostService } from './posts/user-post.service';
import { BookingPostService } from './posts/booking-post.service';
import { InvoiceGetService } from './gets/invoice-get.service';



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
    InvoiceGetService
  ]
})
export class DataBasesServicesModule { }
