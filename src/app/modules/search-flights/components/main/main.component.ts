import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Booking } from 'src/app/interfaces/booking'; 
import { BookingGetsService } from 'src/app/modules/data-bases-services/gets/booking-gets.service';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { forkJoin } from 'rxjs';
import { Observable,tap} from 'rxjs';
import { PaymentCorroborationService } from '../../services/payment-corroboration.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [PaymentCorroborationService]
})
export class MainComponent {
  searchForm!: FormGroup;
  bookings!: Booking[];
  flights$!: Observable<Vuelo[]>;
  flights: Vuelo[] = [];

  constructor(
    private bookingGetsService: BookingGetsService,
    private flightsService: FlightsService,
    private paymentCorroborationService: PaymentCorroborationService
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
    this.bookingGetsService.getUserBookings(this.idControl!.value).subscribe(
      (bookings:Booking[]) => {
        this.bookings = bookings;
        this.requestFlights();
      }
    );
  }

  paymentCorroboration(flightId: string): boolean {
    const status = this.paymentCorroborationService.determineFlightPaymentStatus(flightId, this.bookings);
    return status;
  }


  requestFlights() {
    const flightRequests = this.bookings.map(booking =>
      this.flightsService.getFlightById(booking.vueloId)
    );
  
    this.flights$ = forkJoin(flightRequests).pipe(
      tap(flights => this.flights = flights)
    )
  }

  onSubmit(){
    if (!this.searchForm.valid)return;
    this.makeBookingRequest();
    
  }

  get idControl() { return this.searchForm.get('idControl');}
}
