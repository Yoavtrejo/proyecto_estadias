'use client';

import React, { useEffect, useState } from 'react';
import { UploadLayerForm, useMapLayers } from '@/features/dashboard';
import Image from 'next/image';
import optionsImg from '@/assets/options.png';
import img from '@/assets/image.png';
import { useRouter } from 'next/navigation';

export default function ImportPage() {
  const router = useRouter();
  const { cargarListaCapas, listaCapas, eliminarCapa } = useMapLayers();
  
  // Lógica de Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const capasPorPagina = 5;
  
  const indiceUltimaCapa = paginaActual * capasPorPagina;
  const indicePrimeraCapa = indiceUltimaCapa - capasPorPagina;
  const capasActuales = listaCapas.slice(indicePrimeraCapa, indiceUltimaCapa);
  const totalPaginas = Math.ceil(listaCapas.length / capasPorPagina);

  // Estados del Modal y Eliminación
  const [modalAbierto, setModalAbierto] = useState(false);
  const [capaAEliminar, setCapaAEliminar] = useState<{id: number, nombre: string} | null>(null);
  const [eliminando, setEliminando] = useState(false);

  // Estado del Toast
  const [toast, setToast] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const abrirModalEliminar = (id: number, nombre: string) => {
    setCapaAEliminar({id, nombre});
    setModalAbierto(true);
  };

  const confirmarEliminacion = async () => {
    if (!capaAEliminar) return;
    setEliminando(true);
    try {
      await eliminarCapa(capaAEliminar.id);
      setToast({text: `Capa "${capaAEliminar.nombre}" eliminada exitosamente.`, type: 'success'});
      
      const nuevasCantidad = listaCapas.length - 1;
      const nuevoTotalPaginas = Math.ceil(nuevasCantidad / capasPorPagina);
      if (paginaActual > nuevoTotalPaginas && nuevoTotalPaginas > 0) {
        setPaginaActual(nuevoTotalPaginas);
      }
    } catch {
      setToast({text: 'Error al eliminar la capa. Intenta de nuevo.', type: 'error'});
    } finally {
      setEliminando(false);
      setModalAbierto(false);
      setCapaAEliminar(null);
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    cargarListaCapas();
  }, [cargarListaCapas]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans flex flex-col relative">
      
      {/* Modal de confirmación adaptado al diseño */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Eliminar Capa</h3>
                <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              ¿Estás seguro de que deseas eliminar la capa{' '}
              <strong className="text-gray-900">&quot;{capaAEliminar?.nombre}&quot;</strong>?
              Se eliminarán todos los datos geográficos asociados.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setModalAbierto(false); setCapaAEliminar(null); }}
                disabled={eliminando}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                disabled={eliminando}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all ${
                  eliminando 
                  ? 'bg-red-300 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600 shadow-sm'
                }`}
              >
                {eliminando ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6 w-full">

        {/* 1. BANNER PRINCIPAL */}
        <div className="bg-gradient-to-r from-[#173F4A] to-[#1D7147] rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-lg">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-3">
              Importar Datos <span className="text-green-300">Geoespaciales</span>
            </h1>
            <p className="text-white/80 text-sm leading-relaxed">
              Integre nuevas capas de información al sistema de información catastral,
              el sistema procesará y validará sus datos para garantizar su correcta
              visualización y análisis en el mapa de SICAT.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-all font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Dashboard
            </button>
          </div>
        </div>

        {/* 2. CONTENEDOR DIVIDIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMNA IZQUIERDA (Formulario y Tabla) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tarjeta del Formulario */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center transition-all hover:bg-gray-50/50">
                {/* Se inyecta el componente funcional manteniendo el contenedor visual de tu diseño */}
                <div className="w-full max-w-md">
                   <UploadLayerForm />
                </div>
              </div>
            </div>

            {/* Tarjeta del Historial */}
            <div className="bg-[#FDFDFD] rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de capas subidas</h3>
              
              {listaCapas.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-8">
                  No hay capas subidas aún.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-100">
                          <th className="py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre de la capa</th>
                          <th className="py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                          <th className="py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Municipio</th>
                          <th className="py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {capasActuales.map((capa) => (
                          <tr key={capa.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-2 text-sm font-bold text-[#1D8348]">{capa.nombre_capa}</td>
                            <td className="py-3 px-2 text-sm text-gray-600 uppercase">{capa.categoria}</td>
                            <td className="py-3 px-2 text-sm text-gray-600 uppercase">{capa.municipio}</td>
                            <td className="py-3 px-2 text-center">
                                <button
                                    onClick={() => abrirModalEliminar(capa.id, capa.nombre_capa)}
                                    title="Eliminar capa"
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
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

                  {/* Paginación */}
                  {totalPaginas > 1 && (
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        Mostrando <span className="font-bold">{indicePrimeraCapa + 1}</span> a <span className="font-bold">{Math.min(indiceUltimaCapa, listaCapas.length)}</span> de <span className="font-bold">{listaCapas.length}</span> capas
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={irPaginaAnterior}
                          disabled={paginaActual === 1}
                          className={`p-1.5 rounded-md transition-colors ${paginaActual === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        
                        <div className="bg-gray-100 px-3 py-1 rounded text-sm font-medium text-gray-600">
                          Página {paginaActual} de {totalPaginas}
                        </div>

                        <button 
                          onClick={irPaginaSiguiente}
                          disabled={paginaActual === totalPaginas}
                          className={`p-1.5 rounded-md transition-colors ${paginaActual === totalPaginas ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

          {/* COLUMNA DERECHA (Guía de Formato) */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8FBFA] rounded-2xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#1D8348] sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#1D8348] text-white text-xs font-bold px-2 py-0.5 rounded">info</span>
                <h3 className="text-lg font-bold text-gray-800">Guía de Formato</h3>
              </div>

              <div className="space-y-6 text-sm text-gray-600">
                {/* Estructura de Datos */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Estructura de Datos</h4>
                  <p>El archivo debe ser unicamente <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-mono text-xs">GEOJSON</span> con coordenadas válidas en WGS 84 (EPSG:4326).</p>
                </div>

                {/* Exportar ArcGIS */}
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Exportar Archivos desde ArcGIS PRO</h4>
                  <p className="mb-2">Para exportar archivos desde ArcGIS PRO, siga estos pasos:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-1 text-xs">
                    <li>Diríjase a Geoanálisis y seleccione Features to Json</li>
                    <li>Seleccione la capa que desea exportar.</li>
                    <li>Seleccione dónde guardar el archivo.</li>
                    <li>En las opciones seleccione las opciones de la imagen a continuación.</li>
                    <li>Establezca la proyección en WGS 84 (EPSG:4326).</li>
                    <li>Haga clic en OK para completar la exportación.</li>
                  </ol>
                </div>

                {/* Imagen opciones de ArcGIS */}
                <div className="rounded-lg overflow-hidden border border-gray-200 h-auto">
                   <Image src={optionsImg} alt="Opciones de exportación en ArcGIS" className="w-50 h-49 object-cover"/>
                </div>

                {/* Previsualización dinámica con la imagen de tu lógica */}
                <div className="mt-4 relative overflow-hidden bg-gray-900 rounded-lg aspect-square group">
                  <Image src={img} alt="Previsualización de mapa" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-5 left-5 right-5">
                      <h5 className="text-green-400 font-bold text-xs uppercase tracking-wider mb-1">Previsualización</h5>
                      <p className="text-xs text-white/90 font-medium leading-relaxed">
                        Las capas se renderizarán sobre el mapa base de SICAT para su validación final.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toast de Feedback adaptado */}
      <div className={`fixed bottom-8 right-8 flex items-center gap-3 py-3 px-6 rounded-lg shadow-xl transition-all duration-300 z-50 border ${
        toast 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4 pointer-events-none'
      } ${
        toast?.type === 'success' 
        ? 'bg-[#1D8348] text-white border-[#145A32]' 
        : toast?.type === 'error' 
        ? 'bg-red-600 text-white border-red-800' 
        : 'bg-white text-gray-800 border-gray-200'
      }`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {toast?.type === 'success' 
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          }
        </svg>
        <span className="text-sm font-medium">{toast?.text}</span>
      </div>

    </div>
  );
}