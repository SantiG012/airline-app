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
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      lastNamesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      emailControl: new FormControl(
        null,[
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
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
