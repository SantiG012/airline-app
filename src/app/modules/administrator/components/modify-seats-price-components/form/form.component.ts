import { Component,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';
import { ClickedSeatsTransferService } from '../../../services/clicked-seats-transfer.service';
import { SeatPutsService } from 'src/app/modules/data-bases-services/puts/seat-puts.service';
import { HttpErrorResponse} from '@angular/common/http'; 


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  seatForm!: FormGroup;
  @Input('seatInput') seat!: DetalleAsiento;
  isSeatModified: boolean = false;

  constructor(
    private clickedSeatsTransferService: ClickedSeatsTransferService,
    private seatPutsService: SeatPutsService
  ) { }

  ngOnInit(){
    this.createForm();
    this.seatPriceControl?.setValue(this.seat.precio);
  }

  private createForm(){
    this.seatForm = new FormGroup({
      seatPriceControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(25000),
          Validators.max(100000)
        ]
      )
    });
  }

  private updateSeatPrice(){
    this.seatPutsService.modifySeat(this.seat).subscribe({
      complete: () => {
        this.isSeatModified = true;
        
        setTimeout(() => {
          this.isSeatModified = false;
          this.clickedSeatsTransferService.removeSeat(this.seat.idDetalleAsiento);
        }
        , 3000);
      },
      error: (error:HttpErrorResponse) => {
        if (error.status === 0){
          alert('Error de conexión con el servidor. Intente más tarde.');
          return;
        }

        alert('Error al modificar el precio del asiento: ' + error.message);
      }
    });
  }

  onCloseButtonClicked(){
    this.clickedSeatsTransferService.removeSeat(this.seat.idDetalleAsiento);
  }

  onSaveChangesButtonClicked(){
    if (this.seatPriceControl?.invalid){
      alert('El precio del asiento debe ser un número entre 25000 y 100000.');
      return;
    }

    this.seat.precio = this.seatPriceControl?.value;
    this.updateSeatPrice();
  }

  get seatPriceControl() { return this.seatForm.get('seatPriceControl'); }
}
