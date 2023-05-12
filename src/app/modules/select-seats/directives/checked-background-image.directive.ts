import { Directive,ElementRef,HostListener} from '@angular/core';
import { seatsCheckedBackground } from 'src/app/constants/checkedSeatBackground';

@Directive({
  selector: '[appCheckedBackgroundImage]'
})
export class CheckedBackgroundImageDirective {

  constructor(private elementRef:ElementRef) { }
  type!:string;

  ngOnInit() {
    this.type = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }


  @HostListener('click') onClick() {
    const BACKGROUND = seatsCheckedBackground[this.type];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }
}
