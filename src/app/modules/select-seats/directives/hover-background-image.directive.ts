import { Directive,ElementRef, HostListener} from '@angular/core';
import { seatsHoverBackground } from 'src/app/constants/seatsHoverBackground';
import {defaultSeatsBackground} from 'src/app/constants/defaultSeatsBackground';
import { SeatConfirmedStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appHoverBackgroundImage]'
})
export class HoverBackgroundImageDirective {
  Type!: string;

  constructor(private elementRef:ElementRef,
              private seatConfirmedStatusService:SeatConfirmedStatusService) { }

  ngOnInit() {
    this.Type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  validateSeatStatus():boolean {
    const seatId = this.elementRef.nativeElement.getAttribute('id');
    const seatStatus = this.seatConfirmedStatusService.getSeatStatus(seatId);
    return seatStatus;
  }
      

  @HostListener('mouseenter') onMouseEnter() {
    if (this.validateSeatStatus()) return;
    const BACKGROUND = seatsHoverBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.validateSeatStatus()) return;
    const BACKGROUND = defaultSeatsBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
