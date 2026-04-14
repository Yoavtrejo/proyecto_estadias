import React from 'react';
import Link from 'next/link';
import { CapaInfo } from '@/features/dashboard/hooks/useMapLayers';

interface LayerManagerMenuProps {
  listaCapas: CapaInfo[];
  capasActivas: { id: number; datos: any }[];
  isLoadingCapa: boolean;
  cargarCapa: (id: number) => void;
}

export const LayerManagerMenu: React.FC<LayerManagerMenuProps> = ({
  listaCapas,
  capasActivas,
  isLoadingCapa,
  cargarCapa,
}) => {
  
  const metricasDinamicas = capasActivas.map(capa => {
    const infoBase = listaCapas.find(l => l.id === capa.id);
    const dataObj = typeof capa.datos === 'string' ? JSON.parse(capa.datos) : capa.datos;
    const geometryCount = dataObj?.features?.length || 0;
    
    return {
      nombre: infoBase?.nombre_capa || 'Geometrías',
      cantidad: geometryCount,
    };
  });

  const iconColors = [
    "bg-sky-100 text-sky-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
    "bg-emerald-100 text-emerald-600",
    "bg-red-100 text-red-600"
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      
      <div className="flex flex-col gap-3">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-800 leading-none">{listaCapas.length}</h4>
            <p className="text-xs text-slate-500 font-medium mt-1">Capas disponibles</p>
          </div>
        </div>

        {metricasDinamicas.map((metrica, i) => (
          <div key={i} className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 p-4 flex items-center gap-4 animate-in fade-in slide-in-from-left-4">
            <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center ${iconColors[i % iconColors.length]}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800 leading-none">{metrica.cantidad.toLocaleString()}</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-[150px]" title={metrica.nombre}>{metrica.nombre}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-4 bg-slate-50/50 flex justify-between items-center border-b border-slate-100">
          <span className="text-sm font-bold text-slate-800">Capas Activas</span>
          <Link 
            href="/dashboard/nueva-capa"
            className="text-[10px] font-bold bg-slate-200 text-slate-600 hover:bg-slate-800 hover:text-white px-2.5 py-1.5 rounded-md transition-colors"
          >
            + Nueva
          </Link>
        </div>
        
        <div className="p-3 space-y-2">
          {listaCapas.length === 0 ? (
             <p className="text-xs text-center p-4 text-slate-400">Carpeta vacía</p>
          ) : (
            listaCapas.map((capa, index) => {
              const estaActiva = capasActivas.some((c: any) => c.id === capa.id);
              const dotColors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-orange-500", "bg-red-500"];
              const miColor = dotColors[index % dotColors.length];

              return (
                <div key={capa.id} className="flex items-center justify-between px-2 py-2 hover:bg-slate-50 rounded-lg transition-colors group cursor-pointer" onClick={() => !isLoadingCapa && cargarCapa(capa.id)}>
                  
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${estaActiva ? miColor : 'bg-slate-300'}`}></span>
                    <div className="truncate">
                      <p className={`text-sm font-semibold truncate transition-colors ${estaActiva ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {capa.nombre_capa}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0 flex items-center justify-center">
                    {isLoadingCapa && !estaActiva ? (
                       <svg className="w-5 h-5 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <div className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${estaActiva ? 'bg-emerald-800' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${estaActiva ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
