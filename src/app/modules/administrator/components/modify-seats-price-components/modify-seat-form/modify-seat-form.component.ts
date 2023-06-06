import { Component } from '@angular/core';
import { ClickedSeatsTransferService } from '../../../services/clicked-seats-transfer.service';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-modify-seat-form',
  templateUrl: './modify-seat-form.component.html',
  styleUrls: ['./modify-seat-form.component.css']
})
export class ModifySeatFormComponent {
  seats$!: Observable<DetalleAsiento[]>;

  
  constructor(
    private clickedSeatsTransferService: ClickedSeatsTransferService,
  ) { }

  ngOnInit(){
    this.getSeats();
  }

  private getSeats(){
    this.seats$ = this.clickedSeatsTransferService.getClickedSeats();
  }

}
