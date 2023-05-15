import { Directive,ElementRef,HostListener} from '@angular/core';
import { seatsCheckedBackground } from 'src/app/constants/checkedSeatBackground';
import { SeatStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appSelectedSeatImage]'
})
export class SelectedSeatImageDirective {

  constructor(private elementRef:ElementRef,
              private seatStatusService:SeatStatusService) { }
  type!:string;
  seatId!:string;

  ngOnInit() {
    this.seatId = this.elementRef.nativeElement.getAttribute('id');
    this.type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private setSeatBackgroundImage() {
    const BACKGROUND = seatsCheckedBackground[this.type];
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
    this.seatStatusService.addSeat(this.seatId,row,column);
  }

  private checkSeat(index:number):void {
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
      this.checkSeat(index);
    }
  }
}
