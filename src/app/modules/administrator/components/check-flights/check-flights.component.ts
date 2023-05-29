import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-check-flights',
  templateUrl: './check-flights.component.html',
  styleUrls: ['./check-flights.component.css']
})
export class CheckFlightsComponent {
  checkFlightsForm!: FormGroup;

  ngOnInit() {
    this.checkFlightsForm = new FormGroup({
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
      )
    });
  }

  get departureCityControl() { return this.checkFlightsForm.get('departureCityControl'); }
  get arrivalCityControl() { return this.checkFlightsForm.get('arrivalCityControl'); }
}
