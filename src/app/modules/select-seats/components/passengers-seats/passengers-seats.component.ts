import { Component } from '@angular/core';
import { SeatStatusService } from '../../services/seat-status.service';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passengers-seats',
  templateUrl: './passengers-seats.component.html',
  styleUrls: ['./passengers-seats.component.css']
})
export class PassengersSeatsComponent {
  confirmedSeats$!:Observable<SeatStatusDTO[]>;
  maxSeats!:number;

  constructor(private seatStatusService:SeatStatusService,
              private route:ActivatedRoute) { }

  ngOnInit(){
    this.confirmedSeats$=this.seatStatusService.getConfirmedSeatsObservable();
    this.maxSeats=parseInt(this.route.snapshot.queryParamMap.get('SEATS')!);
    this.seatStatusService.setMaxSeats(this.maxSeats);
  }

  onConfirmSeats(){
    //TODO
  }

}
