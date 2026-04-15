import api from "@/api/axiosconfig";
import axios from "axios";
export interface LoginResponse {
    access: string;
    refresh: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>("login/", { username, password });
        return response.data;
    }catch (error: unknown) { 
    let message = "Error al iniciar sesión";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.detail || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};