import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceCalculationService } from './services/price-calculation.service';
import { FormsStateTransferService } from './services/forms-state-transfer.service';
import { IdPassengerTransferService } from './services/id-passenger-transfer.service';
import { PassengersInfoRoutingModule } from './passengers-info-routing.module';
import { MainComponent } from './components/main/main.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { PassengerForumComponent } from './components/passenger-forum/passenger-forum.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { FormToUserService } from './services/form-to-user.service';


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
    ReactiveFormsModule,
    DataBasesServicesModule
  ],
  providers:[
    PriceCalculationService,
    FormsStateTransferService,
    IdPassengerTransferService,
    FormsStateTransferService,
    FormToUserService
  ]
})
export class PassengersInfoModule { }
