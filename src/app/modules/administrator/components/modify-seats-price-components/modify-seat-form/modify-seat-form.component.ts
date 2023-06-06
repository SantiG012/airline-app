import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightIdTransferService } from '../../../services/flight-id-transfer.service';

@Component({
  selector: 'app-modify-seat-form',
  templateUrl: './modify-seat-form.component.html',
  styleUrls: ['./modify-seat-form.component.css']
})
export class ModifySeatFormComponent {
  seatForm!:FormGroup;
  
  constructor(
    private flightIdTransferService:FlightIdTransferService
  ) { }

  ngOnInit(){
    this.createForm();
  }

  private createForm(){
    this.seatForm = new FormGroup({
      seatPriceControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9,]*$'),
          Validators.min(25000),
          Validators.max(100000)
        ]
      )
    });
  }

  get seatPriceControl() { return this.seatForm.get('seatPriceControl'); }
}
