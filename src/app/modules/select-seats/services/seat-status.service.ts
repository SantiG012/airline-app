import { Injectable } from '@angular/core';

@Injectable()
export class SeatStatusService {
  setStatus!: boolean;
  constructor() { }

  getSeatStatus(): boolean {
    return this.setStatus;
  }

  setSeatStatus(status: boolean): void {
    this.setStatus = status;
  }
}
