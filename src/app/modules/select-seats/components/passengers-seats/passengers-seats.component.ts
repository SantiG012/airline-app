import { Component } from '@angular/core';
import { SeatStatusService } from '../../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-passengers-seats',
  templateUrl: './passengers-seats.component.html',
  styleUrls: ['./passengers-seats.component.css']
})
export class PassengersSeatsComponent {
  confirmedSeats$!:Observable<SeatStatusDTO[]>;

  constructor(private seatStatusService:SeatStatusService) { }

  ngOnInit(){
    this.confirmedSeats$=this.seatStatusService.getConfirmedSeatsObservable();
  }

}
