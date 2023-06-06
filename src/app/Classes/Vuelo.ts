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
    trayectoId: string;

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
        this.trayectoId = this.generateUniqueID();
    }
    
    private generateUniqueID(): string {
        return uuidv4();
    }

}