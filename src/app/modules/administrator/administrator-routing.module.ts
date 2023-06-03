import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboards-components/dashboard/dashboard.component';
import { AdminAuthenticationGuard } from 'src/app/root-level-guards/admin-authentication.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},{
    path:'dashboard',component:DashboardComponent,
    canActivate:[ AdminAuthenticationGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
