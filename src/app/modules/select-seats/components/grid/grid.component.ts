import { Component } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import {SeatsService} from 'src/app/modules/data-bases-services/gets/seats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  seats!: DetalleAsiento[];

  constructor(private seatsService: SeatsService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    const flightId = this.route.snapshot.queryParamMap.get('ID')!;

    this.seatsService.getSeatsByFlightId(flightId).subscribe(
      (seats: DetalleAsiento[]) => {
        this.seats = seats;
      }
    );
  }

}
