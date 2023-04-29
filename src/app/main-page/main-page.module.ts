import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuristicSitesComponent } from './turistic-sites/turistic-sites.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { MainComponent } from './main/main.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';


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
  ]
})
export class MainPageModule { }
