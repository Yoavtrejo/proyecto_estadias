import { useState, useCallback } from "react";
import api from "@/api/axiosconfig";

export interface CapaInfo {
    id: number;
    nombre_capa: string;
    categoria: string;
    municipio: string;
}

export const useMapLayers = () => {
    
    const [listaCapas, setListaCapas] = useState<CapaInfo[]>([]);
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

    const cargarListaCapas = useCallback(async () => {
        try{
            const response = await api.get('subir-capa/');
            setListaCapas(response.data);
        }catch(err){
            console.error("Error al cargar la lista de capas", err);
        }
    },[]);

    const cargarCapaEspecifica = async (id: number) => {
        setIsLoadingCapa(true);
        try{
            const response = await api.get(`subir-capa/${id}/`);
            setCapaActiva(response.data.datos_normalizados);
        }catch(err){
            console.error("Error al cargar geometria", err);
        } finally {
            setIsLoadingCapa(false);
        }
    };

    
    return { capaActiva, isLoadingCapa, errorCapa, setCapaActiva, cargarCapa, limpiarCapa, cargarListaCapas, cargarCapaEspecifica, listaCapas };
};

