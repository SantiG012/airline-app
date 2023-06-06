import { Component } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import {SeatsService} from 'src/app/modules/data-bases-services/gets/seats.service';
import { Observable,of} from 'rxjs';
import { FlightIdTransferService } from '../../../services/flight-id-transfer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  leftColumnSeats$!: Observable<DetalleAsiento[]>;
  rightColumnSeats$!: Observable<DetalleAsiento[]>;

  constructor (
    private seatsService: SeatsService,
    private flightIdTransferService:FlightIdTransferService
  ){}

  ngOnInit(){
    this.waitForFlightId();
  }

  private waitForFlightId(){
    this.flightIdTransferService.getLastFlightId().subscribe((lastFlightId:string) => {
      this.setSeatsByFlightId(lastFlightId);
    });
  }

  private setSeatsByFlightId(flightId:string):void{
    this.seatsService.getSeatsByFlightId(flightId).subscribe({
      next: (seats:DetalleAsiento[]) => {
        const half = Math.ceil(seats.length / 2);
        this.leftColumnSeats$ = of(seats.slice(0, half));
        this.rightColumnSeats$ = of(seats.slice(half));
      },
      error: (error:HttpErrorResponse) => {
        if(error.status === 0){
          alert('Error de conexión con el servidor. Intente más tarde.');
        }

        alert('Error al obtener los asientos: '+error.message);
      }
    });
  }
}
