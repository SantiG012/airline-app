import { Directive,ElementRef,HostListener} from '@angular/core';
import { seatsCheckedBackground } from 'src/app/constants/checkedSeatBackground';
import { SeatConfirmedStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appCheckedBackgroundImage]'
})
export class CheckedBackgroundImageDirective {

  constructor(private elementRef:ElementRef,
              private seatConfirmedStatusService:SeatConfirmedStatusService) { }
  type!:string;

  ngOnInit() {
    this.type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }


  @HostListener('click') onClick() {
    const BACKGROUND = seatsCheckedBackground[this.type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
    this.seatConfirmedStatusService.setSeatStatus(true);
  }
}
