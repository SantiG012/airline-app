import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightTransferService } from 'src/app/modules/administrator/services/flight-transfer.service';
import { IVuelo } from 'src/app/interfaces/IVuelo';

@Component({
  selector: 'app-modify-dates',
  templateUrl: './modify-dates.component.html',
  styleUrls: ['./modify-dates.component.css']
})
export class ModifyDatesComponent {
  datesForm!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  fetchedFlight!: IVuelo;

  constructor(
    private flightTransferService: FlightTransferService
  ) { }

  ngOnInit(){
    this.calculateMinDate();
    this.calculateMaxDate();
    this.createDatesForm();

    this.flightTransferService.getLastFlight().subscribe(
      (lastFlight: IVuelo) => {
        this.fetchedFlight = lastFlight;

        const departureDate = lastFlight.fechaHoraSalida.split(' ')[0];
        const arrivalDate = lastFlight.fechaHoraLlegada.split(' ')[0];
        const departureHours = lastFlight.fechaHoraSalida.split(' ')[1].split(':')[0];
        const arrivalHours = lastFlight.fechaHoraLlegada.split(' ')[1].split(':')[0];
        const departureMinutes = lastFlight.fechaHoraSalida.split(' ')[1].split(':')[1];
        const arrivalMinutes = lastFlight.fechaHoraLlegada.split(' ')[1].split(':')[1];

        this.departureDateControl?.setValue(departureDate);
        this.arrivalDateControl?.setValue(arrivalDate);
        this.departureHoursControl?.setValue(departureHours);
        this.arrivalHoursControl?.setValue(arrivalHours);
        this.departureMinutesControl?.setValue(departureMinutes);
        this.arrivalMinutesControl?.setValue(arrivalMinutes);
      }
    );


  }

  private createDatesForm(){
    this.datesForm = new FormGroup({
      departureDateControl: new FormControl(
        null,[
          Validators.required
        ]
      ),
      arrivalDateControl: new FormControl(
        null,[
          Validators.required
        ]
      ),
      departureHoursControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^00$|^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(23)
        ]
      ),
      arrivalHoursControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^00$|^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(23)
        ]
      ),
      departureMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^00$|^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      ),
      arrivalMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^00$|^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      )
    });
  }

  private calculateMinDate(){
    this.minDate = new Date();
  }

  private calculateMaxDate(){
    const currentDate = new Date();
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, currentDate.getDate());
  }

  get departureDateControl(){ return this.datesForm.get('departureDateControl'); }
  get arrivalDateControl(){ return this.datesForm.get('arrivalDateControl'); }
  get departureHoursControl(){ return this.datesForm.get('departureHoursControl'); }
  get arrivalHoursControl(){ return this.datesForm.get('arrivalHoursControl'); }
  get departureMinutesControl(){ return this.datesForm.get('departureMinutesControl'); }
  get arrivalMinutesControl(){ return this.datesForm.get('arrivalMinutesControl'); }


}
