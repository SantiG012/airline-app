import { Component } from '@angular/core';
import { IPlane } from 'src/app/interfaces/IPlane';
import { PlaneGetsService } from 'src/app/modules/data-bases-services/gets/plane-gets.service';
import { Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-search-planes',
  templateUrl: './search-planes.component.html',
  styleUrls: ['./search-planes.component.css']
})
export class SearchPlanesComponent {
  planes:IPlane[] = []; 

  constructor(
    private planeGetsService: PlaneGetsService,
    private clipboard: Clipboard
  ) { }

  onCopyIdClick(id: string) {
    this.clipboard.copy(id);
  }

  onSearchPlanesButtonClick() {
    this.planeGetsService.getPlanes().subscribe({
      next: (planes:IPlane[]) => {
        this.planes = planes;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          console.log('No hay conexion con el servidor');
        }

        alert('Ha ocurrido un error al obtener los aviones: '+ err.message);
      }
    })

  }



}
