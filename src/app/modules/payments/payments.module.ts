import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    DataBasesServicesModule
  ]
})
export class PaymentsModule { }
