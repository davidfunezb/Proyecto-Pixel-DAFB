import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { Indicador } from "../modelos/Mascota";
import { obtenerTema, Tema } from "../modelos/Tema";

export const Indicadores = () => {
    const { indicadores, modoNoche } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <View style={estilos.contenedor}>
            {indicadores.map((indicador: Indicador) => (
                <View key={indicador.id} style={estilos.fila}>
                    <Text style={[estilos.etiqueta, { color: tema.texto }]}>{indicador.etiqueta}</Text>
                    <View style={[estilos.caja, { backgroundColor: tema.tarjeta, borderColor: tema.borde }]}>
                        <Text style={[estilos.valor, { color: tema.texto }]}>{indicador.valor}%</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        marginBottom: 18,
    },
    fila: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    etiqueta: {
        fontSize: 16,
        fontWeight: "bold",
    },
    caja: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 78,
    },
    valor: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
    },
});
