import { Component } from '@angular/core';
import { SeatStatusService } from '../../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/seatDTOs/SeatStatusDTO';
import { ConfirmedSeatDTO } from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';
import { Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import{ SelectedSeatsTransferService } from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passengers-seats',
  templateUrl: './passengers-seats.component.html',
  styleUrls: ['./passengers-seats.component.css']
})
export class PassengersSeatsComponent {
  selectedSeats$!:Observable<SeatStatusDTO[]>;
  confirmedSeats:ConfirmedSeatDTO[]=[];
  maxSeats!:number;
  seatsLimitReached:boolean=false;

  constructor(private seatStatusService:SeatStatusService,
              private selectedSeatsTransferService:SelectedSeatsTransferService,
              private route:ActivatedRoute,
              private router:Router ) { }

  ngOnInit(){
    this.selectedSeats$=this.seatStatusService.getConfirmedSeatsObservable();
    this.maxSeats=parseInt(this.route.snapshot.queryParamMap.get('SEATS')!);
    this.seatStatusService.setMaxSeats(this.maxSeats);
  }

  private checkIfMaxSeatsReached():void{
    this.seatsLimitReached=!this.seatStatusService.checkIfMaxSeatsReached();
  }

  private setSelectedSeats():void{
    this.seatStatusService.getSeatStatusDTOArray().forEach(seat=>{
      this.confirmedSeats.push({
        seatId:seat.seatId,
        price:seat.price,
      })
    }
  );
  }
  ngOnDestroy(){
    this.setSelectedSeats();
    this.selectedSeatsTransferService.setSelectedSeats(this.confirmedSeats);
    this.seatStatusService.resetSeatsStatusDTO();
  }

  onConfirmSeats(){
    this.checkIfMaxSeatsReached();

    if (this.seatsLimitReached) return;

    this.router.navigate(['pasajeros'], { queryParams: { FLIGHTID:this.route.snapshot.queryParamMap.get('ID')} });
  }

}
