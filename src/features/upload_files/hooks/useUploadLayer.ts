import { useState } from 'react';
import { uploadLayer } from '../services/layerService';

interface LayerFormData {
  nombre: string;
  estado: string;
  municipio: string;
  categoria: string;
  tipoGeometria: string;
}

// CORRECCIÓN: Asegúrate que diga useUploadLayer (con l minúscula)
export const useUploadLayer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (datosFormulario: LayerFormData, archivo: File) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await uploadLayer(
        datosFormulario.nombre,
        datosFormulario.estado,
        datosFormulario.municipio,
        datosFormulario.categoria,
        datosFormulario.tipoGeometria,
        archivo
      );
      setSuccess(true);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as any;
        setError(axiosError.response?.data?.error || 'Error al subir la capa');
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUpload, isLoading, error, success };
};