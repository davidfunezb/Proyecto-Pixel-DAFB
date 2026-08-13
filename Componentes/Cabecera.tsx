import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { obtenerTema, Tema } from "../modelos/Tema";

export const Cabecera = () => {
    const { nombre, estadoAnimo, necesitaAyuda, modoNoche, cambiarNombre } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <View style={estilos.contenedor}>
            <View style={[estilos.marco, { backgroundColor: tema.tarjeta, borderColor: tema.borde }]}>
                <Text style={estilos.imagen}>🐶</Text>
            </View>

            <Text style={[estilos.nombre, { color: tema.texto }]}>{nombre}</Text>
            <Text style={[estilos.estado, { color: tema.textoSuave }]}>Estado: {estadoAnimo}</Text>

            {necesitaAyuda && (
                <Text style={[estilos.aviso, { color: tema.alerta }]}>
                    ¡{nombre} necesita ayuda! Un indicador llegó a 0.
                </Text>
            )}

            <Text style={[estilos.etiqueta, { color: tema.texto }]}>Nombre de la mascota</Text>
            <TextInput
                style={[estilos.campo, { backgroundColor: tema.tarjeta, borderColor: tema.borde, color: tema.texto }]}
                value={nombre}
                onChangeText={cambiarNombre}
                placeholder="Escribe un nombre"
                placeholderTextColor={tema.textoSuave}
            />
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        marginBottom: 18,
    },
    marco: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    imagen: {
        fontSize: 66,
    },
    nombre: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 12,
    },
    estado: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 2,
    },
    aviso: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 8,
    },
    etiqueta: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 8,
    },
    campo: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
    },
});
