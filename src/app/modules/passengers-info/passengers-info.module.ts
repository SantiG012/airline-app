import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceCalculationService } from './services/price-calculation.service';
import { PassengersInfoRoutingModule } from './passengers-info-routing.module';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { PassengerForumComponent } from './components/passenger-forum/passenger-forum.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    BasicInfoComponent,
    PassengerForumComponent
  ],
  imports: [
    CommonModule,
    PassengersInfoRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers:[
    PriceCalculationService
  ]
})
export class PassengersInfoModule { }
