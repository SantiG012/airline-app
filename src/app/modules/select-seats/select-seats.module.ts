import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectSeatsRoutingModule } from './select-seats-routing.module';
import { MainComponent } from './components/main/main.component';
import { SeatComponent } from './components/seat/seat.component';
import { GridComponent } from './components/grid/grid.component';


@NgModule({
  declarations: [
    MainComponent,
    SeatComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    SelectSeatsRoutingModule
  ]
})
export class SelectSeatsModule { }
