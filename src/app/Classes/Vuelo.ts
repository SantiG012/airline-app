import { DatePipe } from "@angular/common";
import { IVuelo } from "../interfaces/IVuelo";
import {v4 as uuidv4} from 'uuid';

export class Vuelo implements IVuelo{
    vueloId: string;
    avionId: string;
    fechaHoraSalida: string;
    fechaHoraLlegada: string;
    origen: string;
    destino: string;
    estado: string;
    trayeactoId: string;

    constructor(
        avionId: string,
        fechaHoraSalida: string,
        fechaHoraLlegada: string,
        origen: string,
        destino: string
    ){
        this.vueloId = this.generateUniqueID();
        this.avionId = avionId;
        this.fechaHoraSalida = fechaHoraSalida;
        this.fechaHoraLlegada = fechaHoraLlegada;
        this.origen = origen;
        this.destino = destino;
        this.estado = 'Activo';
        this.trayeactoId = this.generateUniqueID();
    }

    validateSameDayFlight(): boolean {
        const departureDate = this.stringToDate(this.fechaHoraSalida);
        const arrivalDate = this.stringToDate(this.fechaHoraLlegada);
        const departureHour = this.stringToHour(this.fechaHoraSalida);
        const arrivalHour = this.stringToHour(this.fechaHoraLlegada);

        if(!(departureDate && arrivalDate))return false;

        if(!(departureHour && arrivalHour)) return false;

        if(departureDate !== arrivalDate) return true;

        if(arrivalHour > departureHour) return true;

        return false;
    }
    
    private generateUniqueID(): string {
        return uuidv4();
    }

    private stringToDate(date:string): string | null {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'dd/MM/yyyy');
    }

    private stringToHour(date:string): string | null {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'HH');
    }

}