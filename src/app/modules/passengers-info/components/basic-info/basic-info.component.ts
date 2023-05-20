import { Component } from '@angular/core';
import {SelectedSeatsTransferService} from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';
import{ConfirmedSeatDTO} from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent {
  seats!:ConfirmedSeatDTO[];
  constructor(private selectedSeatsTransferService: SelectedSeatsTransferService) { }

  ngOnInit(){
    this.seats=this.selectedSeatsTransferService.getSelectedSeats();
  }

}
