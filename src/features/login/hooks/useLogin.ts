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
            localStorage.setItem('token', data.access);
            
            // Obtener el perfil real del usuario
            const userProfile = await getCurrentUser();
            
            // Determinar rol
            let role = 'viewer';
            if (userProfile.is_superuser) role = 'admin';
            else if (userProfile.is_staff) role = 'editor';
            
            localStorage.setItem('role', role);
            localStorage.setItem('userName', userProfile.first_name || userProfile.username);

            return true;
        }catch (err: unknown) {
            console.log('❌ [useLogin] Error capturado:', err);
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