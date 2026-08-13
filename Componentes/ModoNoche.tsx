import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { obtenerTema, Tema } from "../modelos/Tema";

export const ModoNoche = () => {
    const { modoNoche, alternarModoNoche } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.fila}>
                <Text style={[estilos.etiqueta, { color: tema.texto }]}>Modo noche</Text>
                <Switch
                    value={modoNoche}
                    onValueChange={alternarModoNoche}
                    trackColor={{ false: tema.borde, true: tema.primario }}
                />
            </View>
            <Text style={[estilos.nota, { color: tema.textoSuave }]}>
                En modo noche, descansar recupera más energía.
            </Text>
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
    },
    etiqueta: {
        fontSize: 15,
        fontWeight: "bold",
    },
    nota: {
        fontSize: 12,
        marginTop: 4,
    },
});
