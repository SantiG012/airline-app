import { Component } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import {SeatsService} from 'src/app/modules/data-bases-services/gets/seats.service';
import { ActivatedRoute } from '@angular/router';
import { Observable,of} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  leftColumnSeats$!: Observable<DetalleAsiento[]>;
  rightColumnSeats$!: Observable<DetalleAsiento[]>;

  constructor(private seatsService: SeatsService,
              private route: ActivatedRoute) {}

  ngOnInit(){
    const flightId = this.route.snapshot.queryParamMap.get('ID')!;

    this.seatsService.getSeatsByFlightId(flightId).subscribe((seats) => {
      const half = Math.ceil(seats.length / 2);
      this.leftColumnSeats$ = of(seats.slice(0, half));
      this.rightColumnSeats$ = of(seats.slice(half));
    });
  }
}
