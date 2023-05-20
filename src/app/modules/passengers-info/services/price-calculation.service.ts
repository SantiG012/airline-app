import { Injectable } from '@angular/core';
import {ConfirmedSeatDTO} from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';

@Injectable()
export class PriceCalculationService {
  constructor() { }

  calculatePrice(seats:ConfirmedSeatDTO[]):number{
    let price=0;
    seats.forEach(seat => {
      price+=this.stringToNumber(seat.price);
    });
    return price;
  }

  //Converts a string to a number
  private stringToNumber(value:string):number{
    return Number(value);
  }

}
