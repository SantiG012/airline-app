import { Injectable } from '@angular/core';

@Injectable()
export class DateValidationService {

  constructor() { }

  public isDepartureDateAfterArrivalDate(departureDate: string, arrivalDate: string): boolean {
    const departureDateObject = new Date(departureDate).getTime();
    const arrivalDateObject = new Date(arrivalDate).getTime();

    if (departureDateObject>arrivalDateObject)return true;
    return false;
  }

  private isDepartureDateEqualsToArrivalDate (departureDate: string, arrivalDate: string): boolean {
    const departureDateObject = new Date(departureDate).getTime();
    const arrivalDateObject = new Date(arrivalDate).getTime();

    if (arrivalDateObject === departureDateObject)return true;
    return false;
  }

}
