import {useState} from 'react';
import {login as loginService} from '../services/authService';
import { getCurrentUser } from '@/features/users/service/userService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const executeLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginService(username, password);
            console.log("RESPUESTA CRUDA DEL LOGIN:", data);
            console.log("INTENTANDO EXTRAER EL TOKEN:", data.access);
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            
            // Obtener el perfil real del usuario
            console.log("🔍 [useLogin] Obteniendo perfil para:", data.access.slice(0, 10) + "...");
            const userProfile = await getCurrentUser();
            console.log("✅ [useLogin] Perfil obtenido:", userProfile);
            
            // Determinar rol
            let role = 'viewer';
            if (userProfile.is_superuser) {
                role = 'admin';
            } else if (userProfile.is_staff) {
                role = 'editor';
            }
            
            console.log("🎭 [useLogin] Rol asignado:", role);
            localStorage.setItem('role', role);
            localStorage.setItem('userName', userProfile.first_name || userProfile.username);
            return true;
        }catch (err: any) {
            console.error("❌ [useLogin] Error durante el proceso de login:", err);
            if(err instanceof Error) {
                setError(err.message);
            }else {
                setError('Ocurrio un error inesperado');
            }
            return false;
            }finally {
                setLoading(false);
            }
        };
        return {executeLogin, loading, error};
}
