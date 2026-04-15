import api from "@/api/axiosconfig";
import axios from "axios";
import { User, CreateUserDTO, UpdateUserDTO } from "../types/userTypes";

// Helper para centralizar el manejo de errores (similar a tu login)
const handleAxiosError = (error: unknown, defaultMessage: string) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 403) return "No tienes permisos para realizar esta acción.";
            if (status === 404) return "El recurso solicitado no existe.";

            // Si Django envía un "detail" (ej: errores de autenticación)
            if (data?.detail) return data.detail;

            // Si Django envía errores de campos (ej: {"email": ["Email inválido"]})
            if (typeof data === 'object' && data !== null) {
                // Unimos todos los mensajes de error en una sola cadena legible
                const messages = Object.values(data).flat();
                return messages.join(" | ");
            }

            return defaultMessage;
        }
        if (error.request) return "No hay respuesta del servidor. Revisa tu conexión.";
    }
    return defaultMessage;
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get<User[]>("usuarios/");
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, "Error al obtener la lista de usuarios."));
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await api.get<User>("users/me/");
        return response.data;
    } catch (error) {
        throw new Error(handleAxiosError(error, "Error al obtener el perfil del usuario."));
    }
};

export const createUser = async (userData: any): Promise<any> => {
    try {
        const response = await api.post("usuarios/", userData); 
        return response.data;
    } catch (error: any) {
        throw new Error(handleAxiosError(error, "Error al crear el usuario."));
    }
};

export const updateUser = async (id: string | number, userData: UpdateUserDTO): Promise<User> => {
    try {
        const response = await api.put<User>(`usuarios/${id}/`, userData);
        return response.data;
    } catch (error: any) {
        throw new Error(handleAxiosError(error, "Error al actualizar el usuario."));
    }
};

export const deleteUser = async (id: string | number): Promise<void> => {
    try {
        await api.delete(`usuarios/${id}/`);
    } catch (error) {
        throw new Error(handleAxiosError(error, "Error al eliminar el usuario."));
    }
};