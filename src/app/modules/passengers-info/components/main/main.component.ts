import { Component } from '@angular/core';
import { SelectedSeatsTransferService } from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';
import { ConfirmedSeatDTO } from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';
import { FormsStateTransferService } from '../../services/forms-state-transfer.service';
import { IdPassengerTransferService } from '../../services/id-passenger-transfer.service';
import { ActivatedRoute } from '@angular/router';
import { BookingCreationService } from '../../services/booking-creation.service';
import { Booking } from 'src/app/interfaces/booking';
import { BookingPostService } from 'src/app/modules/data-bases-services/posts/booking-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  selectedSeats!: ConfirmedSeatDTO[];
  flightId!: string;
  passengersIds!: string[];
  bookingsArray: Booking[] = [];
  hint:Boolean = false;
  bookingSubscription!: Subscription;
  
  constructor(private selectedSeatsTransferService: SelectedSeatsTransferService,
              private formsStateTransferService: FormsStateTransferService,
              private idPassengerTransferService:IdPassengerTransferService,
              private bookingCreationService:BookingCreationService,
              private bookingPostService:BookingPostService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.selectedSeats = this.selectedSeatsTransferService.getSelectedSeats();
    this.formsStateTransferService.initializeFormsState(this.selectedSeats.length);
    this.idPassengerTransferService.initializePassengersIds(this.selectedSeats.length);
    this.flightId = this.route.snapshot.queryParamMap.get('FLIGHTID')!;
  }

  ngOnDestroy(){
    if(this.bookingSubscription){
      this.bookingSubscription.unsubscribe();
    }
  }

  private checkFormsState(): boolean {
    return this.formsStateTransferService.getFormsState();
  }

  private checkPassengersIdsState(): boolean {
    return this.idPassengerTransferService.getPassengerIdsState();
  }

  private checkAllStates(): boolean {
    return this.checkFormsState() && this.checkPassengersIdsState();
  }

  private getPassengersIds(): string[] {
    return this.idPassengerTransferService.getPassengersIds();
  }

  private activateHint(): void {
    this.hint = true;

    setTimeout(() => {
      this.hint = false;
    }, 4000);
  }

  onClick(): void {
    if (!this.checkAllStates()) {
      this.activateHint();
      return;
    }

    this.passengersIds = this.getPassengersIds();

    for (let i = 0; i < this.selectedSeats.length; i++) {
      const booking = this.bookingCreationService
      .createBooking(this.passengersIds[i], this.flightId, this.selectedSeats[i].seatId);

      this.bookingsArray.push(booking);
    }
    console.log(this.bookingsArray)
    this.bookingSubscription = this.bookingPostService.postBooking(this.bookingsArray).subscribe(
      () => {
        this.router.navigate(['pagos'], {queryParams:{booking:this.bookingsArray[0].reservaId}});
      }
    )
  }


}
