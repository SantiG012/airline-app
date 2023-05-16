import { Directive,ElementRef,HostListener} from '@angular/core';
import { selectedSeatsImages } from 'src/app/constants/selected-seats-images';
import { SeatStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appSelectedSeatImage]'
})
export class SelectedSeatImageDirective {

  constructor(private elementRef:ElementRef,
              private seatStatusService:SeatStatusService) { }
  private type!:string;
  private seatId!:string;
  

  ngOnInit() {
    this.seatId = this.elementRef.nativeElement.getAttribute('id');
    this.type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private getPrice():string {
    const price = this.elementRef.nativeElement.getAttribute('data-precio');
    return price;
  }

  private setSeatBackgroundImage() {
    const BACKGROUND = selectedSeatsImages[this.type];
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
    const {row,column} = this.getRowAndColumn();
    const price = this.getPrice();
    this.seatStatusService.addSeat(this.seatId,price,row,column);
  }

  private setSeatCheckedStatus(index:number):void {
    this.seatStatusService.setSeatStatus(index,true);
  }


  @HostListener('click') onClick() {
    this.setSeatBackgroundImage();
    this.disableSeat();
    const index = this.seatStatusService.searchSeat(this.seatId);

    if (index === -1) {
      this.addNewSeat();
    }
    else {
      this.setSeatCheckedStatus(index);
    }
  }
}
