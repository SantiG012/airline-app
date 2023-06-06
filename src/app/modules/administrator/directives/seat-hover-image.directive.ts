import { Directive,ElementRef, HostListener } from '@angular/core';
import { seatsHoverImages} from 'src/app/constants/seats-hover-images';
import {seatsDefaultImages} from 'src/app/constants/seats-default-images';
import { ClickedSeatsTransferService } from '../services/clicked-seats-transfer.service'; 

@Directive({
  selector: '[appSeatHoverImage]'
})
export class SeatHoverImageDirective {
  private Type!: string;

  constructor(
    private clickedSeatsTransferService:ClickedSeatsTransferService,
    private elementRef:ElementRef
  ) { }

  ngOnInit() {
    this.Type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private isSeatClicked():boolean {
    const seatId = this.elementRef.nativeElement.getAttribute('id');
    const seatStatus = this.clickedSeatsTransferService.getSeatStatus(seatId);
    return seatStatus;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isSeatClicked()) return;
    const BACKGROUND = seatsHoverImages[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.isSeatClicked()) return;
    const BACKGROUND = seatsDefaultImages[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

}
