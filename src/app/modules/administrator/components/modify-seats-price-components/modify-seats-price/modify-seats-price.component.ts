import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightIdTransferService } from '../../../services/flight-id-transfer.service';

@Component({
  selector: 'app-modify-seats-price',
  templateUrl: './modify-seats-price.component.html',
  styleUrls: ['./modify-seats-price.component.css']
})
export class ModifySeatsPriceComponent {
  fetchFlightForm!:FormGroup;

  constructor(
    private flightIdTransferService:FlightIdTransferService
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

  onFetchSeatsClick(){
    if (this.fetchFlightForm.invalid) {
      alert('Formulario inválido. Revise los campos en rojo.');
      return;
    }

    this.flightIdTransferService.addNextFlightId(this.flightIdControl!.value.trim());

  }


  get flightIdControl() { return this.fetchFlightForm.get('flightIdControl'); }

}
