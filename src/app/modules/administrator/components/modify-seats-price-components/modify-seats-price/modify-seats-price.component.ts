import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SeatsService } from 'src/app/modules/data-bases-services/gets/seats.service';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Component({
  selector: 'app-modify-seats-price',
  templateUrl: './modify-seats-price.component.html',
  styleUrls: ['./modify-seats-price.component.css']
})
export class ModifySeatsPriceComponent {
  fetchFlightForm!:FormGroup;
  areSeatsFetched:boolean = false;

  constructor(
    private seatsService: SeatsService
  ) { }

  ngOnInit(){
    this.createForm();
  }

  private createForm(){
    this.fetchFlightForm = new FormGroup({
      flightIdControl: new FormControl(
        null,[
          Validators.required
        ]
      )
    });
  }

  onFetchSeatsClick(){
    this.seatsService.getSeatsByFlightId(this.flightIdControl!.value.trim()).subscribe({
      error: (error:HttpErrorResponse) => {
        if(error.status === 0){
          alert('Error de conexión con el servidor. Intente más tarde.');
        }

        alert('Error al obtener los asientos: '+error.message);
      },
      complete: () => {
        this.areSeatsFetched = true;

        setTimeout(() => {
          this.areSeatsFetched = false;
        }
        , 4000);
      }
    });
  }


  get flightIdControl() { return this.fetchFlightForm.get('flightIdControl'); }

}
