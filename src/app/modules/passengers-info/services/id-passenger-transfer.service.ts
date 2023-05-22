import { Injectable } from '@angular/core';

@Injectable()
export class IdPassengerTransferService {
  passengersIds!:string[];
  constructor() { }

  public initializePassengersIds(length:number): void {
    this.passengersIds = new Array(length);
    this.passengersIds.fill('');
  }

  public setPassengerId(index: number, id: string): void {
    this.passengersIds[index] = id;
  }

  public getPassengersIds(): string[]{
    return this.passengersIds;
  }

  public getPassengerIdsState(): boolean {
    return this.passengersIds.every(id => id !== '');
  }
}
