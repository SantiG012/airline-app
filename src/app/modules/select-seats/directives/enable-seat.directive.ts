import { Directive,ElementRef} from '@angular/core';
import{SeatStatusService} from '../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { seatsDefaultImages } from 'src/app/constants/seats-default-images';

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

  private getSeatType():string{
    return this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private setDefaultSeatImage():void{
    const DEFAULT_IMAGE=seatsDefaultImages[this.getSeatType()];
    this.elementRef.nativeElement.style.backgroundImage=`url(${DEFAULT_IMAGE})`;
  }

  

  ngAfterViewInit(){
    this.seatId=this.getSeatId();
    this.seatStatusService.getNonConfirmedSeatsObservable().subscribe(
      (seats:SeatStatusDTO[])=>{
        this.nonConfirmedSeats=seats;
        if(this.isSeatAvailable()){
          this.elementRef.nativeElement.style.pointerEvents = 'auto';
          this.setDefaultSeatImage();
        }
      }
    );
  }
}
