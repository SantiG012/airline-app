import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('src/app/modules/main-page/main-page.module').then(m => m.MainPageModule)},
  {path:'seleccionarVuelos', loadChildren: () => import('src/app/modules/select-flight/select-flight.module').then(m => m.SelectFlightModule),
    data: {queryParams:{
      FROM: '',
      TO: '',
      SEATS: ''}
    }
  },{
    path:'seleccionarAsientos', loadChildren: () => import('src/app/modules/select-seats/select-seats.module').then(m => m.SelectSeatsModule),
    data: {queryParams:{
      ID: '',
      SEATS: ''}
    }
  },{
    path:'pasajeros', loadChildren: () => import('src/app/modules/passengers-info/passengers-info.module').then(m => m.PassengersInfoModule),
    data: {queryParams:{
      FLIGHTID: ''}
    }
  },{
    path:'pagos',loadChildren:()=> import('src/app/modules/payments/payments.module').then(m => m.PaymentsModule),
    data: {queryParams:{
      booking: ''}
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
