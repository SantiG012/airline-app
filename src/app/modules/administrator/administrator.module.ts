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
import { ManageSeatsComponent } from './components/manage-seats/manage-seats.component';
import { ManageFlightsComponent } from './components/manage-flights/manage-flights.component';
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


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    CreateFlightComponent,
    ManageSeatsComponent,
    ManageFlightsComponent,
    CreatePlaneComponent,
    CheckFlightsComponent,
    FlightComponent,
    ModifyFlightComponent,
    ModifyCitiesComponent,
    ModifyDatesComponent
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
    MatNativeDateModule
  ],
  providers: [
    DatePipe,
    FlightTransferService,
    DateValidationService
  ]
})
export class AdministratorModule { }
