import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SearchFlightsRoutingModule } from './search-flights-routing.module';
import { MainComponent } from './components/main/main.component';
import { FlightComponent } from './components/flight/flight.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    SearchFlightsRoutingModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SearchFlightsModule { }
