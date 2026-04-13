import {useState} from 'react';
import {login as loginService} from '../services/authService';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const executeLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginService(username, password);
            localStorage.setItem('token', data.access);
            return true;
        }catch (err: unknown) {
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