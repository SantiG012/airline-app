import { Directive,ElementRef,HostListener} from '@angular/core';
import { selectedSeatsImages } from 'src/app/constants/selected-seats-images';
import { SeatStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appSelectedSeatImage]'
})
export class SelectedSeatImageDirective {

  constructor(private elementRef:ElementRef,
              private seatStatusService:SeatStatusService) { }

  private getType():string {
    const type = this.elementRef.nativeElement.getAttribute('data-tipo');
    return type;
  }

  private getSeatId():string {
    const seatId = this.elementRef.nativeElement.getAttribute('data-id');
    return seatId;
  }

  private getPrice():string {
    const price = this.elementRef.nativeElement.getAttribute('data-precio');
    return price;
  }

  private setSeatBackgroundImage() {
    const type = this.getType();
    const BACKGROUND = selectedSeatsImages[type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  private disableSeat() {
    this.elementRef.nativeElement.style.pointerEvents = 'none';
  }

  private getRowAndColumn():{row:string,column:string} {
    const row = this.elementRef.nativeElement.getAttribute('data-fila');
    const column = this.elementRef.nativeElement.getAttribute('data-columna');
    return {row,column};
  }

  private addNewSeat():void {
    const seatId = this.getSeatId();
    const {row,column} = this.getRowAndColumn();
    const price = this.getPrice();
    this.seatStatusService.addSeat(seatId,price,row,column);
  }

  private setSeatCheckedStatus(index:number):void {
    this.seatStatusService.setSeatStatus(index,true);
  }


  @HostListener('click') onClick() {
    this.setSeatBackgroundImage();
    this.disableSeat();
    const seatId = this.getSeatId();
    const index = this.seatStatusService.searchSeat(seatId);

    if (index === -1) {
      this.addNewSeat();
    }
    else {
      this.setSeatCheckedStatus(index);
    }
  }
}
