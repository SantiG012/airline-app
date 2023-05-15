import { Directive, ElementRef, Input } from '@angular/core';
import {seatsDefaultImages} from 'src/app/constants/seats-default-images';

@Directive({
  selector: '[appSeatDefaultImage]'
})
export class SeatDefaultImageDirective {

  constructor(private elementRef:ElementRef) { }
  readonly DEFAULT_BACKGROUND = 'https://s.latamairlines.com/images/web-ancillaries/seat-map-icons/disabled.svg';

  ngOnInit() {
    const BOOKING = this.elementRef.nativeElement.getAttribute('data-reserva-id');
    const TYPE = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');

    if (BOOKING) {
      this.elementRef.nativeElement.style.backgroundImage = `url(${this.DEFAULT_BACKGROUND})`;
      this.elementRef.nativeElement.style.pointerEvents = 'none';
      return;
    }

    const BACKGROUND = seatsDefaultImages[TYPE];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
