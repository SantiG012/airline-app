import { Component } from '@angular/core';
import { SelectedSeatsTransferService } from 'src/app/root-level-services/shared-services/selected-seats-transfer.service';
import { ConfirmedSeatDTO } from 'src/app/DTOs/seatDTOs/confirmedSeatDTO';
import { FormsStateTransferService } from '../../services/forms-state-transfer.service';
import { IdPassengerTransferService } from '../../services/id-passenger-transfer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  selectedSeats!: ConfirmedSeatDTO[];
  hint:Boolean = false;
  
  constructor(private selectedSeatsTransferService: SelectedSeatsTransferService,
              private formsStateTransferService: FormsStateTransferService,
              private idPassengerTransferService:IdPassengerTransferService) { }

  ngOnInit() {
    this.selectedSeats = this.selectedSeatsTransferService.getSelectedSeats();
    this.formsStateTransferService.initializeFormsState(this.selectedSeats.length);
    this.idPassengerTransferService.initializePassengersIds(this.selectedSeats.length);
  }

  private checkFormsState(): boolean {
    return this.formsStateTransferService.getFormsState();
  }

  private checkPassengersIdsState(): boolean {
    return this.idPassengerTransferService.getPassengerIdsState();
  }

  private checkAllStates(): boolean {
    return this.checkFormsState() && this.checkPassengersIdsState();
  }

  private getPassengersIds(): string[] {
    return this.idPassengerTransferService.getPassengersIds();
  }

  private activateHint(): void {
    this.hint = true;

    setTimeout(() => {
      this.hint = false;
    }, 4000);
  }

  onClick(): void {
    if (!this.checkAllStates()) {
      this.activateHint();
      return;
    }
  }


}
