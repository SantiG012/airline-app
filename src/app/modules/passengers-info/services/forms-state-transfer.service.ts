import { Injectable } from '@angular/core';

@Injectable()
export class FormsStateTransferService {
  formsState!: boolean[];
  constructor() { }

  public initializeFormsState(length:number): void {
    this.formsState = new Array(length);
    this.formsState.fill(false);
  }

  public setFormState(index: number, state: boolean): void {
    this.formsState[index] = state;
  }

  public getFormsState(): boolean{
    return this.formsState.every((state) => state);
  }
}
