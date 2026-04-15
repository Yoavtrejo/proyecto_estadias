import { useState, useCallback, useEffect } from "react";
import { Project, ProjectFormData } from "../types/project";
import * as projectService from "../service/projectService";

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await projectService.getProjects();
            setProjects(data);
        } catch (err: unknown) {
            console.error('❌ [useProjects] Error fetching projects:', err);
            setError(err instanceof Error ? err.message : 'Error al cargar los proyectos.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch al inicio
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const addProject = async (formData: ProjectFormData): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const newProject = await projectService.createProject(formData);
            setProjects(prev => [...prev, newProject]);
            return true;
        } catch (err: unknown) {
             console.error('❌ [useProjects] Error adding project:', err);
             setError(err instanceof Error ? err.message : 'Error al registrar el proyecto.');
             return false;
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (id: string, partial: Project): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const updated = await projectService.updateProject(id, partial);
            setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
            return true;
        } catch (err: unknown) {
             console.error('❌ [useProjects] Error updating project:', err);
             setError(err instanceof Error ? err.message : 'Error al actualizar el proyecto.');
             return false;
        } finally {
            setLoading(false);
        }
    };

    const removeProject = async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await projectService.deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (err: unknown) {
             console.error('❌ [useProjects] Error deleting project:', err);
             setError(err instanceof Error ? err.message : 'Error al eliminar el proyecto.');
             return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        projects,
        loading,
        error,
        fetchProjects,
        addProject,
        updateProject,
        removeProject
    };
};
