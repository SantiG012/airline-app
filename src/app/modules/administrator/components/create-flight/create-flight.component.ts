import { Component } from '@angular/core';
import { MatDatepicker} from '@angular/material/datepicker';


@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css'],
  providers: [
    MatDatepicker,
  ]
})
export class CreateFlightComponent {

}
