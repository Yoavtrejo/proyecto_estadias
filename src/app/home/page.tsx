import React from 'react';
import { 
  LayoutGrid, 
  Globe, 
  Users, 
  AlertTriangle, 
  FileText, 
  Clock, 
  UserCheck, 
  PlusSquare,
  AlertCircle
} from 'lucide-react';

export default function HomeDashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner Principal */}
        <div className="bg-gradient-to-r from-[#0a2e1f] via-[#0d4a30] to-[#25854b] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-md">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
              Panel del desarrollador
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Visión global <br /> <span className="text-emerald-300">del territorio</span>
            </h1>
            <p className="text-emerald-100 text-sm md:text-base opacity-90 pb-4 md:pb-0">
              Monitorea proyectos, usuarios y actividad catastral en tiempo real desde un solo lugar.
            </p>
          </div>
          
          <div className="hidden md:flex flex-col gap-6 text-right border-l border-white/20 pl-8">
            <div>
              <div className="text-3xl font-bold">18</div>
              <div className="text-emerald-100 text-xs">estados activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-emerald-100 text-xs">proyectos en curso</div>
            </div>
            <div>
              <div className="text-3xl font-bold">142</div>
              <div className="text-emerald-100 text-xs">usuarios registrados</div>
            </div>
          </div>
        </div>

        {/* 4 Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<LayoutGrid className="w-5 h-5 text-blue-500" />} 
            iconBg="bg-blue-50"
            value="24" 
            title="Proyectos activos" 
            subtitle={<span className="text-emerald-600 font-medium">^ +3 este mes</span>} 
          />
          <StatCard 
            icon={<Globe className="w-5 h-5 text-emerald-500" />} 
            iconBg="bg-emerald-50"
            value={<>18 <span className="text-gray-400 text-xl font-normal">/ 32</span></>} 
            title="Estados cubiertos" 
            subtitle="56% del territorio nacional" 
          />
          <StatCard 
            icon={<Users className="w-5 h-5 text-amber-500" />} 
            iconBg="bg-amber-50"
            value="142" 
            title="Usuarios registrados" 
            subtitle="12 pendientes de activar" 
          />
          <StatCard 
            icon={<AlertTriangle className="w-5 h-5 text-red-500" />} 
            iconBg="bg-red-50"
            value="2" 
            title="Alertas del sistema" 
            subtitle={<span className="text-red-500 font-medium">Requieren atención</span>} 
          />
        </div>

        {/* Layout Principal Abajo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda (Mapas y Tablas) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mapa (Placeholder basado en tu diseño) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Proyectos por estado</h2>
                  <p className="text-sm text-gray-500">República Mexicana — cobertura actual</p>
                </div>
                <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition-colors">
                  Ver mapa completo
                </button>
              </div>

              {/* Fake Map Grid representativo */}
              <div className="bg-emerald-50/50 rounded-xl p-4 md:p-8 flex items-center justify-center min-h-[250px] border border-emerald-100">
                <div className="grid grid-cols-6 gap-2 opacity-80">
                   {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className={`w-12 h-8 rounded-md flex items-center justify-center ${i % 5 === 0 ? 'bg-emerald-200' : 'bg-emerald-100'}`}>
                         {i === 2 && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                         {i === 8 && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                         {i === 15 && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                         {i === 19 && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      </div>
                   ))}
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Proyecto activo</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> En proceso</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span> Sin proyecto</span>
              </div>
            </div>

            {/* Proyectos Recientes (Tabla) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Proyectos recientes</h2>
                  <p className="text-sm text-gray-500">Estado y avance</p>
                </div>
                <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition-colors">
                  Ver todos
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium">Proyecto</th>
                      <th className="pb-3 font-medium">Estado</th>
                      <th className="pb-3 font-medium">Predios</th>
                      <th className="pb-3 font-medium">Avance</th>
                      <th className="pb-3 font-medium text-center">Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <TableRow title="Zona Norte Hidalgo" state="Hidalgo" predios="1,240" avance={80} status="Activo" />
                    <TableRow title="Catastro Urbano CDMX" state="CDMX" predios="3,870" avance={65} status="Activo" />
                    <TableRow title="Predios Rurales Sonora" state="Sonora" predios="680" avance={30} status="En proceso" badge="amber" />
                    <TableRow title="Manzanas Puebla Q1" state="Puebla" predios="2,110" avance={90} status="Activo" />
                    <TableRow title="Análisis BCS Fase 2" state="Baja California Sur" predios="450" avance={5} status="Inactivo" badge="gray" />
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Columna Derecha (Sidebar: Actividad y Alertas) */}
          <div className="space-y-6">
            
            {/* Actividad Reciente */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-1">Actividad reciente</h2>
              <p className="text-sm text-gray-500 mb-6">Últimas acciones en el sistema</p>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
                <TimelineItem 
                  icon={<FileText className="w-4 h-4 text-emerald-600" />} 
                  iconBg="bg-emerald-50"
                  title={<>GeoJSON cargado — <span className="font-semibold text-gray-800">Zona Norte Hidalgo</span></>}
                  time="Hace 5 min"
                  user="ing.martinez"
                />
                <TimelineItem 
                  icon={<Clock className="w-4 h-4 text-blue-600" />} 
                  iconBg="bg-blue-50"
                  title={<>Análisis IA completado — <span className="font-semibold text-gray-800">87 puntos detectados</span></>}
                  time="Hace 23 min"
                  user="sistema"
                />
                <TimelineItem 
                  icon={<FileText className="w-4 h-4 text-red-600" />} 
                  iconBg="bg-red-50"
                  title={<>Reporte PDF generado — <span className="font-semibold text-gray-800">Puebla Q1</span></>}
                  time="Hace 1 hr"
                  user="arq.lopez"
                />
                <TimelineItem 
                  icon={<UserCheck className="w-4 h-4 text-amber-600" />} 
                  iconBg="bg-amber-50"
                  title={<>Usuario <span className="font-semibold text-gray-800">arq.mendez</span> activado</>}
                  time="Hace 2 hr"
                  user="admin"
                />
                <TimelineItem 
                  icon={<PlusSquare className="w-4 h-4 text-blue-600" />} 
                  iconBg="bg-blue-50"
                  title={<>Nuevo proyecto creado — <span className="font-semibold text-gray-800">BCS Fase 2</span></>}
                  time="Ayer 16:40"
                  user="geo.ramirez"
                />
              </div>
            </div>

            {/* Alertas y Notificaciones */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Alertas y notificaciones</h2>
                  <p className="text-sm text-gray-500">Requieren revisión</p>
                </div>
                <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-md">2 activas</span>
              </div>

              <div className="space-y-3">
                <AlertCard 
                  type="danger"
                  title="Tiempo de respuesta elevado"
                  desc="El módulo de mapas tarda más de 8 s en cargar. Revisar configuración del servidor."
                />
                <AlertCard 
                  type="warning"
                  title="12 usuarios pendientes"
                  desc="Cuentas creadas sin activar. Verificar y asignar roles antes de que venzan."
                />
                <AlertCard 
                  type="info"
                  title="Actualización disponible"
                  desc="Nueva versión del motor GeoJSON — mejoras de rendimiento en archivos grandes."
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Componentes de UI Auxiliares ── */

function StatCard({ icon, iconBg, value, title, subtitle }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function TableRow({ title, state, predios, avance, status, badge = "emerald" }: any) {
  const badgeColors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    gray: "bg-gray-50 text-gray-500 border-gray-100",
  };
  const barColors: Record<string, string> = {
    emerald: "bg-[#0b3d2b]",
    amber: "bg-amber-500",
    gray: "bg-gray-300",
  };

  return (
    <tr>
      <td className="py-4 font-semibold text-gray-800 pr-4 w-48 truncate">{title}</td>
      <td className="py-4 text-gray-500">{state}</td>
      <td className="py-4 font-medium text-gray-700">{predios}</td>
      <td className="py-4 min-w-[100px]">
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${barColors[badge]}`} style={{ width: `${avance}%` }}></div>
        </div>
      </td>
      <td className="py-4 text-center">
        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${badgeColors[badge]}`}>
           {status}
        </span>
      </td>
    </tr>
  );
}

function TimelineItem({ icon, iconBg, title, time, user }: any) {
  return (
    <div className="relative flex items-start gap-4">
      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg} ring-4 ring-white`}>
        {icon}
      </div>
      <div className="pt-1 w-full">
        <p className="text-sm text-gray-600 leading-snug">{title}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
           <span>{time}</span>
           <span>·</span>
           <span>{user}</span>
        </div>
      </div>
    </div>
  );
}

function AlertCard({ type, title, desc }: any) {
  const styles: Record<string, string> = {
    danger: "bg-red-50/50 border-red-100/60 text-red-800",
    warning: "bg-amber-50/50 border-amber-100/60 text-amber-800",
    info: "bg-blue-50/50 border-blue-100/60 text-blue-800",
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${type === 'danger' ? 'text-red-500' : type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
        <div>
          <h4 className="text-sm font-semibold mb-1">{title}</h4>
          <p className="text-xs opacity-80 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
