import React from 'react';

interface ElementDetailsPanelProps {
  elementosSeleccionados: any[];
  setElementosSeleccionados: (elementos: any[]) => void;
}

export const ElementDetailsPanel: React.FC<ElementDetailsPanelProps> = ({ 
  elementosSeleccionados, 
  setElementosSeleccionados 
}) => {
  if (elementosSeleccionados.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-10 text-center bg-white border-2 border-dashed border-slate-200 rounded-2xl h-full">
        <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
        <p className="text-sm font-bold text-slate-400">Modo Exploración</p>
        <p className="text-xs text-slate-400 mt-2">Haz clic sobre cualquier elemento del mapa central para visualizar instantáneamente su información en este panel.</p>
      </div>
    );
  }

  const procesarAlturas = (z_construccion: string | undefined) => {
    if (!z_construccion) return [];
    return String(z_construccion).split(',').map(Number);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {elementosSeleccionados.length} Inspeccionados
        </h2>
        <button 
          onClick={() => setElementosSeleccionados([])}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md transition-colors"
        >
          Limpiar
        </button>
      </div>

      {elementosSeleccionados.map((elemento, index) => {
        const alturaBase = elemento?.z_pred || elemento?.altura_m || elemento?.Z || elemento?.z || elemento?.elevation || null;
        const alturasMultiples = elemento?.z_construccion || elemento?.alturas_niveles || null;
        const tieneElevacionRelevant = alturaBase !== null || alturasMultiples !== null;
        const tituloBloque = elemento?.nombre_capa || elemento?.categoria_origen || `Registro Espacial ${index + 1}`;

        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-4">
            
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-800 text-[10px] flex items-center justify-center font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-800 truncate">{tituloBloque}</h3>
            </div>

            <div className="p-4 space-y-4">
              {tieneElevacionRelevant && (
                <div className="bg-emerald-50/50 rounded-lg border border-emerald-100 overflow-hidden">
                  <div className="px-3 py-2 bg-emerald-100/50 border-b border-emerald-100">
                    <h3 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Análisis 3D</h3>
                  </div>
                  <div className="p-3 space-y-3">
                    {alturaBase !== null && (
                      <div className="flex justify-between items-center p-2 bg-white rounded border border-emerald-50 shadow-sm">
                        <span className="text-xs font-semibold text-slate-600">Elevación Superficie</span>
                        <span className="text-sm font-black text-emerald-600">{Number(alturaBase).toFixed(2)} m</span>
                      </div>
                    )}
                    {alturasMultiples !== null && (
                      <div className="pt-1">
                        <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-1">Secciones Construcción</span>
                        <div className="space-y-1">
                          {procesarAlturas(alturasMultiples).map((altura, i) => (
                            <div key={i} className="flex justify-between items-center p-2 bg-transparent rounded border border-emerald-100 border-dashed">
                              <span className="text-xs font-medium text-slate-500">Nivel {i + 1}</span>
                              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-sm border border-emerald-100">{altura.toFixed(2)} m</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Atributos</h4>
                {Object.entries(elemento).map(([llave, valor]) => {
                  if (valor === null || valor === undefined || valor === '' || llave === 'layer' || llave === 'source' || llave === 'nombre_capa') return null;
                  const nombreAtributo = llave.replace(/_/g, ' ');
                  return (
                    <div key={llave} className="flex justify-between items-center p-2.5 rounded-lg odd:bg-slate-50 even:bg-white hover:bg-slate-100 transition-colors gap-3 border border-transparent hover:border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide w-1/2 break-words leading-tight">
                        {nombreAtributo}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 text-right w-1/2 break-words">
                        {String(valor)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
};
