import { Injectable } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';

@Injectable()
export class PaymentCorroborationService {

  flightIdAndBookingId: { [flightId: string]:string } = {};

  constructor() { }

  determineFlightPaymentStatus(flightId: string, bookings: Booking[]): boolean {
    const flightBooking = bookings.filter(booking => booking.vueloId === flightId);
    const flightPaymentStatus = flightBooking[0].estadoPago;

    this.flightIdAndBookingId[flightId] = flightBooking[0].reservaId;
    
    if (flightPaymentStatus === "f")return false;
    return true;
  }

  getBookingId(flightId: string): string {
    return this.flightIdAndBookingId[flightId];
  }

}
