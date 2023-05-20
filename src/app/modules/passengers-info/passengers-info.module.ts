import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceCalculationService } from './services/price-calculation.service';
import { PassengersInfoRoutingModule } from './passengers-info-routing.module';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';


@NgModule({
  declarations: [
    MainComponent,
    BasicInfoComponent
  ],
  imports: [
    CommonModule,
    PassengersInfoRoutingModule
  ],
  providers:[
    PriceCalculationService
  ]
})
export class PassengersInfoModule { }
