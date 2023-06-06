import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboards-components/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CreateFlightComponent } from './components/dashboards-components/create-flight/create-flight.component';
import { CreatePlaneComponent } from './components/dashboards-components/create-plane/create-plane.component';
import { DataBasesServicesModule } from '../data-bases-services/data-bases-services.module';
import { CheckFlightsComponent } from './components/dashboards-components/check-flights-components/check-flights/check-flights.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlightComponent } from './components/dashboards-components/check-flights-components/flight/flight.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModifyFlightComponent } from './components/dashboards-components/modify-flight-components/modify-flight/modify-flight.component';
import { ModifyCitiesComponent } from './components/dashboards-components/modify-flight-components/modify-cities/modify-cities.component';
import { ModifyDatesComponent } from './components/dashboards-components/modify-flight-components/modify-dates/modify-dates.component';
import { FlightTransferService } from './services/flight-transfer.service';
import { DateValidationService } from './services/date-validation.service';
import { CreateStopoverComponent } from './components/dashboards-components/create-stopover/create-stopover.component';
import { ModifySeatsPriceComponent } from './components/modify-seats-price-components/modify-seats-price/modify-seats-price.component';
import { PlaneTopComponent } from './components/modify-seats-price-components/plane-top/plane-top.component';
import { GridComponent } from './components/modify-seats-price-components/grid/grid.component';
import { SelectedSeatComponent } from './components/modify-seats-price-components/selected-seat/selected-seat.component';
import { SelectSeatsModule } from '../select-seats/select-seats.module';
import { FlightIdTransferService } from './services/flight-id-transfer.service';
import { SeatComponent } from './components/modify-seats-price-components/seat/seat.component';
import { ClickedSeatsTransferService } from './services/clicked-seats-transfer.service';
import { SeatHoverImageDirective } from './directives/seat-hover-image.directive';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    CreateFlightComponent,
    CreatePlaneComponent,
    CheckFlightsComponent,
    FlightComponent,
    ModifyFlightComponent,
    ModifyCitiesComponent,
    ModifyDatesComponent,
    CreateStopoverComponent,
    ModifySeatsPriceComponent,
    PlaneTopComponent,
    GridComponent,
    SelectedSeatComponent,
    SeatComponent,
    SeatHoverImageDirective
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    DataBasesServicesModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SelectSeatsModule
  ],
  providers: [
    DatePipe,
    FlightTransferService,
    DateValidationService,
    FlightIdTransferService,
    ClickedSeatsTransferService
  ]
})
export class AdministratorModule { }
