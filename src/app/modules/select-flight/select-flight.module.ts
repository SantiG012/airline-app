import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MatProgressSpinnerModule
  ]
})
export class SelectFlightModule { }
