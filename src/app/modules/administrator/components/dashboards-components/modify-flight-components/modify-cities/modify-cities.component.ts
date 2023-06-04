import { Component,Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVuelo } from 'src/app/interfaces/IVuelo';

@Component({
  selector: 'app-modify-cities',
  templateUrl: './modify-cities.component.html',
  styleUrls: ['./modify-cities.component.css']
})
export class ModifyCitiesComponent {
  CitiesForm!:FormGroup;
  @Input() flightInput!:IVuelo;

  constructor() { }

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

  get departureCityControl() { return this.CitiesForm.get('departureCityControl'); }
  get arrivalCityControl() { return this.CitiesForm.get('arrivalCityControl'); }
}
