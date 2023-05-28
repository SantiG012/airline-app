import { Component } from '@angular/core';
import { PlanePostsService } from 'src/app/modules/data-bases-services/posts/plane-posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plane } from 'src/app/Classes/Plane';
import { IPlane } from 'src/app/interfaces/IPlane';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css']
})
export class CreatePlaneComponent {
  planeForm!: FormGroup;
  plane!: IPlane;

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

  private createPlaneFromForm(){
    this.plane = new Plane (
      this.planeTypeControl!.value,
      "Activo"
    );
  }


  onButtonClicked(){
    if (this.planeForm.invalid) return;
    this.createPlaneFromForm();
    this.planePostsService.postPlane(this.plane).subscribe();
    this.planeForm.reset();
  }

  get planeTypeControl() { return this.planeForm.get('planeTypeControl'); }
}
