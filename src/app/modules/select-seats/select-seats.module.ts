import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectSeatsRoutingModule } from './select-seats-routing.module';
import { MainComponent } from './components/main/main.component';
import { SeatComponent } from './components/seat/seat.component';
import { GridComponent } from './components/grid/grid.component';
import { PlaneTopComponent } from './components/plane-top/plane-top.component';
import { DefaultBackgroundImageDirective } from './directives/default-background-image.directive';
import { HoverBackgroundImageDirective } from './directives/hover-background-image.directive';
import { CheckedBackgroundImageDirective } from './directives/checked-background-image.directive';


@NgModule({
  declarations: [
    MainComponent,
    SeatComponent,
    GridComponent,
    PlaneTopComponent,
    DefaultBackgroundImageDirective,
    HoverBackgroundImageDirective,
    CheckedBackgroundImageDirective
  ],
  imports: [
    CommonModule,
    SelectSeatsRoutingModule
  ]
})
export class SelectSeatsModule { }
