import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Booking } from 'src/app/interfaces/booking'; 
import { Observable,tap} from 'rxjs';
import { BookingGetsService } from 'src/app/modules/data-bases-services/gets/booking-gets.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  searchForm!: FormGroup;
  bookings$!: Observable<Booking[]>;

  constructor(
    private bookingGetsService: BookingGetsService
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
       tap((bookings:Booking[]) => console.log("bookings",bookings))
      );
  }

  onSubmit(){
    if (!this.searchForm.valid)return;
    
  }

  get idControl() { return this.searchForm.get('idControl');}
}