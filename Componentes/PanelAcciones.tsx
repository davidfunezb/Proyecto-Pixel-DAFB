import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { obtenerTema, Tema } from "../modelos/Tema";

export const PanelAcciones = () => {
    const { puedeJugar, modoNoche, alimentar, jugar, descansar, reiniciar } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.fila}>
                <TouchableOpacity style={[estilos.boton, { backgroundColor: tema.primario }]} onPress={alimentar}>
                    <Text style={estilos.texto}>Alimentar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[estilos.boton, { backgroundColor: puedeJugar ? tema.primario : tema.borde }]}
                    onPress={jugar}
                    disabled={!puedeJugar}
                >
                    <Text style={[estilos.texto, !puedeJugar && { color: tema.textoSuave }]}>Jugar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilos.boton, { backgroundColor: tema.primario }]} onPress={descansar}>
                    <Text style={estilos.texto}>Descansar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[estilos.boton, estilos.reiniciar, { backgroundColor: tema.secundario }]}
                onPress={reiniciar}
            >
                <Text style={estilos.texto}>Reiniciar</Text>
            </TouchableOpacity>

            {!puedeJugar && (
                <Text style={[estilos.nota, { color: tema.textoSuave }]}>
                    Sin energía suficiente para jugar. Deja que descanse.
                </Text>
            )}
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        marginBottom: 18,
    },
    fila: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    boton: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 11,
        marginRight: 10,
        marginBottom: 10,
    },
    reiniciar: {
        alignSelf: "flex-start",
    },
    texto: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "bold",
    },
    nota: {
        fontSize: 12,
    },
});
