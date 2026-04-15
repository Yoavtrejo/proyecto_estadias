import React from 'react';
import { User } from '../types/userTypes';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
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
                                    className="p-2 text-[#004A61] hover:bg-blue-50 rounded-lg transition-all"
                                    title="Editar usuario"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => onDelete(user.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
                                    title="Eliminar usuario"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
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