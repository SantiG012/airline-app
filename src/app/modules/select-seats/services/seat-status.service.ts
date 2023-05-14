import { Injectable } from '@angular/core';
import { SeatConfirmedStatusDTO } from 'src/app/DTOs/SeatConfirmedStatusDTO';

@Injectable()
export class SeatConfirmedStatusService {
  seatConfirmedStatusDTO!: SeatConfirmedStatusDTO[];
  constructor() { 
    this.seatConfirmedStatusDTO = [];
  }

  getSeatStatus(seatId:string): boolean {
    const index = this.searchSeat(seatId);
    if (index === -1) return false;
    return this.seatConfirmedStatusDTO[index].status;
  }

  setSeatStatus(seatId:string,status:boolean) {
    const index = this.searchSeat(seatId);
    this.seatConfirmedStatusDTO[index].status = status;
  }

  private searchSeat(seatId:string): number {
    return this.seatConfirmedStatusDTO.findIndex(seat => seat.seatId === seatId);
  }
}
