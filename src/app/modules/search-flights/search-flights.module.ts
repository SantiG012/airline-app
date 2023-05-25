import { NgModule } from '@angular/core';
import { CommonModule,DatePipe} from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SearchFlightsRoutingModule } from './search-flights-routing.module';
import { MainComponent } from './components/main/main.component';
import { FlightComponent } from './components/flight/flight.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { PaidFlightDirective } from './directives/paid-flight.directive';


@NgModule({
  declarations: [
    MainComponent,
    FlightComponent,
    PaidFlightDirective
  ],
  imports: [
    CommonModule,
    SearchFlightsRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    DataBasesServicesModule
  ],
  providers:[DatePipe]
})
export class SearchFlightsModule { }
