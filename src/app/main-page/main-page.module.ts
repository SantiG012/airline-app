import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuristicSitesComponent } from './turistic-sites/turistic-sites.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    TuristicSitesComponent,
    TripInfoComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainPageModule { }
