import React from 'react';
import { User } from '../types/userTypes';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre de Usuario</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                {user.first_name} {user.last_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                {user.username} 
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                                    user.is_superuser 
                                    ? 'bg-blue-100 text-[#004A61] border border-blue-200' // Administrador
                                    : user.is_staff 
                                        ? 'bg-green-100 text-[#1D8348] border border-green-200' // Editor/Staff
                                        : 'bg-gray-100 text-gray-600 border border-gray-200'   // Usuario normal
                                }`}>
                                    {user.is_superuser ? 'Administrador' : user.is_staff ? 'Editor' : 'Usuario'}
                                </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                    user.is_active ? 'bg-green-500' : 'bg-red-500'
                                    }`}></div>
                                    <span className="text-sm text-gray-700">
                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => onEdit(user)}
                                    className="text-[#004A61] hover:text-[#002d3d] mr-4 font-semibold"
                                >
                                    <span className='icon-edit'/>Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(user.id)}
                                    className="text-red-600 hover:text-red-900 font-semibold"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;