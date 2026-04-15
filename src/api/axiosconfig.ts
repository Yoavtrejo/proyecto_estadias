import axios, { AxiosInstance } from "axios";
import {API_URL} from "@/constants";

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 120000,
});

api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
                if (!refreshToken) {
                    throw new Error("No hay token de actualización disponible");
                }

                const  response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken });
                const newAccessToken = response.data.access;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.error("❌ Error crítico en interceptor (Refresh o Sesión):", refreshError);
                
                // SOLO redirigir si no estamos ya en el login para evitar el "reloop" o recargo infinito
                if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default api;