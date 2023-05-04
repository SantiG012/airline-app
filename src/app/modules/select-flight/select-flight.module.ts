import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { SelectFlightRoutingModule } from './select-flight-routing.module';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { FlightComponent } from './components/flight/flight.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MainComponent,
    BasicInfoComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    SelectFlightRoutingModule,
    MatProgressSpinnerModule,
    DataBasesServicesModule
  ],
  providers: [
    DatePipe
  ]
})
export class SelectFlightModule { }
