'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { MainMap, useMapLayers, LayerManagerMenu, ElementDetailsPanel } from '@/features/dashboard';
import { CENTROIDES_MUNICIPIOS } from '@/constants/municipiosCentroides';

export default function DashboardPage() {
  // Inicializamos en "TODOS" para ver las capas globales por defecto
  const catalogStates = Object.keys(CENTROIDES_MUNICIPIOS);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('TODOS');
  
  // Lista dinámica de municipios basados en el estado
  const availableMunicipalities = useMemo(() => {
    if (estadoSeleccionado === 'TODOS') return [];
    return CENTROIDES_MUNICIPIOS[estadoSeleccionado] 
      ? Object.keys(CENTROIDES_MUNICIPIOS[estadoSeleccionado]) 
      : [];
  }, [estadoSeleccionado]);

  const [municipioSeleccionado, setMunicipioSeleccionado] = useState('TODOS');
  
  const { listaCapas, capasActivas, isLoadingCapa, cargarListaCapas, cargarCapa, limpiarCapas } = useMapLayers();
  const [elementosSeleccionados, setElementosSeleccionados] = useState<any[]>([]);

  // Efecto en cascada: Si cambia el estado, seleccionamos TODOS por defecto para el municipio
  useEffect(() => {
    if (estadoSeleccionado === 'TODOS') {
      setMunicipioSeleccionado('TODOS');
    } else if (availableMunicipalities.length > 0 && !availableMunicipalities.includes(municipioSeleccionado) && municipioSeleccionado !== 'TODOS') {
      setMunicipioSeleccionado('TODOS');
    }
  }, [estadoSeleccionado, availableMunicipalities, municipioSeleccionado]);

  // Recargar capas de la base de datos cuando cambien las variables del filtro
  useEffect(() => {
    // 1. Limpiamos cualquier capa vieja que el usurio tuviera encendida
    limpiarCapas();
    // 2. Apagamos la UI de Detalles
    setElementosSeleccionados([]);
    
    // 3. Cargamos el directorio de las capas (Si es TODOS, lo mandamos como string vacío para ignorarlo en Django)
    const queryEstado = estadoSeleccionado !== 'TODOS' ? estadoSeleccionado : undefined;
    const queryMunicipio = municipioSeleccionado !== 'TODOS' ? municipioSeleccionado : undefined;

    cargarListaCapas(queryEstado, queryMunicipio);
  }, [estadoSeleccionado, municipioSeleccionado, cargarListaCapas, limpiarCapas]);

  return (
    <div className="w-full h-screen bg-slate-50 overflow-hidden text-slate-800 font-sans p-4 md:p-6 pb-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-6">
        
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-6">
          
          {/* SELECTOR DE REGIÓN (Nuevo) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ubicación de Trabajo</h3>
            <div className="flex gap-2">
              <div className="w-1/2">
                <select 
                  value={estadoSeleccionado}
                  onChange={(e) => {
                    setEstadoSeleccionado(e.target.value);
                    setMunicipioSeleccionado('TODOS');
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