'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { UserTable, UserModal, UserForm, useUsers } from '@/features/users'; 
import * as userService from '@/features/users/service/userService';
import { notify } from '@/utils/notifications';
import SicatLogo from '@/assets/SICAT_TC.png';

export default function UsersPage() {
    const { users, isLoading, error, refresh } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all'); 

    const handleOpenCreateModal = () => {
        setSelectedUser(null); 
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user: any) => {
        setSelectedUser(user); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleFormSubmit = async (formData: any) => {
        try {
            if (selectedUser) {
                await userService.updateUser(selectedUser.id, formData);
                notify.success('¡Actualizado!', 'El usuario ha sido modificado.');
            } else {
                await userService.createUser(formData);
                notify.success('¡Guardado!', 'El usuario se registró correctamente.');
            }
            handleCloseModal();
            refresh();
        } catch (err: any) {
            notify.error('Atención', err.message); 
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = await notify.confirm('¿Eliminar usuario?', 'Esta acción es permanente.');
        if (confirmed) {
            try {
                await userService.deleteUser(id);
                notify.toast('Usuario eliminado');
                refresh();
            } catch (err: any) {
                notify.error('Error de eliminación', err.message);
            }
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const fullSearch = `${user.first_name} ${user.last_name} ${user.username} ${user.email}`.toLowerCase();
            const matchesSearch = fullSearch.includes(searchTerm.toLowerCase());

            let matchesRole = true;
            if (selectedRole === 'admin') matchesRole = user.is_superuser;
            else if (selectedRole === 'editor') matchesRole = user.is_staff && !user.is_superuser;
            else if (selectedRole === 'user') matchesRole = !user.is_staff && !user.is_superuser;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, selectedRole]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <Image src={SicatLogo} alt="SICAT Logo" width={120} height={40} priority />
                    <h1 className="text-2xl font-bold text-[#004A61]">Gestión de Usuarios</h1>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="bg-[#1D8348] hover:bg-[#145A32] text-white px-5 py-2 rounded-md transition-all font-semibold shadow-sm"
                >
                    + Nuevo Usuario
                </button>
            </header>

            <main className="p-8 flex-grow">
                <div className="max-w-7xl mx-auto">
                    {/* Contenedor de Filtros dentro del layout principal */}
                    <div className="mb-6 flex flex-col md:flex-row gap-4 items-end">
                        <div className="relative flex-grow max-w-md">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Buscar</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input 
                                    type="text" 
                                    placeholder="Nombre, usuario o correo..." 
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D8348] outline-none shadow-sm bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-48">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Filtrar por Rol</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1D8348] outline-none shadow-sm bg-white text-gray-700 font-medium"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="all">Todos los roles</option>
                                <option value="admin">Administradores</option>
                                <option value="editor">Editores</option>
                                <option value="user">Usuarios</option>
                            </select>
                        </div>

                        <div className="pb-3 text-sm text-gray-500 font-medium">
                            {filteredUsers.length} resultados
                        </div>
                    </div>

                    {/* Estados de carga y error */}
                    {isLoading && <p className="text-center py-10 text-gray-500">Cargando usuarios...</p>}
                    {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                    {/* Tabla con los usuarios FILTRADOS */}
                    {!isLoading && !error && filteredUsers.length > 0 && (
                        <UserTable 
                            users={filteredUsers} 
                            onEdit={handleOpenEditModal}
                            onDelete={handleDelete} 
                        />
                    )}

                    {/* Empty State */}
                    {!isLoading && filteredUsers.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
                            <div className="text-gray-400 mb-2 italic">No se encontraron resultados</div>
                            <button 
                                onClick={() => { setSearchTerm(''); setSelectedRole('all'); }}
                                className="text-[#1D8348] hover:underline text-sm font-bold"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <UserModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={selectedUser ? "Editar Usuario" : "Registrar Nuevo Usuario"}
            >
                <UserForm 
                    key={selectedUser ? selectedUser.id : 'new-user'}
                    onCancel={handleCloseModal}
                    onSubmit={handleFormSubmit}
                    initialData={selectedUser}
                />
            </UserModal>
            
            <footer className="bg-white py-6 px-8 border-t border-gray-200 mt-auto">
                <p className="text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} SICAT. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
}