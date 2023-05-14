import { Injectable } from '@angular/core';
import { SeatConfirmedStatusDTO } from 'src/app/DTOs/SeatConfirmedStatusDTO';

@Injectable()
export class SeatConfirmedStatusService {
  seatConfirmedStatusDTO!: SeatConfirmedStatusDTO[];
  constructor() { 
    this.seatConfirmedStatusDTO = [];
  }

  getSeatStatus(seatId:string): boolean {
    return this.seatConfirmedStatusDTO[seatId] || false; // if undefined, return false
  }

  setSeatStatus(seatId:string,status: boolean): void {
    this.seatConfirmedStatusDTO[seatId] = status;
  }
}
