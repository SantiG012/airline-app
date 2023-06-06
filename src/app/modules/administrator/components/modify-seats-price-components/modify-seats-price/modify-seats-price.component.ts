import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SeatsService } from 'src/app/modules/data-bases-services/gets/seats.service';

@Component({
  selector: 'app-modify-seats-price',
  templateUrl: './modify-seats-price.component.html',
  styleUrls: ['./modify-seats-price.component.css']
})
export class ModifySeatsPriceComponent {
  fetchFlightForm!:FormGroup;
  areSeatsFetched:boolean = false;

  constructor(
    private seatsService: SeatsService
  ) { }

  ngOnInit(){
    this.createForm();
  }

  private createForm(){
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
