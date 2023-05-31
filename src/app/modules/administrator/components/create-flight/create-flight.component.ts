import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent {  
  flightForm!: FormGroup;

  constructor() { }

  ngOnInit(){
    this.flightForm = new FormGroup({
      departureCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      arrivalCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      departureDateControl: new FormControl(
        null,[
          Validators.required
        ]
      ),
      arrivalDateControl: new FormControl(
        null,[
          Validators.required
        ]
      ),
      departureHoursControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^00$|^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(23)
        ]
      ),
      departureMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      ),
      arrivalHoursControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(23)
        ]
      ),
      arrivalMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      ),
      planeIdControl: new FormControl(
        null,[
          Validators.required
        ]
      )
    });
  }

}
