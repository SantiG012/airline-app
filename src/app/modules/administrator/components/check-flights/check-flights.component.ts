import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { Observable, Subject, from,toArray,tap} from 'rxjs';
import {
  debounceTime, distinct, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Component({
  selector: 'app-check-flights',
  templateUrl: './check-flights.component.html',
  styleUrls: ['./check-flights.component.css']
})
export class CheckFlightsComponent {
  checkFlightsForm!: FormGroup;
  private searchTerms = new Subject<string>();
  filteredFlights$!: Observable<Vuelo[]>;
  filteredFlights!: Vuelo[];
  flightsToDisplay!: Vuelo[];
  departureCities$!: Observable<string[]>;
  arrivalCities$!: Observable<string[]>;
  atLeastOneFlight!: boolean;
  displayNoFlightsFound!: boolean;
  displayFlights!: boolean;

  constructor(
    private flightsService: FlightsService
  ){}

  ngOnInit() {
    this.checkFlightsForm = new FormGroup({
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
      )
    });

    this.filteredFlights$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.flightsService.getFlightsByOrigin(term)),
      tap((flights: Vuelo[]) => this.filteredFlights = flights)
    );

    this.departureCities$ = this.filteredFlights$.pipe(
      switchMap((flights: Vuelo[]) => from(flights)
        .pipe(
          map((flight: Vuelo) => flight.origen),
          distinct(),
          toArray()
        )
      )
    );

    this.arrivalCities$ = this.filteredFlights$.pipe(
      switchMap((flights: Vuelo[]) => from(flights)
        .pipe(
          map((flight: Vuelo) => flight.destino),
          distinct(),
          toArray()
        )
      )
    );

  }

  search(term: string): void {
    this.displayFlights = false;
    this.searchTerms.next(term);
  }

  hideFlights(){
    this.displayFlights = false;
  }

  checkFlightsExistence(){
    this.atLeastOneFlight = this.filteredFlights.some(flight => flight.origen === this.departureCityControl?.value && flight.destino === this.arrivalCityControl?.value);
  }

  onButtonClicked(){
    if (this.checkFlightsForm.invalid) return;

    this.checkFlightsExistence();

    if (!this.atLeastOneFlight) {
      this.displayNoFlightsFound = true;

      setTimeout(() => {
        this.displayNoFlightsFound = false;
      }
      , 3000);

      return;
    };

    this.flightsToDisplay = this.filteredFlights.filter(flight => flight.origen === this.departureCityControl?.value && flight.destino === this.arrivalCityControl?.value);

    this.displayFlights = true;

  }

  get departureCityControl() { return this.checkFlightsForm.get('departureCityControl'); }
  get arrivalCityControl() { return this.checkFlightsForm.get('arrivalCityControl'); }
}
