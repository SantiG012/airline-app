import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { IVuelo } from 'src/app/interfaces/IVuelo';
import { DatePipe } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  @Input() flightInput!: IVuelo;
  SEATS!:string;

  constructor(private datePipe: DatePipe,
            private route: ActivatedRoute,
            private router:Router) { }

  ngOnInit(): void {
    this.SEATS = this.route.snapshot.queryParamMap.get('SEATS')!;
  }

  getFormattedHour(date:string): string {
    return this.datePipe.transform(date, 'HH:mm') || '';
  }

  getFormattedDate(date:string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  onClick() {
    this.router.navigate(['seleccionarAsientos'], { queryParams: { ID:this.flightInput.vueloId,SEATS:this.SEATS} });
  }
}
