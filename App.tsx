import React from "react";
import { Pantalla } from "./Componentes/Pantalla";
import { ProviderMascota } from "./Providers/ProviderMascota";

export default function App() {
    return (
        <ProviderMascota>
            <Pantalla />
        </ProviderMascota>
    );
}
