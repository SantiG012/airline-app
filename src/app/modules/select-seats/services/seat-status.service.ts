import { Injectable } from '@angular/core';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';

@Injectable()
export class SeatConfirmedStatusService {
  seatStatusDTO!: SeatStatusDTO[];
  constructor() { 
    this.seatStatusDTO = [];
  }

  getSeatStatus(seatId:string): boolean {
    const index = this.searchSeat(seatId);
    if (index === -1) return false;
    return this.seatStatusDTO[index].status;
  }

  setSeatStatus(index:number,status:boolean) {
    this.seatStatusDTO[index].status = status;
  }

  addSeat(seatId: string, row: string, column: string): void {
    const seat: SeatStatusDTO = {
      seatId,
      status: true,
      row,
      column
    };
    this.seatStatusDTO.push(seat);
  }
  

  searchSeat(seatId:string): number {
    return this.seatStatusDTO.findIndex(seat => seat.seatId === seatId);
  }
}
