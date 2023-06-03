import { Component } from '@angular/core';
import { PlanePostsService } from 'src/app/modules/data-bases-services/posts/plane-posts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plane } from 'src/app/Classes/Plane';
import { IPlane } from 'src/app/interfaces/IPlane';
import { Observable,tap } from 'rxjs';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css']
})
export class CreatePlaneComponent {
  planeForm!: FormGroup;
  plane!: IPlane;
  serverResponse$!: Observable<any>;
  planeCreated!: boolean;

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
    this.serverResponse$ = this.planePostsService.postPlane(this.plane).pipe(
      tap((_) => {
        if (_) return;

        this.planeCreated = true

        setTimeout(() => {
          this.planeCreated = false
        }
        , 3000);
      })
    );
    this.planeForm.reset();
  }

  get planeTypeControl() { return this.planeForm.get('planeTypeControl'); }
}
