import { Injectable } from '@angular/core';
import { SeadConfirmedStatusDTO } from 'src/app/DTOs/SeadConfirmedStatusDTO';

@Injectable()
export class SeatConfirmedStatusService {
  seatConfirmedStatusDTO!: SeadConfirmedStatusDTO;
  constructor() { }

  getSeatStatus(seatId:string): boolean {
    return this.seatConfirmedStatusDTO[seatId] || false; // if undefined, return false
  }

  setSeatStatus(seatId:string,status: boolean): void {
    this.seatConfirmedStatusDTO[seatId] = status;
  }
}
