import { Directive,ElementRef,HostListener} from '@angular/core';
import { seatsCheckedBackground } from 'src/app/constants/checkedSeatBackground';
import { SeatStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appCheckedBackgroundImage]'
})
export class CheckedBackgroundImageDirective {

  constructor(private elementRef:ElementRef,
              private SeatStatusService:SeatStatusService) { }
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

  private unableSeat() {
    this.elementRef.nativeElement.style.pointerEvents = 'none';
  }

  @HostListener('click') onClick() {
    this.setSeatBackgroundImage();
    this.unableSeat();
    this.SeatStatusService.setSeatStatus(this.seatId,true);
  }
}
