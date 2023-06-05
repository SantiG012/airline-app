import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightTransferService } from 'src/app/modules/administrator/services/flight-transfer.service';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { DateValidationService } from 'src/app/modules/administrator/services/date-validation.service';
import { FlightPutsService } from 'src/app/modules/data-bases-services/puts/flight-puts.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  isFlightModified!:boolean;

  constructor(
    private flightTransferService: FlightTransferService,
    private dateValidationService: DateValidationService,
    private flightPutsService: FlightPutsService
  ) { }

  ngOnInit(){
    this.calculateMinDate();
    this.calculateMaxDate();
    this.createDatesForm();

    this.flightTransferService.getLastFlight().subscribe(
      (lastFlight: IVuelo) => {
        this.fetchedFlight = lastFlight;

        //Date format is 'yyyy-mm-dd HH:MM:SS'  ('2023-06-13 14:00:00')
        const departureDate = lastFlight.fechaHoraSalida.split(' ')[0];
        const arrivalDate = lastFlight.fechaHoraLlegada.split(' ')[0];
        const departureHours = lastFlight.fechaHoraSalida.split(' ')[1].split(':')[0];
        const arrivalHours = lastFlight.fechaHoraLlegada.split(' ')[1].split(':')[0];
        const departureMinutes = lastFlight.fechaHoraSalida.split(' ')[1].split(':')[1];
        const arrivalMinutes = lastFlight.fechaHoraLlegada.split(' ')[1].split(':')[1];

        this.departureDateControl?.setValue(new Date(departureDate.replace(/-/g, '/')));
        this.arrivalDateControl?.setValue(new Date(arrivalDate.replace(/-/g, '/')));
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

  private isDepartureDateAfterArrivalDate(departureDate: string, arrivalDate: string): boolean{
    const isDepartureDateAfterArrivalDate = this.dateValidationService.isDepartureDateAfterArrivalDate(
      departureDate,
      arrivalDate
    );

    return isDepartureDateAfterArrivalDate;
  }

  private isDepartureDateEqualsToArrivalDate(departureDate: string, arrivalDate: string): boolean{
    const isDepartureDateEqualsToArrivalDate = this.dateValidationService.isDepartureDateEqualsToArrivalDate(
      departureDate,
      arrivalDate
    );
    return isDepartureDateEqualsToArrivalDate;
  }

  private isSameDateFlightValid(): boolean{
    const departureHour = this.departureHoursControl!.value;
    const arrivalHour = this.arrivalHoursControl!.value;
    const departureMinutes = this.departureMinutesControl!.value;
    const arrivalMinutes = this.arrivalMinutesControl!.value;

    const isDepartureHourAfterArrivalHour = this.dateValidationService.isDepartureHourAfterArrivalHour(
      departureHour,
      arrivalHour
    );

    const isOneHourDifferenceBetweenDepartureAndArrivalHours = this.dateValidationService.isOneHourDifferenceBetweenDepartureAndArrivalHours(
      departureHour,
      arrivalHour,
      departureMinutes,
      arrivalMinutes
    );


    if(isDepartureHourAfterArrivalHour){
      alert('La hora de despegue no puede estar después de la hora de aterrizaje en un mismo día');
      return false;
    }


    if(!isOneHourDifferenceBetweenDepartureAndArrivalHours){
      alert('La diferencia entre la hora de despegue y la hora de aterrizaje debe ser de al menos una hora en un mismo día');
      return false;
    }

    return true;
  }


  private areDepartureAndArrivalDatesValid(): boolean{
    const departureDate = this.departureDateControl!.value.toString();
    const arrivalDate = this.arrivalDateControl!.value.toString();

    const isDepartureDateAfterArrivalDate = this.isDepartureDateAfterArrivalDate(
      departureDate,
      arrivalDate
    );

    const isDepartureDateEqualsToArrivalDate = this.isDepartureDateEqualsToArrivalDate(
      departureDate,
      arrivalDate
    );

    if(isDepartureDateAfterArrivalDate){
      alert('La fecha de despegue no puede estar después de la fecha de aterrizaje');
      return false;
    }

    if(isDepartureDateEqualsToArrivalDate){
      const isSameDateFlightValid = this.isSameDateFlightValid();
      if(!isSameDateFlightValid){
        return false;
      }
    }

    return true;
  }

  private formatDate(date: string, hours:string, minutes:string): string{
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;

    return formattedDate;
  }

  private updateFlightDates(): void{
    const departureDate = this.departureDateControl!.value.toString().trim();
    const arrivalDate = this.arrivalDateControl!.value.toString().trim();
    const departureHours = this.departureHoursControl!.value.toString().trim();
    const arrivalHours = this.arrivalHoursControl!.value.toString().trim();
    const departureMinutes = this.departureMinutesControl!.value.toString().trim();
    const arrivalMinutes = this.arrivalMinutesControl!.value.toString().trim();

    const formattedDepartureDate = this.formatDate(departureDate, departureHours, departureMinutes);
    const formattedArrivalDate = this.formatDate(arrivalDate, arrivalHours, arrivalMinutes);

    this.fetchedFlight.fechaHoraSalida = formattedDepartureDate;
    this.fetchedFlight.fechaHoraLlegada = formattedArrivalDate;

  }



  onSaveButtonClicked(){
    if(this.datesForm.invalid){
      alert('Por favor, complete todo el formulario de las fechas adecuadamente');
      return;
    }

    const areDepartureAndArrivalDatesValid = this.areDepartureAndArrivalDatesValid();

    if(!areDepartureAndArrivalDatesValid)return;

    this.updateFlightDates();

    this.flightPutsService.modifyDepartureAndArrivalDates(this.fetchedFlight).subscribe({
      error: (error:HttpErrorResponse) => {
        if(error.status === 0){
          alert("Intente más tarde. No hay conexión")
          return;
        }

        alert("Error: "+error.message)
      },
      complete: () => {
        this.isFlightModified = true;

        setTimeout(() => {
          this.isFlightModified = false;
        }
        , 4000);
      }
    });
  }


  get departureDateControl(){ return this.datesForm.get('departureDateControl'); }
  get arrivalDateControl(){ return this.datesForm.get('arrivalDateControl'); }
  get departureHoursControl(){ return this.datesForm.get('departureHoursControl'); }
  get arrivalHoursControl(){ return this.datesForm.get('arrivalHoursControl'); }
  get departureMinutesControl(){ return this.datesForm.get('departureMinutesControl'); }
  get arrivalMinutesControl(){ return this.datesForm.get('arrivalMinutesControl'); }


}
