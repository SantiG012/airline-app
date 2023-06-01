import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidationService } from '../../services/date-validation.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
  providers: [DateValidationService]
})
export class CreateFlightComponent {  
  flightForm!: FormGroup;
  minDate!: Date;
  maxDate!: Date;

  constructor(
    private dateValidationService: DateValidationService
  ) { }

  ngOnInit(){
    this.calculateMinDate();
    this.calculateMaxDate();

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

  calculateMinDate(){
    this.minDate = new Date();
  }

  calculateMaxDate(){
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate());
  }

  onClick(){

  }

  get departureCityControl(){ return this.flightForm.get('departureCityControl'); }
  get arrivalCityControl(){ return this.flightForm.get('arrivalCityControl'); }
  get departureDateControl(){ return this.flightForm.get('departureDateControl'); }
  get arrivalDateControl(){ return this.flightForm.get('arrivalDateControl'); }
  get departureHoursControl(){ return this.flightForm.get('departureHoursControl'); }
  get departureMinutesControl(){ return this.flightForm.get('departureMinutesControl'); }
  get arrivalHoursControl(){ return this.flightForm.get('arrivalHoursControl'); }
  get arrivalMinutesControl(){ return this.flightForm.get('arrivalMinutesControl'); }
  get planeIdControl(){ return this.flightForm.get('planeIdControl'); }
}
