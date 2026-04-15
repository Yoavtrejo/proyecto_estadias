import { useState, useCallback } from "react";
import api from "@/api/axiosconfig";

export interface CapaInfo {
    id: number;
    nombre_capa: string;
    categoria: string;
    municipio: string;
}

export interface CapaActiva {
    id: number;
    datos: any;
}

export const useMapLayers = () => {
    
    const [listaCapas, setListaCapas] = useState<CapaInfo[]>([]);
    
    // CAMBIO 1: El estado ahora es un Arreglo inicianilzado en vacío.
    const [capasActivas, setCapasActivas] = useState<CapaActiva[]>([]);
    
    const [isLoadingCapa, setIsLoadingCapa] = useState(false);
    const [errorCapa, setErrorCapa] = useState<string | null>(null);

    // CAMBIO 2: Lógica tipo "Toggle" (Encender / Apagar)
    const cargarCapa = async (idCapa: number) => {
        
        // Si la capa ya está en el arreglo, significa que queremos "apagarla".
        // La removemos y salimos de la función sin descargarla de nuevo.
        const capaYaActivada = capasActivas.find(capa => capa.id === idCapa);
        if (capaYaActivada) {
            setCapasActivas(prev => prev.filter(capa => capa.id !== idCapa));
            return;
        }

        // Si no está activa, entonces comenzamos su descarga de la API
        setIsLoadingCapa(true);
        setErrorCapa(null);

        try {
            const response = await api.get(`subir-capa/${idCapa}/`);
            
            // CAMBIO 3: En vez de sobrescribir, agregamos (concatenamos) la nueva capa a las que ya existen
            setCapasActivas(prev => [
                ...prev, 
                { 
                    id: idCapa, 
                    datos: response.data.datos_normalizados 
                }
            ]);

        } catch (err) {
            setErrorCapa("Error al cargar la capa");
            console.error(err);
        } finally {
            setIsLoadingCapa(false);
        }
    };
    
    // CAMBIO 4: Limpiar todas regresando a un arreglo vacío
    const limpiarCapas = useCallback(() => {
        setCapasActivas([]);
    }, []);

    // Eliminar capa de la BD y del estado local
    const eliminarCapa = useCallback(async (idCapa: number) => {
        try {
            await api.delete(`subir-capa/${idCapa}/`);
            // Remover de la lista
            setListaCapas(prev => prev.filter(c => c.id !== idCapa));
            // Si estaba activa en el mapa, también removerla
            setCapasActivas(prev => prev.filter(c => c.id !== idCapa));
        } catch (err) {
            console.error("Error al eliminar la capa", err);
            throw err;
        }
    }, []);

    const cargarListaCapas = useCallback(async (estado?: string, municipio?: string, proyectoId?: string) => {
        try {
            let url = 'subir-capa/';
            const params = new URLSearchParams();
            if (estado) params.append('estado', estado);
            if (municipio) params.append('municipio', municipio);
            if (proyectoId) params.append('proyecto_id', proyectoId);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await api.get(url);
            setListaCapas(response.data);
        } catch(err) {
            console.error("Error al cargar la lista de capas", err);
        }
    }, []);

    // CAMBIO 5: Actualizamos el return
    return { 
        capasActivas, // <-- Array de capas
        listaCapas, 
        isLoadingCapa, 
        errorCapa, 
        cargarCapa, 
        limpiarCapas, 
        cargarListaCapas,
        eliminarCapa 
    };
};
