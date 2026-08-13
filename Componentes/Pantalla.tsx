import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { useMascota } from "../hooks/useMascota";
import { obtenerTema, Tema } from "../modelos/Tema";
import { Bitacora } from "./Bitacora";
import { Cabecera } from "./Cabecera";
import { Indicadores } from "./Indicadores";
import { ModoNoche } from "./ModoNoche";
import { PanelAcciones } from "./PanelAcciones";

export const Pantalla = () => {
    const { modoNoche } = useMascota();
    const tema: Tema = obtenerTema(modoNoche);

    return (
        <SafeAreaView style={[estilos.pantalla, { backgroundColor: tema.fondo }]}>
            <StatusBar barStyle={modoNoche ? "light-content" : "dark-content"} />
            <ScrollView contentContainerStyle={estilos.contenido}>
                <Cabecera />
                <ModoNoche />
                <Indicadores />
                <PanelAcciones />
                <Bitacora />
            </ScrollView>
        </SafeAreaView>
    );
};

const estilos = StyleSheet.create({
    pantalla: {
        flex: 1,
    },
    contenido: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
});
