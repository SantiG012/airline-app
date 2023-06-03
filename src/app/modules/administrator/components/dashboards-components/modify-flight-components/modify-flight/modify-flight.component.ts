import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-flight',
  templateUrl: './modify-flight.component.html',
  styleUrls: ['./modify-flight.component.css']
})
export class ModifyFlightComponent {
  fetchFlightForm!:FormGroup;

  constructor() { }

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
}
