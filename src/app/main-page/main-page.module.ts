import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuristicSitesComponent } from './turistic-sites/turistic-sites.component';
import { TripInfoComponent } from './trip-info/trip-info.component';



@NgModule({
  declarations: [
    TuristicSitesComponent,
    TripInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
