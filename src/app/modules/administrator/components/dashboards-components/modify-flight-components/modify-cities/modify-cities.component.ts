import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-cities',
  templateUrl: './modify-cities.component.html',
  styleUrls: ['./modify-cities.component.css']
})
export class ModifyCitiesComponent {
  CitiesForm!:FormGroup;

  constructor() { }

  ngOnInit(){
    this.CitiesForm = new FormGroup({
      departureCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern("^[A-zÀ-ú ]+$")
        ]
      ),
      arrivalCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern("^[A-zÀ-ú ]+$")
        ]
      )
    });
  }

  get departureCityControl() { return this.CitiesForm.get('departureCityControl'); }
  get arrivalCityControl() { return this.CitiesForm.get('arrivalCityControl'); }
}
