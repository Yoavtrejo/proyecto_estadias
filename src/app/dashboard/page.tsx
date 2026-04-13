'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MainMap } from '@/features/dashboard/components/MainMap';
import { useMapLayers } from '@/features/dashboard/hooks/useMapLayers';


export default function DashboardPage() {
  // Estados para el mapa
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('YUCATAN');
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState('MERIDA');
  
  // Hook de capas
  const { listaCapas, capaActiva, isLoadingCapa, cargarListaCapas, cargarCapa } = useMapLayers();

  // Estados de la Interfaz Flotante
  const [predioSeleccionado, setPredioSeleccionado] = useState<any>(null);
  const [menuCapasAbierto, setMenuCapasAbierto] = useState(true); // Lo dejamos abierto al inicio para que sepas qué hacer

  // Cargar lista de capas al inicio
  useEffect(() => {
    cargarListaCapas();
  }, [cargarListaCapas]);

  // --- LÓGICA DEL PANEL INTELIGENTE ---
  const procesarAlturas = (z_construccion: string | undefined) => {
    if (!z_construccion) return [];
    return String(z_construccion).split(',').map(Number);
  };

  const alturaBase = predioSeleccionado?.z_pred || predioSeleccionado?.altura_m || predioSeleccionado?.Z || predioSeleccionado?.z || predioSeleccionado?.elevation || null;
  const alturasMultiples = predioSeleccionado?.z_construccion || predioSeleccionado?.alturas_niveles || null;
  const tieneElevacionRelevant = alturaBase !== null || alturasMultiples !== null;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden font-sans">
      

      {/* CONTENEDOR PRINCIPAL: Mapa al 100% */}
      <div className="flex-1 relative w-full h-full">
        
        <MainMap 
          estadoActivo={estadoSeleccionado} 
          municipioActivo={municipioSeleccionado} 
          capaGeoJSON={capaActiva}
          onPolygonClick={setPredioSeleccionado} 
          predioSeleccionado={predioSeleccionado}
        />

        {/* =========================================
            SELECTOR DE CAPAS FLOTANTE (Arriba a la derecha)
            ========================================= */}
        <div className="absolute top-4 right-14 z-20 flex flex-col items-end">
          {/* Botón principal */}
          <button 
            onClick={() => setMenuCapasAbierto(!menuCapasAbierto)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2 transition-all font-bold text-sm"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
            Administrar Capas
          </button>

          {/* Menú Desplegable */}
          {menuCapasAbierto && (
            <div className="mt-2 w-[320px] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 bg-slate-950 flex justify-between items-center border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capas Disponibles</span>
                <Link 
                  href="/dashboard/nueva-capa"
                  className="text-[10px] font-bold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded transition-colors"
                >
                  + Subir Capa
                </Link>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {listaCapas.length === 0 ? (
                  <p className="p-4 text-xs text-center text-slate-500 italic">No hay capas. Sube una para comenzar.</p>
                ) : (
                  listaCapas.map((capa) => (
                    <div key={capa.id} className="flex items-center justify-between p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-transparent hover:border-slate-600">
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-200 truncate pr-2">{capa.nombre_capa}</p>
                        <p className="text-[10px] text-slate-400 uppercase truncate">{capa.categoria}</p>
                      </div>
                      <button
                        onClick={() => {
                          cargarCapa(capa.id);
                          setMenuCapasAbierto(false); // Cerramos el menú al elegir una capa
                          setPredioSeleccionado(null); // Limpiamos la selección anterior
                        }}
                        disabled={isLoadingCapa}
                        className="shrink-0 p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50"
                        title="Cargar esta capa"
                      >
                        {isLoadingCapa ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* =========================================
            PANEL FLOTANTE DE DETALLES (Izquierda)
            ========================================= */}
        {predioSeleccionado && (
          <div className="absolute top-4 left-4 w-[380px] bg-slate-900 shadow-2xl z-10 flex flex-col text-slate-300 border border-slate-700 rounded-xl max-h-[90vh] animate-in fade-in slide-in-from-left-8 duration-300">
            
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center rounded-t-xl shrink-0">
              <h2 className="text-base font-bold text-blue-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Detalles del Elemento
              </h2>
              <button 
                onClick={() => setPredioSeleccionado(null)}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-4 custom-scrollbar">
              
              {tieneElevacionRelevant && (
                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-lg border-l-4 border-l-emerald-500">
                  <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-700">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Análisis 3D</h3>
                  </div>
                  <div className="p-3 space-y-3">
                    {alturaBase !== null && (
                      <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded border border-slate-700/50">
                        <span className="text-xs font-medium text-slate-400">Elevación Base</span>
                        <span className="text-sm font-bold text-emerald-400">{Number(alturaBase).toFixed(2)} m</span>
                      </div>
                    )}
                    {alturasMultiples !== null && (
                      <div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Secciones de Construcción</span>
                        <div className="space-y-1">
                          {procesarAlturas(alturasMultiples).map((altura, index) => (
                            <div key={index} className="flex justify-between items-center p-1.5 bg-slate-700/30 rounded border border-slate-600/30">
                              <span className="text-xs text-slate-300">Nivel {index + 1}</span>
                              <span className="text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded">{altura.toFixed(2)} m</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-lg">
                <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-700">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Base de Datos</h3>
                </div>
                <div className="p-2 space-y-1">
                  {Object.entries(predioSeleccionado).map(([llave, valor]) => {
                    if (valor === null || valor === undefined || valor === '' || llave === 'layer' || llave === 'source') return null;
                    const nombreAtributo = llave.replace(/_/g, ' ');
                    return (
                      <div key={llave} className="flex justify-between items-center p-2 bg-slate-900/50 rounded border border-slate-700/50 hover:bg-slate-700 transition-colors gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-1/2 break-words">
                          {nombreAtributo}
                        </span>
                        <span className="text-xs font-bold text-slate-200 text-right w-1/2 break-words">
                          {String(valor)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}