import { Component,Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { FlightPutsService } from 'src/app/modules/data-bases-services/puts/flight-puts.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-modify-cities',
  templateUrl: './modify-cities.component.html',
  styleUrls: ['./modify-cities.component.css']
})
export class ModifyCitiesComponent {
  CitiesForm!:FormGroup;
  @Input() flightInput!:IVuelo;
  isFlightModified!:boolean;

  constructor(
    private flightPutsService: FlightPutsService
  ) { }

  ngOnInit(){
    this.CitiesForm = new FormGroup({
      departureCityControl: new FormControl(
        this.flightInput.origen,[
          Validators.required,
          Validators.pattern("^[A-zÀ-ú ]+$")
        ]
      ),
      arrivalCityControl: new FormControl(
        this.flightInput.destino,[
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

    this.flightInput.origen = this.CitiesForm.value.departureCityControl;
    this.flightInput.destino = this.CitiesForm.value.arrivalCityControl;

    this.flightPutsService.modifyDepartureAndArrivalCities(this.flightInput).subscribe({
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
