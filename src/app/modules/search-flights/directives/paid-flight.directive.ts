import { Directive,ElementRef,Input} from '@angular/core';

@Directive({
  selector: '[appPaidFlight]'
})
export class PaidFlightDirective {

  @Input() paymentStatus!: string;

  constructor(
    private elementRef:ElementRef
  ) { }

  ngAfterViewInit(){
    if(this.paymentStatus)return;
    this.elementRef.nativeElement.style.pointerEvents = 'none';
    this.elementRef.nativeElement.style.opacity = '0.5';
  }

}
