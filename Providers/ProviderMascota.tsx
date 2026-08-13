import React, { useState } from "react";
import { ContextMascota } from "../Contextos/ContextMascota";
import { Cambios, EntradaBitacora, EstadoAnimo, Indicador } from "../modelos/Mascota";
import { ViewReact } from "../modelos/ViewReact";

const VALOR_INICIAL: number = 60;
const ENERGIA_MINIMA_PARA_JUGAR: number = 15;

const indicadoresIniciales: Indicador[] = [
    { id: "alimento", etiqueta: "Alimento", valor: VALOR_INICIAL },
    { id: "energia", etiqueta: "Energía", valor: VALOR_INICIAL },
    { id: "animo", etiqueta: "Ánimo", valor: VALOR_INICIAL },
];

const limitar = (valor: number): number => Math.min(100, Math.max(0, valor));

const aplicarCambios = (lista: Indicador[], cambios: Cambios): Indicador[] =>
    lista.map((indicador: Indicador) => {
        if (indicador.id === "alimento") {
            return { ...indicador, valor: limitar(indicador.valor + cambios.alimento) };
        }
        if (indicador.id === "energia") {
            return { ...indicador, valor: limitar(indicador.valor + cambios.energia) };
        }
        return { ...indicador, valor: limitar(indicador.valor + cambios.animo) };
    });

const valorDe = (lista: Indicador[], id: string): number => {
    const encontrado: Indicador | undefined = lista.find((indicador: Indicador) => indicador.id === id);
    return encontrado ? encontrado.valor : 0;
};

const calcularEstadoAnimo = (lista: Indicador[]): EstadoAnimo => {
    if (lista.some((indicador: Indicador) => indicador.valor === 0)) {
        return "Crítico";
    }
    const total: number = lista.reduce((suma: number, indicador: Indicador) => suma + indicador.valor, 0);
    const promedio: number = total / lista.length;
    if (promedio >= 70) {
        return "Feliz";
    }
    if (promedio >= 40) {
        return "Normal";
    }
    return "Decaído";
};

const dosDigitos = (valor: number): string => (valor < 10 ? "0" + valor.toString() : valor.toString());

const horaActual = (): string => {
    const ahora: Date = new Date();
    return dosDigitos(ahora.getHours()) + ":" + dosDigitos(ahora.getMinutes()) + ":" + dosDigitos(ahora.getSeconds());
};

export const ProviderMascota = ({ children }: ViewReact) => {
    const [nombre, setNombre] = useState<string>("Pixel");
    const [indicadores, setIndicadores] = useState<Indicador[]>(indicadoresIniciales);
    const [bitacora, setBitacora] = useState<EntradaBitacora[]>([]);
    const [modoNoche, setModoNoche] = useState<boolean>(false);

    const estadoAnimo: EstadoAnimo = calcularEstadoAnimo(indicadores);
    const necesitaAyuda: boolean = indicadores.some((indicador: Indicador) => indicador.valor === 0);
    const puedeJugar: boolean = valorDe(indicadores, "energia") >= ENERGIA_MINIMA_PARA_JUGAR;

    const registrar = (texto: string): void => {
        setBitacora((anteriores: EntradaBitacora[]) => [
            { id: Date.now().toString() + "-" + anteriores.length.toString(), texto: texto, hora: horaActual() },
            ...anteriores,
        ]);
    };

    const ejecutar = (cambios: Cambios, texto: string): void => {
        const siguientes: Indicador[] = aplicarCambios(indicadores, cambios);
        setIndicadores(siguientes);
        registrar(texto);

        const agotado: Indicador | undefined = siguientes.find((indicador: Indicador) => indicador.valor === 0);
        if (agotado) {
            registrar("¡" + nombre + " necesita ayuda! " + agotado.etiqueta + " llegó a 0.");
        }
    };

    const cambiarNombre = (valor: string): void => {
        setNombre(valor);
    };

    const alternarModoNoche = (): void => {
        const siguiente: boolean = !modoNoche;
        setModoNoche(siguiente);
        registrar(siguiente ? "Se apagaron las luces. Modo noche activado." : "Amaneció. Modo noche desactivado.");
    };

    const alimentar = (): void => {
        ejecutar({ alimento: 20, energia: -5, animo: 5 }, nombre + " comió un pescadito.");
    };

    const jugar = (): void => {
        if (!puedeJugar) {
            return;
        }
        ejecutar({ alimento: -10, energia: -15, animo: 20 }, nombre + " jugó un rato y quedó contento.");
    };

    const descansar = (): void => {
        ejecutar(
            { alimento: -10, energia: modoNoche ? 40 : 25, animo: -5 },
            modoNoche ? nombre + " durmió profundo toda la noche." : nombre + " tomó una siesta.",
        );
    };

    const reiniciar = (): void => {
        setIndicadores(indicadoresIniciales);
        setBitacora([]);
    };

    return (
        <ContextMascota.Provider
            value={{
                nombre,
                indicadores,
                estadoAnimo,
                necesitaAyuda,
                puedeJugar,
                modoNoche,
                bitacora,
                cambiarNombre,
                alternarModoNoche,
                alimentar,
                jugar,
                descansar,
                reiniciar,
            }}
        >
            {children}
        </ContextMascota.Provider>
    );
};
