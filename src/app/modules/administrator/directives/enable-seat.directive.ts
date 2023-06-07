import { Directive,ElementRef} from '@angular/core';
import { ClickedSeatsTransferService } from '../services/clicked-seats-transfer.service';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import { seatsDefaultImages } from 'src/app/constants/seats-default-images';

@Directive({
  selector: '[appEnableSeat]'
})
export class EnableSeatDirective {
  seats!:DetalleAsiento[];

  constructor(
    private clickedSeatsTransferService: ClickedSeatsTransferService,
    private elementRef:ElementRef
  ) { }

  private getSeatId():string{
    return this.elementRef.nativeElement.getAttribute('id');
  }

  private getSeatType():string{
    return this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private isSeatNotAvailable():boolean{
    return this.seats.findIndex((seat:DetalleAsiento)=>seat.idDetalleAsiento===this.getSeatId())!==-1;
  }

  private setDefaultSeatImage():void{
    const DEFAULT_IMAGE=seatsDefaultImages[this.getSeatType()];
    this.elementRef.nativeElement.style.backgroundImage=`url(${DEFAULT_IMAGE})`;
  }

  private activateSeat():void{
    this.elementRef.nativeElement.style.pointerEvents = 'auto';
  }

  private checkClickedSeats():void{
    this.clickedSeatsTransferService.getClickedSeats().subscribe(
      (seats:DetalleAsiento[])=>{
        this.seats=seats;
        if(this.isSeatNotAvailable())return;
        this.activateSeat();
        this.setDefaultSeatImage();
      }
    );
  }

  ngAfterViewInit(){
    this.checkClickedSeats();
  }
    
    

}
