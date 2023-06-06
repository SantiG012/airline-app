import { Injectable } from '@angular/core';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class ClickedSeatsTransferService {
  private seats!: DetalleAsiento[];
  private clickedSeatsSubject = new Subject<DetalleAsiento[]>();
  private readonly maxSeats: number = 3;

  constructor() { 
    this.seats = [];
  }

  isMaxSeatsReached():boolean {
    return this.seats.length === this.maxSeats;
  }

  getSeatStatus(seatId:string): boolean {
    const index = this.searchSeat(seatId);
    if (index === -1) return false;
    return true;
  }

  private searchSeat(seatId:string): number {
    return this.seats.findIndex(seat => seat.idDetalleAsiento === seatId);
  }

  addSeat(seat: DetalleAsiento): void {
    this.seats.unshift(seat);
    this.updateClickedSeats();
  }

  private updateClickedSeats() {
    this.clickedSeatsSubject.next(this.seats);
  }

  removeSeat(seatId: string): void {
    const index = this.searchSeat(seatId);
    this.seats.splice(index,1);
    this.updateClickedSeats();
  }

  getClickedSeats(): Observable<DetalleAsiento[]> {
    return this.clickedSeatsSubject.asObservable();
  }
}
