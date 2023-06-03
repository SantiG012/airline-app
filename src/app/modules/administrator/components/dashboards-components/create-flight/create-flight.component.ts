import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidationService } from '../../../services/date-validation.service';
import { FlightPostsService } from 'src/app/modules/data-bases-services/posts/flight-posts.service';
import {HttpErrorResponse} from '@angular/common/http';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { Vuelo } from 'src/app/Classes/Vuelo';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
  providers: [DateValidationService]
})
export class CreateFlightComponent {  
  flightForm!: FormGroup;
  minDate!: Date;
  maxDate!: Date;
  flightCreated!:boolean;

  constructor(
    private dateValidationService: DateValidationService,
    private flightPostsService: FlightPostsService
  ) { }

  ngOnInit(){
    this.calculateMinDate();
    this.calculateMaxDate();

    this.flightForm = new FormGroup({
      departureCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      arrivalCityControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
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
      departureMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      ),
      arrivalHoursControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(23)
        ]
      ),
      arrivalMinutesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{2}$'),
          Validators.min(0),
          Validators.max(59)
        ]
      ),
      planeIdControl: new FormControl(
        null,[
          Validators.required
        ]
      )
    });
  }

  calculateMinDate(){
    this.minDate = new Date();
  }

  calculateMaxDate(){
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



  private createFlightObject(): IVuelo{
    const departureCity = this.departureCityControl!.value.trim().toLowerCase();
    const arrivalCity = this.arrivalCityControl!.value.trim().toLowerCase();
    const departureDate = this.departureDateControl!.value.toString();
    const arrivalDate = this.arrivalDateControl!.value.toString();
    const departureHour = this.departureHoursControl!.value.trim();
    const arrivalHour = this.arrivalHoursControl!.value.trim();
    const departureMinutes = this.departureMinutesControl!.value.trim();
    const arrivalMinutes = this.arrivalMinutesControl!.value.trim();
    const planeId = this.planeIdControl!.value.trim();

    const formattedDepartureDate = this.formatDate(departureDate, departureHour, departureMinutes);
    const formattedArrivalDate = this.formatDate(arrivalDate, arrivalHour, arrivalMinutes);

    const flightObject: IVuelo = new Vuelo(
      planeId,
      formattedDepartureDate,
      formattedArrivalDate,
      departureCity,
      arrivalCity
    );

    return flightObject;
  }



  onClick(){

    if(this.flightForm.invalid){
      alert('Por favor, complete todo el formulario adecuadamente'); 
      return;
    }
    
    const areDepartureAndArrivalDatesValid = this.areDepartureAndArrivalDatesValid();

    if(!areDepartureAndArrivalDatesValid){
      return;
    }

    const flight:IVuelo = this.createFlightObject()

    this.flightPostsService.postFlight(flight).subscribe({
      error: (error:HttpErrorResponse)=>{
        
        if (error.status === 0){
          alert("Intente más tarde. No hay conexión")
          return;
        }

        alert(error.message)
      },
      complete:()=>{
        this.flightCreated = true;
        
        setTimeout(
          () =>{
            this.flightCreated = false;
          }
        ,3000)
      }
    })
  }

  get departureCityControl(){ return this.flightForm.get('departureCityControl'); }
  get arrivalCityControl(){ return this.flightForm.get('arrivalCityControl'); }
  get departureDateControl(){ return this.flightForm.get('departureDateControl'); }
  get arrivalDateControl(){ return this.flightForm.get('arrivalDateControl'); }
  get departureHoursControl(){ return this.flightForm.get('departureHoursControl'); }
  get departureMinutesControl(){ return this.flightForm.get('departureMinutesControl'); }
  get arrivalHoursControl(){ return this.flightForm.get('arrivalHoursControl'); }
  get arrivalMinutesControl(){ return this.flightForm.get('arrivalMinutesControl'); }
  get planeIdControl(){ return this.flightForm.get('planeIdControl'); }
}
