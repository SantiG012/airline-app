import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SearchFlightsRoutingModule } from './search-flights-routing.module';
import { MainComponent } from './components/main/main.component';
import { FlightComponent } from './components/flight/flight.component';


@NgModule({
  declarations: [
    MainComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    SearchFlightsRoutingModule,
    MatInputModule
  ]
})
export class SearchFlightsModule { }
