'use client'

import React, {useState} from 'react';
import { useMapLayers, MainMap, UploadLayerForm } from '@/features/dashboard';

export default function DashboardPage() {
    const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>('Puebla');
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState<string>('Izúcar de Matamoros');

    const {capaActiva, isLoadingCapa, errorCapa, cargarCapa, limpiarCapa} = useMapLayers();

    const volarAMunicipio = (estado: string, municipio: string) => {
        setEstadoSeleccionado(estado);
        setMunicipioSeleccionado(municipio);
        limpiarCapa();
    };
    return (
        <div className="flex h-screen w-full bg-slate-100 overflow-hidden font-sans">
      
                {/* ==========================================
                    PANEL IZQUIERDO: Controles (30% o 400px)
                    ========================================== */}
                <div className="w-[400px] bg-white shadow-2xl z-10 flex flex-col flex-shrink-0">
                    
                    {/* Cabecera del Panel */}
                    <div className="p-6 bg-slate-900 text-white">
                    <h1 className="text-2xl font-black tracking-tight text-blue-400">UrbanInsight</h1>
                    <p className="text-sm text-slate-400 font-medium mt-1">Panel de Control Geoespacial</p>
                    </div>

                    {/* Zona Scrolleable para el contenido del panel */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-8">
                    
                    {/* SECCIÓN 1: NAVEGACIÓN RÁPIDA */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                        📍 Vuelos Rápidos
                        </h3>
                        <div className="grid gap-2">
                        <button 
                            onClick={() => volarAMunicipio('Puebla', 'Izúcar de Matamoros')}
                            className="w-full text-left px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-slate-700">
                            🚁 Izúcar de Matamoros, PUE
                        </button>
                        <button 
                            onClick={() => volarAMunicipio('Jalisco', 'Zapopan')}
                            className="w-full text-left px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-slate-700">
                            🚁 Zapopan, JAL
                        </button>
                        <button 
                            onClick={() => volarAMunicipio('Yucatán', 'Mérida')}
                            className="w-full text-left px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-slate-700">
                            🚁 Mérida, YUC
                        </button>
                        </div>
                    </section>

                    {/* SECCIÓN 2: SIMULADOR DE DESCARGA (Para probar el 3D) */}
                    <section className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-1">Prueba de Visualización 3D</h3>
                        <p className="text-xs text-blue-700/80 mb-4">
                        Haz clic para simular la descarga de la Capa ID #1 desde Django.
                        </p>
                        
                        <button 
                            onClick={() => cargarCapa(1)} 
                            disabled={isLoadingCapa}
                            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm transition-all"
                        >
                            {isLoadingCapa ? 'Descargando GeoJSON...' : '📥 Cargar Predios en el Mapa'}
                        </button>

                        {errorCapa && (
                        <p className="mt-2 text-xs text-red-600 font-medium">{errorCapa}</p>
                        )}
                    </section>

                    {/* SECCIÓN 3: FORMULARIO DE INGESTA DE DATOS */}
                    <section className="pt-4 border-t border-slate-200">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                        ➕ Nueva Capa
                        </h3>
                        {/* Aquí mandamos a llamar a tu componente formulario que ya funciona perfecto */}
                        <UploadLayerForm />
                    </section>

                    </div>
                </div>

                {/* ==========================================
                    PANEL DERECHO: El Mapa Interactivo
                    ========================================== */}
                <div className="flex-1 relative bg-slate-200">
                    <MainMap 
                    estadoActivo={estadoSeleccionado} 
                    municipioActivo={municipioSeleccionado} 
                    capaGeoJSON={capaActiva} 
                    />
                    
                    {/* Pequeño indicador flotante de carga sobre el mapa */}
                    {isLoadingCapa && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/90 backdrop-blur rounded-full shadow-lg border border-slate-200 flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-bold text-slate-700">Procesando geometría...</span>
                    </div>
                    )}
                </div>
        </div>
    );
}