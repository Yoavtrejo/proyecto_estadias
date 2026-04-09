import React, { useState } from 'react';
import { useUploadLayer } from '../hooks/useUploadLayer';
import { CATEGORIAS, GEOMETRIAS } from '@/constants';

export const UploadLayerForm = () => {
  const { handleUpload, isLoading, error, success } = useUploadLayer();

  const [formData, setFormData] = useState({
    nombre: '',
    estado: '',
    municipio: '',
    categoria: '',
    tipoGeometria: '',
  });

  const [archivo, setArchivo] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo) {
      alert("Por favor selecciona un archivo GeoJSON");
      return;
    }
    await handleUpload(formData, archivo);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Subir Nueva Capa ArcGIS</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        {/* Nombre de la Capa */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la Capa</label>
          <input
            type="text"
            name="nombre"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
            placeholder="Ej: Curvas de Nivel Maestras"
            onChange={handleChange}
          />
        </div>

        {/* ... resto del formulario igual que antes ... */}
        {/* Nota: Las funciones .map((cat) => ...) ahora funcionarán 
            porque ya importamos CATEGORIAS arriba */}
            
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              name="categoria"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              onChange={handleChange}
            >
              <option value="">Selecciona...</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Geometría</label>
            <select
              name="tipoGeometria"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
              onChange={handleChange}
            >
              <option value="">Selecciona...</option>
              {GEOMETRIAS.map((geo) => (
                <option key={geo.value} value={geo.value}>{geo.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ... botón y mensajes ... */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-bold transition-colors ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Procesando archivo...' : 'Subir y Normalizar Capa'}
          </button>
        </div>
      </form>
    </div>
  );
};