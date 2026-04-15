import api from "@/api/axiosconfig";
import axios from "axios";
import { Project, ProjectFormData, ProjectPhase } from "../types/project";

// Interfaz para la API de Django
export interface APIProjectPhase {
    nombre: string;
    completada: boolean;
}

export interface APIProject {
    id?: number | string;
    folio?: string;
    nombre_proyecto?: string;
    anio?: string | number;
    estado?: string;
    municipio?: string;
    tipo_escala?: string;
    categoria?: string;
    creado_por?: string | number;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    fases?: APIProjectPhase[];
    avance?: number | string;
}

export const mapAPIToProject = (apiProject: APIProject): Project => {
    const avanceStr = String(apiProject.avance || '0');
    const avance = parseFloat(avanceStr);
    
    // Mapear fases de back a front
    const mappedFases: ProjectPhase[] = (apiProject.fases || []).map((f, i) => ({
        id: `fase-${i}`,
        name: f.nombre,
        completed: f.completada
    }));

    return {
        id: String(apiProject.id || `temp-${Date.now()}`),
        folio: apiProject.folio,
        title: apiProject.nombre_proyecto || 'Sin Nombre',
        estado: apiProject.estado || '',
        municipio: apiProject.municipio || '',
        categoria: apiProject.categoria || '',
        tipoEscala: apiProject.tipo_escala || '',
        capas: [], // Capas no existe en el backend por lo que omitimos.
        fases: mappedFases,
        avance: avance,
        status: (avance >= 100) ? 'Completado' : (avance > 0 ? 'En proceso' : 'Pendiente'),
    };
};

export const mapFormDataToAPI = (formData: ProjectFormData): APIProject => {
    return {
        nombre_proyecto: formData.title,
        estado: formData.estado,
        municipio: formData.municipio,
        tipo_escala: formData.tipoEscala,
        categoria: formData.categoria,
        anio: new Date().getFullYear(),
        avance: 0.0,
        // Adaptamos el formato de fases que espera el backend
        fases: [
            { nombre: 'Planeación', completada: false },
            { nombre: 'Levantamiento Topográfico', completada: false },
            { nombre: 'Digitalización', completada: false },
            { nombre: 'Control de Calidad', completada: false },
            { nombre: 'Entrega', completada: false },
        ]
    };
};

export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await api.get<APIProject[]>("proyectos/");
        // Verificamos si responde un arreglo de objetos
        if (Array.isArray(response.data)) {
            return response.data.map(mapAPIToProject);
        } else if (response.data && Array.isArray((response.data as any).results)) {
            // Paginación tradicional en DRF
            return (response.data as any).results.map(mapAPIToProject);
        }
        return [];
    } catch (error) {
        throw handleAPIError(error, "Error al obtener proyectos.");
    }
};

export const createProject = async (data: ProjectFormData): Promise<Project> => {
    try {
        const payload = mapFormDataToAPI(data);
        const response = await api.post<APIProject>("proyectos/", payload);
        return mapAPIToProject(response.data);
    } catch (error) {
        throw handleAPIError(error, "Error al crear el proyecto.");
    }
};

export const updateProject = async (id: string, partialProject: Project): Promise<Project> => {
    try {
        const payload: Partial<APIProject> = {};
        
        if (partialProject.avance !== undefined) payload.avance = partialProject.avance;
        if (partialProject.fases !== undefined) {
            payload.fases = partialProject.fases.map(f => ({
                nombre: f.name,
                completada: f.completed
            }));
        }

        const response = await api.patch<APIProject>(`proyectos/${id}/`, payload);
        return mapAPIToProject(response.data);
    } catch (error) {
        throw handleAPIError(error, "Error al actualizar el avance del proyecto.");
    }
};

export const deleteProject = async (id: string): Promise<void> => {
    try {
        await api.delete(`proyectos/${id}/`);
    } catch (error) {
        throw handleAPIError(error, "Error al eliminar el proyecto.");
    }
};

const handleAPIError = (error: unknown, defaultMessage: string) => {
    console.error('[projectService] Error:', error);
    if (axios.isAxiosError(error) && error.response) {
        const serverMsg = typeof error.response.data === 'string' 
            ? error.response.data 
            : JSON.stringify(error.response.data);
        return new Error(serverMsg || defaultMessage);
    }
    return new Error(defaultMessage);
};
