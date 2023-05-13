import { Directive,ElementRef, HostListener} from '@angular/core';
import { seatsHoverBackground } from 'src/app/constants/seatsHoverBackground';
import {defaultSeatsBackground} from 'src/app/constants/defaultSeatsBackground';
import { SeatConfirmedStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appHoverBackgroundImage]'
})
export class HoverBackgroundImageDirective {
  Type!: string;
  seatStatus!:boolean;

  constructor(private elementRef:ElementRef,
              private seatConfirmedStatusService:SeatConfirmedStatusService) { }

  ngOnInit() {
    const BOOKING = this.elementRef.nativeElement.getAttribute('data-reserva-id');
    this.Type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
    this.seatStatus = this.seatConfirmedStatusService.getSeatStatus();


    if (!BOOKING || this.seatStatus) {
      return;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    const BACKGROUND = seatsHoverBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    const BACKGROUND = defaultSeatsBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
