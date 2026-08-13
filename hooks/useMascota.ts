import { useContext } from "react";
import { ContextMascota, EstadoMascota } from "../Contextos/ContextMascota";

export const useMascota = (): EstadoMascota => useContext(ContextMascota);
