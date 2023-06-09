import { Component } from '@angular/core';
import { FlightsService } from 'src/app/modules/data-bases-services/gets/flights.service';
import { ActivatedRoute } from '@angular/router';
import { IVuelo } from 'src/app/interfaces/IVuelo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  origin!:string;
  destiny!:string;
  flights!:IVuelo[];

  constructor (private flightsService:FlightsService,
               private route: ActivatedRoute){}

  ngOnInit(): void {
    this.origin = this.route.snapshot.queryParamMap.get('FROM')!;
    this.destiny =  this.route.snapshot.queryParamMap.get('TO')!;

    this.flightsService.
    getFlightsByOriginAndDestiny(this.origin,this.destiny)
    .subscribe(flights => this.flights = flights);

  }

}
