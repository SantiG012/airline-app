import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StopoverPostsService } from 'src/app/modules/data-bases-services/posts/stopover-posts.service';
import {HttpErrorResponse} from '@angular/common/http';
import { IStopover } from 'src/app/interfaces/IStopover';
import { Stopover } from 'src/app/Classes/Stopover';

@Component({
  selector: 'app-create-stopover',
  templateUrl: './create-stopover.component.html',
  styleUrls: ['./create-stopover.component.css']
})
export class CreateStopoverComponent {
  stopoverForm!: FormGroup;
  isStopoverSaved: boolean = false;

  constructor(
    private stopoverService: StopoverPostsService
  ) { }

  ngOnInit(){
    this.createStopoverFromForm();
    
  }

  private createStopoverFromForm(){
    this.stopoverForm = new FormGroup({
      journeyIdControl: new FormControl(
        null,[
          Validators.required,
        ]
      ),
      cityAirportControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
    });
  }

  private createStopover(): IStopover{
    return new Stopover(
      this.cityAirportControl!.value.trim(),
      this.journeyIdControl!.value.trim()
    );
  }

  private makePostRequest(stopover: IStopover):void{
    this.stopoverService.postStopover([stopover]).subscribe({
      error: (error:HttpErrorResponse)=>{
        if (error.status === 0){
          alert('Error de conexión con el servidor. Intente más tarde');
          return;
        }

        alert('Error al crear la escala: '+error.message);
      },
      complete: ()=>{
        this.isStopoverSaved = true;

        this.stopoverForm.reset();

        setTimeout(()=>{
          this.isStopoverSaved = false;
        }
        ,4000);
      }
    });
  }

  onSavedStopover(){
    if (this.stopoverForm.invalid) {
      alert('Por favor, rellene completamente todos los campos del formulario');
    }

    const stopover:IStopover = this.createStopover();

    this.makePostRequest(stopover);
  }

  get journeyIdControl(){return this.stopoverForm.get('journeyIdControl')}
  get cityAirportControl(){return this.stopoverForm.get('cityAirportControl')}
}
