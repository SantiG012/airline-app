import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectSeatsRoutingModule } from './select-seats-routing.module';
import { MainComponent } from './components/main/main.component';
import { SeatComponent } from './components/seat/seat.component';
import { GridComponent } from './components/grid/grid.component';
import { PlaneTopComponent } from './components/plane-top/plane-top.component';
import { SeatDefaultImageDirective } from './directives/seat-default-image.directive';
import { SeatHoverImageDirective } from './directives/seat-hover-image.directive';
import { SelectedSeatImageDirective } from './directives/selected-seat-image.directive';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { SeatStatusService } from './services/seat-status.service';
import { EnableSeatDirective } from './directives/enable-seat.directive';


@NgModule({
  declarations: [
    MainComponent,
    SeatComponent,
    GridComponent,
    PlaneTopComponent,
    SeatDefaultImageDirective,
    SeatHoverImageDirective,
    SelectedSeatImageDirective,
    EnableSeatDirective
  ],
  imports: [
    CommonModule,
    SelectSeatsRoutingModule,
    DataBasesServicesModule
  ],
  providers:[
    SeatStatusService
  ]
})
export class SelectSeatsModule { }
