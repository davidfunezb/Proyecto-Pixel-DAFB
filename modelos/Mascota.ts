export interface Indicador {
    id: string;
    etiqueta: string;
    valor: number;
}

export interface EntradaBitacora {
    id: string;
    texto: string;
    hora: string;
}

export interface Cambios {
    alimento: number;
    energia: number;
    animo: number;
}

export type EstadoAnimo = "Feliz" | "Normal" | "Decaído" | "Crítico";
