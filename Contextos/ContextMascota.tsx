import { createContext } from "react";
import { EntradaBitacora, EstadoAnimo, Indicador } from "../modelos/Mascota";

export interface EstadoMascota {
    nombre: string;
    indicadores: Indicador[];
    estadoAnimo: EstadoAnimo;
    necesitaAyuda: boolean;
    puedeJugar: boolean;
    modoNoche: boolean;
    bitacora: EntradaBitacora[];
    cambiarNombre: (valor: string) => void;
    alternarModoNoche: () => void;
    alimentar: () => void;
    jugar: () => void;
    descansar: () => void;
    reiniciar: () => void;
}

export const ContextMascota = createContext<EstadoMascota>({
    nombre: "",
    indicadores: [],
    estadoAnimo: "Normal",
    necesitaAyuda: false,
    puedeJugar: true,
    modoNoche: false,
    bitacora: [],
    cambiarNombre: () => { },
    alternarModoNoche: () => { },
    alimentar: () => { },
    jugar: () => { },
    descansar: () => { },
    reiniciar: () => { },
});
