import { Directive,ElementRef,HostListener,Input} from '@angular/core';
import { selectedSeatsImages } from 'src/app/constants/selected-seats-images';
import { ClickedSeatsTransferService } from '../services/clicked-seats-transfer.service';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Directive({
  selector: '[appSelectedSeatImage]'
})
export class SelectedSeatImageDirective {
  private seatId!:string;
  private seatType!:string;
  @Input('seatInputSelectedSeat') seat!:DetalleAsiento;

  constructor(
    private elementRef:ElementRef,
    private clickedSeatsTransferService:ClickedSeatsTransferService
  ) { }

  ngOnInit(){
    this.seatId = this.elementRef.nativeElement.getAttribute('id');
    this.seatType = this.elementRef.nativeElement.getAttribute('data-tipo-asiento');
  }

  private setSeatBackgroundImage() {
    const BACKGROUND = selectedSeatsImages[this.seatType];
    this.elementRef.nativeElement.style.backgroundImage = `url(${BACKGROUND})`;
  }

  private disableSeat() {
    this.elementRef.nativeElement.style.pointerEvents = 'none';
  }

  private addClickedSeat():void {
    this.clickedSeatsTransferService.addSeat(this.seat);
  } 

  @HostListener('click') onClick() {
    if (this.clickedSeatsTransferService.isMaxSeatsReached()) return;
    this.setSeatBackgroundImage();
    this.disableSeat();
    this.addClickedSeat();
  }


}
