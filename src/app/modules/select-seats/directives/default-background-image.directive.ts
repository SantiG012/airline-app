import { Directive, ElementRef, Input } from '@angular/core';
import { BackgroundTypes } from 'src/app/interfaces/backgroundTypes';

@Directive({
  selector: '[appDefaultBackgroundImage]'
})
export class DefaultBackgroundImageDirective {
  @Input('seatType') seatType!: string;
  @Input('occupiedSeat') occupiedSeat!: string;

  constructor(private elementRef:ElementRef) { }
  readonly DEFAULT_BACKGROUND = 'https://s.latamairlines.com/images/web-ancillaries/seat-map-icons/disabled.svg';

  readonly BACKGROUNDS: BackgroundTypes = {
    'economy': 'https://s.latamairlines.com/images/web-ancillaries/seat-map-icons/economy.svg',
    'premium-economy': 'https://s.latamairlines.com/images/web-ancillaries/seat-map-icons/premium-economy.svg',
    'business': 'https://s.latamairlines.com/images/web-ancillaries/seat-map-icons/business.svg',
  };

  ngOnInit() {
    if (this.occupiedSeat){
      this.elementRef.nativeElement.style.backgroundImage = `url(${this.DEFAULT_BACKGROUND})`;
      return;
    }
    const background = this.BACKGROUNDS[this.seatType];
    this.elementRef.nativeElement.style.backgroundImage = `url(${background})`;
  }
}
