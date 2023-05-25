import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Booking } from 'src/app/interfaces/booking'; 
import { BookingGetsService } from 'src/app/modules/data-bases-services/gets/booking-gets.service';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { forkJoin } from 'rxjs';
import { Observable,tap} from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  searchForm!: FormGroup;
  bookings!: Booking[];
  bookings$!: Observable <Booking[]>;
  flights: Vuelo[] = [];

  constructor(
    private bookingGetsService: BookingGetsService,
    private flightsService: FlightsService
  ) { }

  ngOnInit(){
    this.searchForm = new FormGroup({
      idControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      )
    });
  }
  
  makeBookingRequest(){
    this.bookings$ = this.bookingGetsService.getUserBookings(this.idControl!.value).pipe(
      tap(
        (bookings:Booking[]) => {
          this.bookings = bookings;
          this.requestFlights();
        }
      )
    )
  }

  requestFlights() {
    const flightRequests = this.bookings.map(booking =>
      this.flightsService.getFlightById(booking.vueloId)
    );
  
    forkJoin(flightRequests).subscribe((flights: Vuelo[]) => {
      this.flights = flights;
    });
  }

  onSubmit(){
    if (!this.searchForm.valid)return;
    this.makeBookingRequest();
    
  }

  get idControl() { return this.searchForm.get('idControl');}
}
