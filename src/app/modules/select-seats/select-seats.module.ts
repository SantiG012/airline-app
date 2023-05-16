import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
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
import { PassengersSeatsComponent } from './components/passengers-seats/passengers-seats.component';
import { SeatInfoComponent } from './components/seat-info/seat-info.component';


@NgModule({
  declarations: [
    MainComponent,
    SeatComponent,
    GridComponent,
    PlaneTopComponent,
    SeatDefaultImageDirective,
    SeatHoverImageDirective,
    SelectedSeatImageDirective,
    EnableSeatDirective,
    PassengersSeatsComponent,
    SeatInfoComponent
  ],
  imports: [
    CommonModule,
    SelectSeatsRoutingModule,
    DataBasesServicesModule,
    MatIconModule
  ],
  providers:[
    SeatStatusService
  ]
})
export class SelectSeatsModule { }
