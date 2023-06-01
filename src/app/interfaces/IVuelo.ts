export interface IVuelo {
    vueloId: string;
    avionId: string;
    fechaHoraSalida: string;
    fechaHoraLlegada: string;
    origen: string;
    destino: string;
    estado: string;
    trayeactoId: string;

    validateSameDayFlight(): boolean;
}
