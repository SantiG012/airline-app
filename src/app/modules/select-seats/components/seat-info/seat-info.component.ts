import { Component,Input} from '@angular/core';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';

@Component({
  selector: 'app-seat-info',
  templateUrl: './seat-info.component.html',
  styleUrls: ['./seat-info.component.css']
})
export class SeatInfoComponent {
  @Input() seatDTOInput!: SeatStatusDTO;
}
