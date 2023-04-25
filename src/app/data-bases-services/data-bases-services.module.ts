import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsByOriginService } from './get-services/flights-by-origin/flights-by-origin.service';
import{HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    FlightsByOriginService
  ]

})
export class DataBasesServicesModule { }
