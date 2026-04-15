'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { MainMap, useMapLayers, LayerManagerMenu, ElementDetailsPanel } from '@/features/dashboard';
import { CENTROIDES_MUNICIPIOS } from '@/constants/municipiosCentroides';
import { useSearchParams } from 'next/navigation';
import { useProjects } from '@/features/projects';

function DashboardContent() {
  const searchParams = useSearchParams();
  const catalogStates = Object.keys(CENTROIDES_MUNICIPIOS);
  
  // Extraemos parámetros iniciales de la URL
  const initialProyectoId = searchParams.get('proyecto_id') || 'TODOS';
  const initialEstado = searchParams.get('estado') || 'TODOS';
  const initialMunicipio = searchParams.get('municipio') || 'TODOS';

  const [estadoSeleccionado, setEstadoSeleccionado] = useState(initialEstado);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState(initialMunicipio);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(initialProyectoId);

  const { projects } = useProjects();
  
  // Lista dinámica de municipios basados en el estado
  const availableMunicipalities = useMemo(() => {
    if (estadoSeleccionado === 'TODOS') return [];
    return CENTROIDES_MUNICIPIOS[estadoSeleccionado] 
      ? Object.keys(CENTROIDES_MUNICIPIOS[estadoSeleccionado]) 
      : [];
  }, [estadoSeleccionado]);

  const { listaCapas, capasActivas, isLoadingCapa, cargarListaCapas, cargarCapa, limpiarCapas } = useMapLayers();
  const [elementosSeleccionados, setElementosSeleccionados] = useState<any[]>([]);

  // Efecto en cascada: Si cambia el estado limpiamos el municipio (manteniendo la compatibilidad inicial por URL)
  useEffect(() => {
    if (estadoSeleccionado === 'TODOS') {
      setMunicipioSeleccionado('TODOS');
    } else if (availableMunicipalities.length > 0 && !availableMunicipalities.includes(municipioSeleccionado) && municipioSeleccionado !== 'TODOS') {
      setMunicipioSeleccionado('TODOS');
    }
  }, [estadoSeleccionado, availableMunicipalities, municipioSeleccionado]);

  // Recargar capas de la base de datos cuando cambien las variables del filtro
  useEffect(() => {
    // 1. Limpiamos cualquier capa vieja que el usuario tuviera encendida
    limpiarCapas();
    // 2. Apagamos la UI de Detalles
    setElementosSeleccionados([]);
    
    // 3. Cargamos el directorio de las capas 
    const queryEstado = estadoSeleccionado !== 'TODOS' ? estadoSeleccionado : undefined;
    const queryMunicipio = municipioSeleccionado !== 'TODOS' ? municipioSeleccionado : undefined;
    const queryProyecto = proyectoSeleccionado !== 'TODOS' ? proyectoSeleccionado : undefined;

    cargarListaCapas(queryEstado, queryMunicipio, queryProyecto);
  }, [estadoSeleccionado, municipioSeleccionado, proyectoSeleccionado, cargarListaCapas, limpiarCapas]);

  return (
    <div className="w-full h-screen bg-slate-50 overflow-hidden text-slate-800 font-sans p-4 md:p-6 pb-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-6">
        
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-6">
          
          {/* SELECTOR DE REGIÓN Y PROYECTO */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Filtros Cartográficos</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Proyecto</label>
                <select 
                  value={proyectoSeleccionado}
                  onChange={(e) => setProyectoSeleccionado(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none font-semibold cursor-pointer"
                >
                  <option value="TODOS">Todos los proyectos</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.folio || p.id} - {p.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Estado</label>
                  <select 
                    value={estadoSeleccionado}
                    onChange={(e) => {
                      setEstadoSeleccionado(e.target.value);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none font-semibold cursor-pointer"
                  >
                    <option value="TODOS">Todos</option>
                    {catalogStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Municipio</label>
                  <select 
                    value={municipioSeleccionado}
                    onChange={(e) => setMunicipioSeleccionado(e.target.value)}
                    disabled={estadoSeleccionado === 'TODOS'}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none font-semibold cursor-pointer disabled:opacity-50"
                  >
                    <option value="TODOS">Todos</option>
                    {availableMunicipalities.map(muni => (
                      <option key={muni} value={muni}>{muni}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <LayerManagerMenu 
            listaCapas={listaCapas}
            capasActivas={capasActivas}
            isLoadingCapa={isLoadingCapa}
            cargarCapa={cargarCapa}
          />
        </div>

        <div className="col-span-1 md:col-span-6 min-h-[500px] h-full shadow-sm rounded-2xl overflow-hidden border border-slate-200 bg-white relative">
          <MainMap 
            estadoActivo={estadoSeleccionado} 
            municipioActivo={municipioSeleccionado} 
            capasActivas={capasActivas}
            onMapClick={setElementosSeleccionados} 
            elementosSeleccionados={elementosSeleccionados}
          />
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pl-2 pb-6">
          <ElementDetailsPanel 
            elementosSeleccionados={elementosSeleccionados}
            setElementosSeleccionados={setElementosSeleccionados}
          />
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center p-4"><span className="text-slate-500 font-semibold animate-pulse">Cargando Dashboard...</span></div>}>
      <DashboardContent />
    </Suspense>
  );
}