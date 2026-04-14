import api from "@/api/axiosconfig";
import axios from "axios";
export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;  
        password: string;
    }
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("login/", { username, password });
        return response.data;
    } catch (error: unknown) { 
        console.log('[authService] Error en la llamada:', error);
        let message = "Error al iniciar sesión.";

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;
                console.log('[authService] HTTP Status:', status, 'Response:', error.response.data);
                if (status === 401) {
                    message = "Usuario o contraseña incorrectos.";
                } else if (status === 400) {
                    message = "Faltan datos para procesar la solicitud.";
                } else if (status >= 500) {
                    message = "Problema en el servidor. Intente más tarde.";
                } else {
                    message = error.response.data?.detail || "Error al autenticar.";
                    // Traducir mensajes comunes del backend si aún están en inglés
                    if (message.toLowerCase().includes("no active account") || message.toLowerCase().includes("credential")) {
                        message = "Usuario o contraseña incorrectos.";
                    }
                }
            } else if (error.request) {
                console.log('[authService] Request hecho pero sin respuesta del servidor');
                message = "No se pudo conectar con el servidor.";
            } else {
                console.log('[authService] Error en configuración:', error.message);
                message = "Error en la petición: " + error.message;
            }
        } else if (error instanceof Error) {
            message = "Ocurrió un error inesperado al procesar la solicitud.";
        }

        throw new Error(message);
    }
};