import { Injectable } from '@angular/core';
import { Booking } from 'src/app/interfaces/booking';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class BookingCreationService {

  constructor() { }

  createBooking(userId:string,flightId:string,seatId:string):Booking{
    const booking:Booking = {
      usuarioId:userId,
      reservaId:this.generateId(),
      vueloId:flightId,
      estadoPago:'f',
      estado:'Activo',
      idDetalleAsiento:seatId
    }

    return booking;
  }

  private generateId():string{
    return uuidv4();
  }

}
