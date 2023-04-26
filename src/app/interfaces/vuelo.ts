export interface Vuelo {
    id: string;
    avionId: string;
    fechaHoraSalida: Date;
    fechaHoraLlegada: Date;
    origen: string;
    destino: string;
    estado: string;
    trayeactoId: string;
}
