import { Component } from '@angular/core';
import { SeatStatusService } from '../../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/seatDTOs/SeatStatusDTO';
import { SelectedSeatDTO } from 'src/app/DTOs/seatDTOs/selectedSeatDTO';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import{ SelectedSeatsTransferService } from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';

@Component({
  selector: 'app-passengers-seats',
  templateUrl: './passengers-seats.component.html',
  styleUrls: ['./passengers-seats.component.css']
})
export class PassengersSeatsComponent {
  confirmedSeats$!:Observable<SeatStatusDTO[]>;
  selectedSeats!:SelectedSeatDTO[];
  maxSeats!:number;
  seatsLimitReached:boolean=false;

  constructor(private seatStatusService:SeatStatusService,
              private selectedSeatsTransferService:SelectedSeatsTransferService,
              private route:ActivatedRoute) { }

  ngOnInit(){
    this.confirmedSeats$=this.seatStatusService.getConfirmedSeatsObservable().pipe(
      tap((seats:SeatStatusDTO[])=>{
        seats.forEach((seat:SeatStatusDTO)=>{
          this.selectedSeats=[];
          this.selectedSeats.push({seatId:seat.seatId,price:seat.price});
        });
      })
    );
    this.maxSeats=parseInt(this.route.snapshot.queryParamMap.get('SEATS')!);
    this.seatStatusService.setMaxSeats(this.maxSeats);
  }

  private checkIfMaxSeatsReached():void{
    this.seatsLimitReached=!this.seatStatusService.checkIfMaxSeatsReached();
  }

  ngOnDestroy(){
    this.selectedSeatsTransferService.setSelectedSeats(this.selectedSeats);
  }

  onConfirmSeats(){
    this.checkIfMaxSeatsReached();

    if (this.seatsLimitReached) return;

    //TODO: Navigate to next page
  }

}
