import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectFlightRoutingModule } from './select-flight-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SelectFlightRoutingModule
  ]
})
export class SelectFlightModule { }
