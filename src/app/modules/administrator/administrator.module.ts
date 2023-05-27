import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
