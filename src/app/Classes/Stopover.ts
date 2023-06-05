import { IStopover } from "../interfaces/IStopover";
import {v4 as uuidv4} from 'uuid';

export class Stopover implements IStopover{
    escalaId: string;
    aeropuerto: string;
    trayectoId: string;
    estado: string;

    constructor(
        aeropuerto: string,
        trayectoId: string
    ){
        this.escalaId = this.generateUniqueID();
        this.aeropuerto = aeropuerto;
        this.trayectoId = trayectoId;
        this.estado = 'Activo';
    }

    private generateUniqueID(): string {
        return uuidv4();
    }
}
