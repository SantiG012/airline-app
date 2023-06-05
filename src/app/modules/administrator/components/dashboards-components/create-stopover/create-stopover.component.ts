import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-stopover',
  templateUrl: './create-stopover.component.html',
  styleUrls: ['./create-stopover.component.css']
})
export class CreateStopoverComponent {
  stopoverForm!: FormGroup;

  constructor() { }

  ngOnInit(){
    this.createStopoverFromForm();
    
  }

  private createStopoverFromForm(){
    this.stopoverForm = new FormGroup({
      journeyIdControl: new FormControl(
        null,[
          Validators.required,
        ]
      ),
      cityAirportControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
    });
  }

  get journeyIdControl(){return this.stopoverForm.get('journeyIdControl')}
  get cityAirportControl(){return this.stopoverForm.get('cityAirportControl')}
}
