import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/constants";

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 120000,
});

// api.interceptors.request.use((config) => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

api.interceptors.request.use((config) => {
    console.log("Request URL:", config.baseURL, config.url); // 👈
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;