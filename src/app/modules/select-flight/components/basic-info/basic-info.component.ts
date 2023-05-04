import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent {
  @Input() origin!: string;
  @Input() destination!: string;
  passengers!:string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.passengers = this.route.snapshot.queryParamMap.get('SEATS')!;
  }
}
