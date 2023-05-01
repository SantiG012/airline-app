import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('src/app/modules/main-page/main-page.module').then(m => m.MainPageModule)},
  {path:'seleccinarVuelos', loadChildren: () => import('src/app/modules/select-flight/select-flight.module').then(m => m.SelectFlightModule),
    data: {queryParams:{
      FROM: '',
      TO: '',
      SEATS: ''}
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
