import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengersInfoRoutingModule } from './passengers-info-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PassengersInfoRoutingModule
  ]
})
export class PassengersInfoModule { }
