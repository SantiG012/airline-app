import { Injectable } from '@angular/core';
import { SelectedSeatDTO } from 'src/app/DTOs/seatDTOs/selectedSeatDTO';

@Injectable({
  providedIn: 'root'
})
export class SelectedSeatsTransferService {
  private selectedSeats!: SelectedSeatDTO[];
  constructor() { }

  public setSelectedSeats(selectedSeats: SelectedSeatDTO[]): void {
    this.selectedSeats = selectedSeats;
  }

  public getSelectedSeats(): SelectedSeatDTO[] {
    return this.selectedSeats;
  }
}
