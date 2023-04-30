import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, from,toArray,takeLast} from 'rxjs';
import {
  debounceTime, distinct, distinctUntilChanged, map, switchMap
} from 'rxjs/operators';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { FlightsByOriginService } from 'src/app/modules/data-bases-services/gets/flights/flights.service';
import { FlightConfirmationService } from '../../services/flight-confirmation.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent {
  passangersNumber: number = 1;
  cityForm!: FormGroup;
  flightsExist: boolean = false;

  filteredFlights$!: Observable<Vuelo[]>;
  filteredOrigins$!: Observable<string[]>;
  filteredDestinations$!: Observable<string[]>;
  private searchTerms = new Subject<string>();

  constructor(private flightsByOriginService: FlightsByOriginService,
              private flightConfirmationService:FlightConfirmationService) {}


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
    this.filteredFlights$.pipe(
      takeLast(1),
    ).subscribe((flights:Vuelo[]) =>{
        this.flightsExist = this.flightConfirmationService.
        corroborateFlight(this.originControl!.value,
        this.destinationControl!.value,
        flights);
    });

    if (this.flightsExist){
      console.log("Flights exist");
      //TODO
      //this.router.navigate(['/flights']);
    }
  }

  get originControl() { return this.cityForm.get('originControl');}
  get destinationControl() { return this.cityForm.get('destinationControl');}
  get passangersNumberControl() { return this.cityForm.get('passangersNumberControl');}
}
