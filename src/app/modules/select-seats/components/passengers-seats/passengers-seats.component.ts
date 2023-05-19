import { Component } from '@angular/core';
import { SeatStatusService } from '../../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/seatDTOs/SeatStatusDTO';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passengers-seats',
  templateUrl: './passengers-seats.component.html',
  styleUrls: ['./passengers-seats.component.css']
})
export class PassengersSeatsComponent {
  confirmedSeats$!:Observable<SeatStatusDTO[]>;
  maxSeats!:number;
  seatsLimitReached:boolean=false;

  constructor(private seatStatusService:SeatStatusService,
              private route:ActivatedRoute) { }

  ngOnInit(){
    this.confirmedSeats$=this.seatStatusService.getConfirmedSeatsObservable();
    this.maxSeats=parseInt(this.route.snapshot.queryParamMap.get('SEATS')!);
    this.seatStatusService.setMaxSeats(this.maxSeats);
  }

  private checkIfMaxSeatsReached():void{
    this.seatsLimitReached=!this.seatStatusService.checkIfMaxSeatsReached();
  }

  onConfirmSeats(){
    this.checkIfMaxSeatsReached();

    if (this.seatsLimitReached) return;

    //TODO: Navigate to next page
  }

}
