import { Component } from '@angular/core';
import { PlanePostsService } from 'src/app/modules/data-bases-services/posts/plane-posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css']
})
export class CreatePlaneComponent {
  planeForm!: FormGroup;

  constructor(
    private planePostsService: PlanePostsService
  ) { }

  ngOnInit(){
    this.planeForm = new FormGroup({
      planeTypeControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
    });
    
  }

  onButtonClicked(){
  }

  get planeTypeControl() { return this.planeForm.get('planeTypeControl'); }
}
