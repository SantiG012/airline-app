import { Injectable } from '@angular/core';
import { ConfirmedSeatDTO } from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeatsTransferService {
  private selectedSeats!: ConfirmedSeatDTO[];
  constructor() { }

  public setSelectedSeats(selectedSeats: ConfirmedSeatDTO[]): void {
    this.selectedSeats = selectedSeats;
  }

  public getSelectedSeats(): ConfirmedSeatDTO[] {
    return this.selectedSeats;
  }
}
