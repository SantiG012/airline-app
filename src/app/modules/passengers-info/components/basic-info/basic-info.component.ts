import { Component } from '@angular/core';
import {SelectedSeatsTransferService} from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';
import {PriceCalculationService} from 'src/app/modules/passengers-info/services/price-calculation.service';
import{ConfirmedSeatDTO} from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent {
  seats!:ConfirmedSeatDTO[];
  seatsQuantity!:number;
  totalPrice!:number;

  constructor(private selectedSeatsTransferService: SelectedSeatsTransferService,
              private priceCalculationService: PriceCalculationService) { }

  ngOnInit(){
    this.seats=this.selectedSeatsTransferService.getSelectedSeats();
    this.seatsQuantity=this.seats.length;
    this.totalPrice=this.priceCalculationService.calculateTotalPrice(this.seats);
  }

}
