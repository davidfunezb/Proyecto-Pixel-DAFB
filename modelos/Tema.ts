export interface Tema {
    fondo: string;
    tarjeta: string;
    texto: string;
    textoSuave: string;
    borde: string;
    primario: string;
    secundario: string;
    alerta: string;
}

const temaClaro: Tema = {
    fondo: "#F4F4F8",
    tarjeta: "#FFFFFF",
    texto: "#16162B",
    textoSuave: "#6B7280",
    borde: "#DDDDE6",
    primario: "#3B49DF",
    secundario: "#6B7280",
    alerta: "#C0392B",
};

const temaOscuro: Tema = {
    fondo: "#12121C",
    tarjeta: "#1E1E2E",
    texto: "#F1F1F7",
    textoSuave: "#9CA3AF",
    borde: "#33334A",
    primario: "#5A67F2",
    secundario: "#4B5563",
    alerta: "#E74C3C",
};

export const obtenerTema = (modoNoche: boolean): Tema => (modoNoche ? temaOscuro : temaClaro);
