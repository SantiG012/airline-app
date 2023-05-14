import { Injectable } from '@angular/core';
import { SeatStatusDTO } from 'src/app/DTOs/SeatStatusDTO';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SeatStatusService {
  private seatStatusDTO!: SeatStatusDTO[];
  private confirmedSeatsSubject = new Subject<SeatStatusDTO[]>();
  private nonConfirmedSeatsSubject = new Subject<SeatStatusDTO[]>();

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
    this.updateConfirmedSeats();
    this.updateNonConfirmedSeats();
  }

  addSeat(seatId: string, row: string, column: string): void {
    const seat: SeatStatusDTO = {
      seatId,
      status: true,
      row,
      column
    };
    this.seatStatusDTO.push(seat);
    this.updateConfirmedSeats();
  }
  

  searchSeat(seatId:string): number {
    return this.seatStatusDTO.findIndex(seat => seat.seatId === seatId);
  }

  private updateConfirmedSeats() {
    this.confirmedSeatsSubject.next(this.seatStatusDTO.filter(seat => seat.status));
  }

  private updateNonConfirmedSeats() {
    this.nonConfirmedSeatsSubject.next(this.seatStatusDTO.filter(seat => !seat.status));
  }

  getConfirmedSeatsObservable():Observable<SeatStatusDTO[]> {
    return this.confirmedSeatsSubject.asObservable();
  }

  getNonConfirmedSeatsObservable():Observable<SeatStatusDTO[]> {
    return this.nonConfirmedSeatsSubject.asObservable();
  }
}
