import { Directive,ElementRef, HostListener} from '@angular/core';
import { seatsHoverImages} from 'src/app/constants/seats-hover-images';
import {seatsDefaultImages} from 'src/app/constants/seats-default-images';
import { SeatStatusService } from '../services/seat-status.service';

@Directive({
  selector: '[appSeatHoverImage]'
})
export class SeatHoverImageDirective {
  Type!: string;

  constructor(private elementRef:ElementRef,
              private SeatStatusService:SeatStatusService) { }

  ngOnInit() {
    this.Type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  validateSeatStatus():boolean {
    const seatId = this.elementRef.nativeElement.getAttribute('id');
    const seatStatus = this.SeatStatusService.getSeatStatus(seatId);
    return seatStatus;
  }
      

  @HostListener('mouseenter') onMouseEnter() {
    if (this.validateSeatStatus()) return;
    const BACKGROUND = seatsHoverImages[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.validateSeatStatus()) return;
    const BACKGROUND = seatsDefaultImages[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
