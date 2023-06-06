import { Component } from '@angular/core';
import { FlightIdTransferService } from '../../../services/flight-id-transfer.service';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Component({
  selector: 'app-modify-seat-form',
  templateUrl: './modify-seat-form.component.html',
  styleUrls: ['./modify-seat-form.component.css']
})
export class ModifySeatFormComponent {

  
  constructor(
    private flightIdTransferService:FlightIdTransferService
  ) { }

}
