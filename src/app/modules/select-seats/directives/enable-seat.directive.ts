import { Directive,ElementRef} from '@angular/core';
import{SeatStatusService} from '../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { Observable,catchError,of, switchMap} from 'rxjs';

@Directive({
  selector: '[appEnableSeat]'
})
export class EnableSeatDirective {
  seatId!:string;
  nonConfirmedSeats!:SeatStatusDTO[];
  constructor(private seatStatusService:SeatStatusService,
              private elementRef:ElementRef) { }

  private getSeatId():string{
    return this.elementRef.nativeElement.getAttribute('id');
  }

  private isSeatAvailable():boolean{
    return this.nonConfirmedSeats.findIndex(seat=>seat.seatId===this.seatId)!==-1;
  }
  

  ngAfterViewInit(){
    this.seatId=this.getSeatId();
    this.seatStatusService.getNonConfirmedSeatsObservable().subscribe(
      (seats:SeatStatusDTO[])=>{
        this.nonConfirmedSeats=seats;
        if(this.isSeatAvailable()){
          this.elementRef.nativeElement.style.pointerEvents = 'auto';
        }
      }
    );
  }
}
