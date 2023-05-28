import { IPlane } from "../interfaces/IPlane";
import {v4 as uuidv4} from 'uuid';

export class Plane implements IPlane {
    avionId: string;
    modelo: string;
    estado: string;

    constructor(
        modelo: string,
        estado: string
    ) {
        this.avionId = this.generatePlaneId();
        this.modelo = modelo;
        this.estado = estado;
    }

    private generatePlaneId(): string {
        return uuidv4();
    }
}