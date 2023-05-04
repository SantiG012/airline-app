import { Component } from '@angular/core';
import{FlightsByOriginAndDestinyService} from 'src/app/modules/data-bases-services/gets/flights/flights-by-origin-and-destiny.service';
import { ActivatedRoute } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  origin!:string;
  destiny!:string;
  flights!:Vuelo[];

  constructor (private flightsByOriginAndDestinyService:FlightsByOriginAndDestinyService,
               private route: ActivatedRoute){}

  ngOnInit(): void {
    this.origin = this.route.snapshot.queryParamMap.get('FROM')!;
    this.destiny =  this.route.snapshot.queryParamMap.get('TO')!;

    this.flightsByOriginAndDestinyService.
    getFlightsByOriginAndDestiny(this.origin,this.destiny)
    .subscribe(flights => this.flights = flights);

  }

}
