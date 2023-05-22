import { Injectable } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';

@Injectable()
export class BookingCreationService {

  constructor() { }

  createBooking(userId:string,flightId:string,seatId:string):Booking{
    const booking:Booking = {
      usuarioId:userId,
      reservaId:'',
      vueloId:flightId,
      estadoPago:'f',
      estado:'Activo',
      idDetalleAsiento:seatId
    }

    return booking;
  }


}
