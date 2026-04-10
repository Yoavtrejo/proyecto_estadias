import { useState } from "react";
import api from "@/api/axiosconfig";

export const useMapLayers = () => {
    const [capaActiva, setCapaActiva] = useState<any | null>(null);
    const [isLoadingCapa, setIsLoadingCapa] = useState(false);
    const [errorCapa, setErrorCapa] = useState<string | null>(null);

    const cargarCapa = async (idCapa: number) => {
        setIsLoadingCapa(true);
        setErrorCapa(null);

        try {
            const response = await api.get(`subir-capa/${idCapa}/`);
            setCapaActiva(response.data.datos_normalizados);
        } catch (err) {
            setErrorCapa("Error al cargar la capa");
            console.error(err);
        } finally {
            setIsLoadingCapa(false);
        }
    };
    
    const limpiarCapa = () => {
        setCapaActiva(false);
    };

    
    return { capaActiva, isLoadingCapa, errorCapa, setCapaActiva, cargarCapa, limpiarCapa };

};
