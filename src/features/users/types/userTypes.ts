export interface User {
    id: number; // Django usa IDs numéricos por defecto
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login?: string;
    date_joined: string;
}

/**
 * Tipo para la creación de un nuevo usuario.
 * Omitimos el 'id' porque lo genera el servidor y 'createdAt'.
 */
export type CreateUserDTO = Omit<User, 'id' | 'date_joined' | 'last_login' | 'is_active'> & {
    password?: string;
};

/**
 * Tipo para la actualización de un usuario.
 * Todos los campos son opcionales excepto el ID.
 */
export type UpdateUserDTO = Partial<CreateUserDTO> & { id: string };

/**
 * Estructura de la respuesta de la API para listas paginadas.
 */
export interface UserResponse {
    data: User[];
    total: number;
    page: number;
    totalPages: number;
}