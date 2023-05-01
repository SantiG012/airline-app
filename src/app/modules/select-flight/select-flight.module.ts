import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectFlightRoutingModule } from './select-flight-routing.module';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';


@NgModule({
  declarations: [
    MainComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    SelectFlightRoutingModule
  ]
})
export class SelectFlightModule { }
