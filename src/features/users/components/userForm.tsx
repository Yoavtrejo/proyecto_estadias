'use client';
import React, { useState } from 'react';

const UserForm = ({ onSubmit, onCancel, initialData }: any) => {
  // Función para determinar el rol inicial basado en los booleanos de Django
  const getInitialRole = () => {
    if (initialData?.is_superuser) return 'admin';
    if (initialData?.is_staff) return 'editor';
    return 'user';
  };

  const [formData, setFormData] = useState({
    username: initialData?.username || '',
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    email: initialData?.email || '',
    password: '',
    role: getInitialRole(), // Campo virtual para el select
    status: initialData?.is_active === false ? 'inactive' : 'active', // Mapeo de estado
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Transformamos el "Role" virtual de vuelta a los booleanos de Django
    const payload = {
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      is_superuser: formData.role === 'admin',
      is_staff: formData.role === 'admin' || formData.role === 'editor',
      is_active: formData.status === 'active',
      // Solo enviamos password si hay algo escrito (útil para edición)
      ...(formData.password && { password: formData.password })
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... (campos de nombre y apellido iguales a los anteriores) ... */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Nombre</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} type="text" required className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Apellido</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} type="text" required className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Username</label>
          <input name="username" value={formData.username} onChange={handleChange} type="text" required className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Correo</label>
          <input name="email" value={formData.email} onChange={handleChange} type="email" required className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Selector de Roles amigable */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Rol de Usuario</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] bg-white outline-none"
          >
            <option value="user">Usuario</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* Selector de Estado */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Estado</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] bg-white outline-none"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">Contraseña</label>
        <input name="password" value={formData.password} onChange={handleChange} type="password" required={!initialData} placeholder={initialData ? "Dejar en blanco para no cambiar" : "********"} className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#1D8348] outline-none" />
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Cancelar</button>
        <button type="submit" className="px-6 py-2 bg-[#1D8348] hover:bg-[#145A32] text-white font-semibold rounded-md shadow-sm">
          {initialData ? 'Actualizar' : 'Guardar Usuario'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;