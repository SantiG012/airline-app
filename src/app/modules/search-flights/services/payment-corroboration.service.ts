import { Injectable } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';

@Injectable()
export class PaymentCorroborationService {

  constructor() { }

  determineFlightPaymentStatus(flightId: string, bookings: Booking[]): boolean {
    const flightBooking = bookings.filter(booking => booking.vueloId === flightId);
    const flightPaymentStatus = flightBooking[0].estadoPago;
    if (flightPaymentStatus)return true;
    return false;
  }
}
