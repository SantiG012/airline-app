import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, from,toArray,takeLast,tap} from 'rxjs';
import {
  debounceTime, distinct, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { FlightsByOriginService } from 'src/app/modules/data-bases-services/gets/flights/flights-by-origin.service';
import { FlightConfirmationService } from '../../services/flight-confirmation.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent {
  passangersNumber: number = 1;
  cityForm!: FormGroup;
  flightsExist!: boolean;

  filteredFlights$!: Observable<Vuelo[]>;
  filteredOrigins$!: Observable<string[]>;
  filteredDestinations$!: Observable<string[]>;
  filteredFlights!: Vuelo[];
  corroborationFlightsFlag!: boolean;
  private searchTerms = new Subject<string>();

  constructor(private flightsByOriginService: FlightsByOriginService,
              private flightConfirmationService:FlightConfirmationService,
              private router:Router) {}


  ngOnInit() {
    this.cityForm = new FormGroup({
        originControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')
        ]
      ),
      destinationControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')
        ]
      ),
      passangersNumberControl: new FormControl(
        this.passangersNumber,[
          Validators.required,
          Validators.pattern('^[1-5]$')
        ]
      )
    });

    this.filteredFlights$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.flightsByOriginService.getFlightsByOrigin(term)),
      tap((flights: Vuelo[]) => this.filteredFlights = flights)
    );


    this.filteredOrigins$ = this.filteredFlights$.pipe(
      switchMap((flights: Vuelo[]) => from(flights)
      .pipe(
              map((flight: Vuelo) => flight.origen),
              distinct(),
              toArray()
           )),
    );

    this.filteredDestinations$ = this.filteredFlights$.pipe(
      switchMap((flights: Vuelo[]) => from(flights)
      .pipe(
             map((flight: Vuelo) => flight.destino),
              distinct(),
              toArray()
           ))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onSubmit() {
    this.flightsExist = this.flightConfirmationService.corroborateFlight(
      this.originControl!.value,
      this.destinationControl!.value,
      this.filteredFlights
    );

    if (!this.flightsExist){
      this.corroborationFlightsFlag = true;
      setTimeout(() => {
        this.corroborationFlightsFlag = false;
      }, 5000);
      return;
    }

    this.router.navigate(['seleccinarVuelos'],
        {queryParams:{
          FROM: this.originControl!.value,
          TO: this.destinationControl!.value,
          SEATS: this.passangersNumberControl!.value}});
  }

  get originControl() { return this.cityForm.get('originControl');}
  get destinationControl() { return this.cityForm.get('destinationControl');}
  get passangersNumberControl() { return this.cityForm.get('passangersNumberControl');}
}
