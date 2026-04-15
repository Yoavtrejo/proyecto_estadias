"use client";
import React, { useState, useEffect } from 'react';
import api from '@/api/axiosconfig';
// 1. Importamos el hook (Ajusta la ruta según la estructura de tus carpetas)
import { useProjects } from '@/features/projects'; 

export const UploadLayerForm = () => {
  // 2. Extraemos los proyectos y el estado de carga desde tu hook
  const { projects, loading: loadingProjects } = useProjects();

  const [file, setFile] = useState<File | null>(null);
  const [nombreCapa, setNombreCapa] = useState('');
  // 3. Nuevo estado para el ID del proyecto seleccionado
  const [proyectoId, setProyectoId] = useState(''); 
  const [estado, setEstado] = useState('Puebla');
  const [municipio, setMunicipio] = useState('Izúcar de Matamoros');
  const [categoria, setCategoria] = useState('CATASTRO');
  const [tipoGeometria, setTipoGeometria] = useState('Polígono');
  
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ text: 'Por favor, selecciona un archivo GeoJSON.', type: 'error' });
      return;
    }

    if (!proyectoId) {
      setMessage({ text: 'Por favor, selecciona un proyecto para asignar la capa.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('archivo_original', file);
    formData.append('nombre_capa', nombreCapa);
    // 4. Agregamos el ID del proyecto al FormData (verifica si tu backend de Django espera 'proyecto' o 'proyecto_id')
    formData.append('proyecto_id', proyectoId); 
    formData.append('estado', estado);
    formData.append('municipio', municipio);
    formData.append('categoria', categoria);
    formData.append('tipo_geometria', tipoGeometria);

    try {
      const response = await api.post('subir-capa/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ text: `¡Éxito! Capa guardada con el ID: ${response.data.id_capa}`, type: 'success' });
      
      // Limpiar formulario tras éxito
      setFile(null);
      setNombreCapa('');
      setProyectoId('');
      
    } catch (error: any) {
      console.error("Error al subir:", error);
      setMessage({ 
        text: error.response?.data?.error || 'Error de conexión al subir la capa.', 
        type: 'error' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-sm text-black">
      
      {message && (
        <div className={`p-3 rounded font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* --- NUEVO COMBOBOX DE PROYECTOS --- */}
      <div>
        <label className="block font-medium text-black mb-1">Proyecto Asignado</label>
        <select 
          value={proyectoId} 
          onChange={(e) => setProyectoId(e.target.value)} 
          required
          disabled={loadingProjects}
          className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-black focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="" disabled>
            {loadingProjects ? "Cargando proyectos..." : "Selecciona un proyecto"}
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title} - {project.municipio}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-black mb-1">Nombre de la Capa</label>
        <input 
          type="text" 
          required
          value={nombreCapa}
          onChange={(e) => setNombreCapa(e.target.value)}
          placeholder="Ej. Predios 2024" 
          className="w-full p-2 border border-slate-300 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-medium text-black mb-1">Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-black outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Puebla">Puebla</option>
            <option value="Jalisco">Jalisco</option>
            <option value="Yucatán">Yucatán</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-black mb-1">Municipio</label>
          <input 
            type="text" 
            required
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-medium text-black mb-1">Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-black outline-none focus:ring-2 focus:ring-blue-500">
            <option value="CATASTRO">Catastro</option>
            <option value="EQUIPAMIENTO">Equipamiento</option>
            <option value="VIAS">Vías</option>
            <option value="VEGETACION">Vegetación</option>
            <option value="ALTIMETRIA">Altimetría</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-black mb-1">Geometría</label>
          <select value={tipoGeometria} onChange={(e) => setTipoGeometria(e.target.value)} className="w-full p-2 border border-slate-300 rounded bg-slate-50 text-black outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Polígono">Polígono</option>
            <option value="Línea">Línea</option>
            <option value="Punto">Punto</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-black mb-1">Archivo (.geojson)</label>
        <input 
          type="file" 
          accept=".geojson,application/geo+json"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 border border-slate-300 rounded text-black file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 outline-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={isUploading}
        className={`w-full py-2.5 mt-2 text-white font-bold rounded shadow transition-all ${
          isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
        }`}
      >
        {isUploading ? 'Procesando en Django...' : 'Guardar'}
      </button>

    </form>
  );
};  