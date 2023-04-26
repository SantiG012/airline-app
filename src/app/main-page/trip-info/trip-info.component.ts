import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { FlightsByOriginService } from 'src/app/data-bases-services/get-services/flights/flights.service';

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

  constructor(private flightsByOriginService: FlightsByOriginService) {}


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

  }

  get originControl() { return this.cityForm.get('originControl');}
  get destinationControl() { return this.cityForm.get('destinationControl');}
  get passangersNumberControl() { return this.cityForm.get('passangersNumberControl');}
}
