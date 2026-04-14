import { useState, useEffect } from 'react';
import { User, CreateUserDTO } from '../types/userTypes';
import * as userService from '../service/userService';
import { notify } from '@/utils/notifications';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  // Cargar usuarios al montar el componente
    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

  // Función para crear
    const addUser = async (userData: CreateUserDTO) => {
        try {
            await userService.createUser(userData);
            await fetchUsers(); // Recargar lista tras crear
            return { success: true };
        } catch (err: any) {
            return { success: false, message: err.message };
        }
    };

  // Función para eliminar
    const removeUser = async (id: string | number) => {
    const confirmed = await notify.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.');
    
    if (confirmed) {
        try {
            await userService.deleteUser(id);
            // Filtramos el estado local para no tener que hacer otro fetch
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (err: any) {
            alert("No se pudo eliminar: " + err.message);
        }
    }
};

    return {
        users,
        isLoading,
        error,
        addUser,
        removeUser,
        refresh: fetchUsers
    };
};