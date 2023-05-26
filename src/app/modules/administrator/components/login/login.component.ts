import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.adminForm = new FormGroup({
      identificationControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      ),
      passwordControl: new FormControl(
        null,[
          Validators.required,
        ]
      ),
    });
  }

  get identificationControl() { return this.adminForm.get('identificationControl'); }
  get passwordControl() { return this.adminForm.get('passwordControl'); }
}
