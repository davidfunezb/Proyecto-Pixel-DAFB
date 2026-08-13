import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { EntradaBitacora } from "../modelos/Mascota";
import { obtenerTema, Tema } from "../modelos/Tema";

export const Bitacora = () => {
    const { bitacora, modoNoche } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <View style={estilos.contenedor}>
            <Text style={[estilos.titulo, { color: tema.texto }]}>Bitácora</Text>

            {bitacora.length === 0 ? (
                <Text style={[estilos.vacia, { color: tema.textoSuave }]}>
                    Todavía no ha pasado nada. ¡Interactúa con tu mascota!
                </Text>
            ) : (
                bitacora.map((entrada: EntradaBitacora) => (
                    <View
                        key={entrada.id}
                        style={[estilos.entrada, { backgroundColor: tema.tarjeta, borderColor: tema.borde }]}
                    >
                        <Text style={[estilos.hora, { color: tema.textoSuave }]}>{entrada.hora}</Text>
                        <Text style={[estilos.texto, { color: tema.texto }]}>{entrada.texto}</Text>
                    </View>
                ))
            )}
        </View>
    );
};

const estilos = StyleSheet.create({
    contenedor: {
        marginBottom: 24,
    },
    titulo: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 8,
    },
    vacia: {
        fontSize: 13,
        fontStyle: "italic",
    },
    entrada: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 8,
    },
    hora: {
        fontSize: 11,
        marginBottom: 2,
    },
    texto: {
        fontSize: 14,
    },
});
