import { Component,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalleAsiento } from 'src/app/interfaces/DetalleAsiento';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  seatForm!: FormGroup;
  @Input('seatInput') seat!: DetalleAsiento;

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

  get seatPriceControl() { return this.seatForm.get('seatPriceControl'); }
}
