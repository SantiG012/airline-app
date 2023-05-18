import { Component,Input} from '@angular/core';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { SeatStatusService } from '../../services/seat-status.service';

@Component({
  selector: 'app-seat-info',
  templateUrl: './seat-info.component.html',
  styleUrls: ['./seat-info.component.css']
})
export class SeatInfoComponent {
  @Input() seatDTOInput!: SeatStatusDTO;
  @Input() passengerNumber!:number;

  constructor(private seatStatusService:SeatStatusService) { }

  setSeatUncheckedStatus(seatId:string):void {
    const index = this.seatStatusService.searchSeat(seatId);
    this.seatStatusService.setSeatStatus(index,false);
  }
}
