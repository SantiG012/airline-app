import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { ManageSeatsComponent } from './components/manage-seats/manage-seats.component';
import { ManageFlightsComponent } from './components/manage-flights/manage-flights.component';
import { CreatePlaneComponent } from './components/create-plane/create-plane.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    CreateFlightComponent,
    ManageSeatsComponent,
    ManageFlightsComponent,
    CreatePlaneComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class AdministratorModule { }
