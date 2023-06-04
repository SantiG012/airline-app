import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {IVuelo} from 'src/app/interfaces/IVuelo';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { FlightTransferService } from 'src/app/modules/administrator/services/flight-transfer.service';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css']
})
export class ModifyFlightComponent {
  fetchFlightForm!:FormGroup;
  isFlightFetched:boolean = false;

  constructor(
    private flightsService: FlightsService,
    private flightTransferService: FlightTransferService
  ) { }

  ngOnInit(){
    this.fetchFlightForm = new FormGroup({
      flightIdControl: new FormControl(
        null,[
          Validators.required
        ]
      )
    });
  }

  get flightIdControl() { return this.fetchFlightForm.get('flightIdControl'); }

  onButtonFetchFlightClick(){
    this.flightsService.getFlightById(this.flightIdControl?.value.trim()).subscribe({
      next: (flight:IVuelo) => {
        this.flightTransferService.addNextFlight(flight);
      },
      error: (error:HttpErrorResponse) => {
        if(error.status == 0){
          alert("No hay conexión con el servidor. Intente más tarde.");
          return;
        }

        alert("Error al obtener el vuelo:" + error.message);
      },
      complete: () => {
        this.isFlightFetched = true;

        setTimeout(() => {
          this.isFlightFetched = false;
        }
        , 4000);
      }
    });
  }
}
