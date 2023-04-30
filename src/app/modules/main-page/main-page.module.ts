import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuristicSitesComponent } from './components/turistic-sites/turistic-sites.component';
import { TripInfoComponent } from './components/trip-info/trip-info.component';
import { MainComponent } from './components/main/main.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { FlightConfirmationService } from './services/flight-confirmation.service';


@NgModule({
  declarations: [
    TuristicSitesComponent,
    TripInfoComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule
  ],
  providers: [
    FlightConfirmationService
  ]
})
export class MainPageModule { }
