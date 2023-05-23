import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  searchForm!: FormGroup;

  constructor() { }

  ngOnInit(){
    this.searchForm = new FormGroup({
      idControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      )
    });
  }

  onSubmit(){
    if (!this.searchForm.valid)return;
    
  }

  get idControl() { return this.searchForm.get('idControl');}
}
