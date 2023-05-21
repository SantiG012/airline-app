import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-forum',
  templateUrl: './passenger-forum.component.html',
  styleUrls: ['./passenger-forum.component.css']
})
export class PassengerForumComponent {
  passengerForm!: FormGroup;
  ngOnInit() {
    this.passengerForm = new FormGroup({
      namesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[a-zA-ZÀ-ÿ\s]+$')
        ]
      ),
      lastNamesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[a-zA-ZÀ-ÿ\s]+$')
        ]
      ),
      emailControl: new FormControl(
        null,[
          Validators.required,
          Validators.email
        ]
      ),
      idControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      ),
    });
  }


}
