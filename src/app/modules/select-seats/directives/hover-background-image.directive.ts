import { Directive,ElementRef, HostListener} from '@angular/core';
import {SeatsHoverBackground} from 'src/app/constants/seatsHoverBackground';
import {defaultSeatsBackground} from 'src/app/constants/defaultSeatsBackground';

@Directive({
  selector: '[appHoverBackgroundImage]'
})
export class HoverBackgroundImageDirective {
  Type!: string;

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    const BOOKING = this.elementRef.nativeElement.getAttribute('data-reserva-id');
    this.Type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');

    if (!BOOKING) {
      return;
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    const BACKGROUND = SeatsHoverBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    const BACKGROUND = defaultSeatsBackground[this.Type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
