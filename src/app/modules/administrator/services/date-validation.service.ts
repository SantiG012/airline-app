import { Injectable } from '@angular/core';

@Injectable()
export class DateValidationService {

  constructor() { }
  //We checka that the departure date is after arrival date
  public isDepartureDateAfterArrivalDate(departureDate: string, arrivalDate: string): boolean {
    const departureDateObject = new Date(departureDate).getTime();
    const arrivalDateObject = new Date(arrivalDate).getTime();

    if (departureDateObject>arrivalDateObject)return true;
    return false;
  }
  
  public isDepartureDateEqualsToArrivalDate (departureDate: string, arrivalDate: string): boolean {
    const departureDateObject = new Date(departureDate).getTime();
    const arrivalDateObject = new Date(arrivalDate).getTime();

    if (arrivalDateObject === departureDateObject)return true;
    return false;
  }

  //if the flight takes off and lands on the same day, we check that the departure hour is after the arrival hour
  public isDepartureHourAfterArrivalHour(departureHour: string, arrivalHour: string): boolean {
    if (departureHour > arrivalHour)return true;
    return false;
  }

  private isDepartureMinutesEqualsToArrivalMinutes(departureMinutes: string, arrivalMinutes: string): boolean {
    if (departureMinutes === arrivalMinutes)return true;
    return false;
  }

  private isHourDifferenceGreaterThanOneHour(departureHour: string, arrivalHour: string): boolean {
    if (parseInt(arrivalHour) - parseInt(departureHour) > 1)return true;
    return false;
  }

  //We check that there is a miminum difference of one hour between the departure and arrival hours if the airplane takes off and lands on the same day
  public isOneHourDifferenceBetweenDepartureAndArrivalHours(departureHour: string, arrivalHour: string, departureMinutes: string, arrivalMinutes: string): boolean {
    if(!this.isHourDifferenceGreaterThanOneHour(departureHour, arrivalHour))return false;
    if(!this.isDepartureMinutesEqualsToArrivalMinutes(departureMinutes, arrivalMinutes))return false;
    return true;
  }
}
