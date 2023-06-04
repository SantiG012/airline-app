import { Component,Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { FlightPutsService } from 'src/app/modules/data-bases-services/puts/flight-puts.service';
import {HttpErrorResponse} from '@angular/common/http';
import { FlightTransferService } from 'src/app/modules/administrator/services/flight-transfer.service';

@Component({
  selector: 'app-modify-cities',
  templateUrl: './modify-cities.component.html',
  styleUrls: ['./modify-cities.component.css']
})
export class ModifyCitiesComponent {
  CitiesForm!:FormGroup;
  isFlightModified!:boolean;
  fetchedFlight!:IVuelo;

  constructor(
    private flightPutsService: FlightPutsService,
    private flightTransferService: FlightTransferService
  ) { }

  ngOnInit(){
    this.flightTransferService.getLastFlight().subscribe({
      next: (flight:IVuelo) => {
        this.fetchedFlight = flight;
        this.initializeForm(flight);
      }
    });
  }

  private initializeForm({origen,destino}:IVuelo){
    this.CitiesForm = new FormGroup({
      departureCityControl: new FormControl(
        origen,[
          Validators.required,
          Validators.pattern("^[A-zÀ-ú ]+$")
        ]
      ),
      arrivalCityControl: new FormControl(
        destino,[
          Validators.required,
          Validators.pattern("^[A-zÀ-ú ]+$")
        ]
      )
    });
  }

  private areFormsValid():boolean{
    if(this.CitiesForm.invalid){
      alert('Por favor, complete el formulario de ciudades adecuadamente'); 
      return false;
    }

    if(this.CitiesForm.value.departureCityControl === this.CitiesForm.value.arrivalCityControl){
      alert('La ciudad de origen y la ciudad de destino no pueden ser iguales');
      return false;
    }

    return true;
  }

  onSaveButtonClicked(){

    if(!this.areFormsValid())return;

    this.fetchedFlight.origen = this.CitiesForm.value.departureCityControl;
    this.fetchedFlight.destino = this.CitiesForm.value.arrivalCityControl;

    this.flightPutsService.modifyDepartureAndArrivalCities(this.fetchedFlight).subscribe({
      error: (error: HttpErrorResponse) => {
        if(error.status === 0){
          alert("Intente más tarde. No hay conexión")
          return;
        }

        alert("Error: "+error.message)
      },
      complete: () => {
        this.isFlightModified = true;

        setTimeout(() => {
          this.isFlightModified = false;
        }
        , 4000);
      }

    });

  }


  get departureCityControl() { return this.CitiesForm.get('departureCityControl'); }
  get arrivalCityControl() { return this.CitiesForm.get('arrivalCityControl'); }
}
