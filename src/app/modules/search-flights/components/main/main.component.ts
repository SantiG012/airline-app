import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Booking } from 'src/app/interfaces/booking'; 
import { BookingGetsService } from 'src/app/modules/data-bases-services/gets/booking-gets.service';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { IVuelo } from 'src/app/interfaces/IVuelo';
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
  flights$!: Observable<IVuelo[]>;
  flights: IVuelo[] = [];

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
    this.bookingGetsService.getUserBookings(this.idControl!.value).subscribe(
      (bookings:Booking[]) => {
        this.bookings = bookings.sort((a:Booking, b:Booking) => a.vueloId.localeCompare(b.vueloId)) 
        this.requestFlights();
      }
    );
  }

  requestFlights() {
    const flightRequests = this.bookings.map(booking =>
      this.flightsService.getFlightById(booking.vueloId)
    );
  
    this.flights$ = forkJoin(flightRequests).pipe(
      tap((flights: IVuelo[]) => {
        this.flights = flights.sort((a:IVuelo, b:IVuelo) =>
          a.vueloId.localeCompare(b.vueloId)
        );
      }
    ));
  }

  paymentStatus(estadoPago: string): boolean {
    if (estadoPago === "f")return false;
    return true;
  }
  
  onSubmit(){
    if (!this.searchForm.valid)return;
    this.makeBookingRequest();
    
  }

  get idControl() { return this.searchForm.get('idControl');}
}
