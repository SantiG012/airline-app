import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, from,toArray } from 'rxjs';
import {
  debounceTime, distinct, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { FlightsByOriginService } from 'src/app/root-services/flights/get-services/flights.service';
import { FlightConfirmationService } from '../services/flight-confirmation.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent {
  origin: string = "";
  destination: string = "";
  passangersNumber: number = 0;
  cityForm!: FormGroup;

  filteredFlights$!: Observable<Vuelo[]>;
  filteredOrigins$!: Observable<string[]>;
  filteredDestinations$!: Observable<string[]>;
  private searchTerms = new Subject<string>();

  constructor(private flightsByOriginService: FlightsByOriginService,
              private flightConfirmationService:FlightConfirmationService) {}


  ngOnInit() {
    this.cityForm = new FormGroup({
        originControl: new FormControl(
        this.origin,[
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')
        ]
      ),
      destinationControl: new FormControl(
        this.destination,[
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

  get originControl() { return this.cityForm.get('originControl');}
  get destinationControl() { return this.cityForm.get('destinationControl');}
  get passangersNumberControl() { return this.cityForm.get('passangersNumberControl');}
}
