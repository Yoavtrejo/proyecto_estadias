'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import fondo from "@/assets/fondo_base.png"

// --- MOCK DATA ---
const mockModifiedProjects = [
    { id: 'SICAT-001', title: 'Zona Norte Hidalgo', user: 'arq.lopez', date: 'Hoy, 10:45 AM', status: 'En Proceso' },
    { id: 'SICAT-002', title: 'Catastro Urbano CDMX', user: 'ing.martinez', date: 'Ayer, 06:12 PM', status: 'Validado' },
    { id: 'SICAT-003', title: 'Predios Rurales Sonora', user: 'geo.ramirez', date: '12 Abr', status: 'Revisión' },
];

const mockChecklist = [
    { t: 'Subir capa Altimetría - Hidalgo', done: false, type: 'urgente' },
    { t: 'Validar GeoJSON CDMX', done: true, type: 'normal' },
    { t: 'Corregir atributos - Sonora', done: false, type: 'normal' },
];

const mockFileHistory = [
    { f: 'manzanas_v2.geojson', s: '12.4 MB', d: 'Hace 10 min', status: 'Cargado' },
    { f: 'predios_final.geojson', s: '45.1 MB', d: 'Ayer', status: 'Error' },
    { f: 'limites_municipales.json', s: '2.8 MB', d: '14 Abr', status: 'Cargado' },
];

const mockEditorActivity = [
    { action: 'Subida de GeoJSON', project: 'Zona Norte Hidalgo', time: 'Hace 5 min', icon: 'upload' },
    { action: 'Validación de Capas', project: 'Predios Rurales Sonora', time: 'Hace 2 horas', icon: 'check' },
    { action: 'Edición de Atributos', project: 'Catastro Urbano CDMX', time: 'Ayer', icon: 'edit' },
];

export default function HomePage() {
    const [role, setRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
    const [userName, setUserName] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Recuperar info del usuario al cargar
    React.useEffect(() => {
        const savedRole = localStorage.getItem('role') as 'viewer' | 'editor' | 'admin';
        const savedName = localStorage.getItem('userName');

        if (savedRole) setRole(savedRole);
        if (savedName) setUserName(savedName);
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null; // Evitar parpadeo de hidratación

    return (
        <div className="min-h-screen bg-[#F4F7F6] font-sans pb-12 overflow-x-hidden">

            {/* HEADER / HERO SECTION PREMIUM */}
            <div className={`relative w-full ${role === 'viewer' ? 'h-[65vh]' : 'h-[45vh]'} bg-[#0a0a0a] overflow-hidden transition-all duration-700 ease-in-out`}>

                {/* Imagen de Fondo con next/image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={fondo}
                        alt="Background"
                        fill
                        priority
                        className="object-cover opacity-60 scale-105 animate-pulse-slow transition-transform duration-[10s] hover:scale-100"
                    />
                </div>

                {/* Overlays decorativos */}
                <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#F4F7F6] via-transparent to-black/40"></div>
                <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                        <span className="bg-[#8FC044] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 inline-block shadow-lg shadow-[#8FC044]/20">
                            SICAT • SISTEMA DE INFORMACIÓN CATASTRAL
                        </span>

                        {role === 'viewer' && (
                            <div className="max-w-3xl space-y-6">
                                <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
                                    Convirtiendo <span className="text-[#8FC044] italic">Datos</span><br />
                                    en <span className="font-sans font-black">Territorio</span>
                                </h1>
                                <p className="text-gray-200 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                                    Explora el futuro de la gestión territorial. Datos precisos, decisiones estratégicas y desarrollo sostenible para un México mejor.
                                </p>
                                <div className="pt-8 flex flex-wrap gap-4">
                                    <button className="bg-white text-[#173F4A] hover:bg-[#8FC044] hover:text-white px-10 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-2xl shadow-white/10 flex items-center gap-3 group">
                                        Mapa Interactivo
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-4 rounded-full font-bold transition-all">
                                        Consultar Catastro
                                    </button>
                                </div>
                            </div>
                        )}

                        {(role === 'editor' || role === 'admin') && (
                            <div className="max-w-4xl animate-in zoom-in-95 duration-700">
                                <h2 className="text-white text-sm font-medium mb-2 opacity-60">Bienvenido de nuevo, <span className="text-white font-bold">{userName || 'Usuario'}</span></h2>
                                <h1 className="text-5xl font-black text-white leading-none">
                                    {role === 'editor' ? 'ESPACIO DE TRABAJO' : 'PANEL DE SUPERVISIÓN'}
                                    <span className="text-[#8FC044]">.</span>
                                </h1>
                                <p className="text-white/60 mt-4 max-w-lg font-light">
                                    {role === 'editor'
                                        ? 'Gestiona tus proyectos activos y monitorea tus últimas contribuciones cartográficas.'
                                        : 'Monitorea el progreso global y gestiona la integridad de los datos catastrales.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className={`max-w-7xl mx-auto px-6 relative z-20 ${role === 'viewer' ? '-mt-24' : '-mt-12'} space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300`}>

                {/* VISTA VISUALIZADOR */}
                {role === 'viewer' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { i: 'map', t: 'Análisis de Predios', d: 'Evaluación técnica detallada para una gestión urbana transparente y eficiente.', color: 'from-blue-500 to-indigo-600' },
                            { i: 'leaf', t: 'Sostenibilidad', d: 'Planificación equilibrada respetando el entorno natural y las futuras generaciones.', color: 'from-emerald-500 to-teal-600' },
                            { i: 'globe', t: 'Gestión Geoespacial', d: 'Integración estratégica de datos para el crecimiento armónico del territorio.', color: 'from-orange-500 to-amber-600' },
                        ].map((card, idx) => (
                            <div key={idx} className="group bg-white/95 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-white hover:shadow-[#173F4A]/10 hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-8 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                                    {card.i === 'map' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
                                    {card.i === 'leaf' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 11a9 9 0 019 9M3 21l19-19" /></svg>}
                                    {card.i === 'globe' && <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{card.t}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">{card.d}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* VISTA EDITOR */}
                {role === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Proyectos en Proceso */}
                        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-[#173F4A] tracking-tighter uppercase">Proyectos en Proceso</h3>
                                    <p className="text-gray-400 text-xs font-medium mt-1">Trabajos activos bajo tu edición</p>
                                </div>
                                <span className="bg-[#8FC044]/10 text-[#8FC044] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                                    {mockModifiedProjects.filter(p => p.status === 'En Proceso').length} ACTIVOS
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockModifiedProjects.filter(p => p.status === 'En Proceso' || p.status === 'Revisión').map((project, i) => (
                                    <div key={i} className="group p-6 rounded-3xl bg-[#FBFBFC] border border-gray-100 hover:border-[#8FC044] hover:shadow-2xl hover:shadow-[#8FC044]/5 transition-all duration-500">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1D8348]">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${project.status === 'En Proceso' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-black text-gray-900 group-hover:text-[#1D8348] transition-colors">{project.title}</h4>
                                        <p className="text-gray-400 text-[10px] font-mono mt-1 mb-6">{project.id}</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Último cambio: {project.date}</span>
                                            <button className="text-[#173F4A] hover:text-[#8FC044] transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tu Actividad Reciente */}
                        <div className="lg:col-span-1 bg-[#173F4A] p-10 rounded-[2.5rem] shadow-2xl text-white">
                            <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Mi Actividad</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">Últimas acciones realizadas</p>

                            <div className="space-y-8 relative">
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10"></div>
                                {mockEditorActivity.map((log, i) => (
                                    <div key={i} className="relative flex items-start gap-6 group">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#8FC044] transition-colors duration-500 z-10">
                                            {log.icon === 'upload' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
                                            {log.icon === 'check' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}
                                            {log.icon === 'edit' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black leading-none">{log.action}</h4>
                                            <p className="text-white/40 text-[10px] font-medium mt-1 truncate">{log.project}</p>
                                            <span className="text-[9px] bg-white/5 text-white/50 px-2 py-0.5 rounded uppercase font-bold tracking-widest mt-2 inline-block italic">{log.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#173F4A] transition-all duration-500">
                                Ver Registro Completo
                            </button>
                        </div>
                    </div>
                )}

                {/* VISTA ADMIN */}
                {role === 'admin' && (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: 'Avance Territorial', val: 75, color: '#1D8348', desc: '18 de 24 proyectos validados' },
                                { label: 'Integridad de Capas', val: 92, color: '#3B82F6', desc: '842 capas en norma' },
                                { label: 'Tiempo de Entrega', val: 60, color: '#8FC044', desc: 'Semanas 12-16 estables' }
                            ].map((g, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-8 group hover:shadow-2xl transition-all">
                                    <div className="relative w-24 h-24 shrink-0">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            <path stroke={g.color} strokeWidth="3" strokeDasharray={`${g.val}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" className="transition-all duration-1000 ease-out" />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center font-black text-xl text-gray-800">{g.val}%</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{g.label}</h4>
                                        <p className="text-sm font-bold text-gray-800">{g.desc}</p>
                                        <div className="mt-2 w-12 h-1 bg-gray-100 group-hover:w-full transition-all duration-500 rounded-full" style={{ backgroundColor: g.val > 80 ? g.color : undefined }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden">
                            <div className="p-10 border-b border-gray-50 flex justify-between items-end">
                                <div>
                                    <h3 className="font-black text-[#173F4A] text-3xl tracking-tighter">MODIFICACIONES RECIENTES</h3>
                                    <p className="text-gray-400 text-sm font-light mt-1">Actividad detectada en los últimos 7 días</p>
                                </div>
                                <button className="bg-[#173F4A] text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-black transition-all">Auditoría Completa</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#FBFBFC]">
                                        <tr>
                                            <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Proyecto</th>
                                            <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Autor</th>
                                            <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fecha</th>
                                            <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estatus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {mockModifiedProjects.map((row, i) => (
                                            <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-10 py-6">
                                                    <div className="font-black text-gray-900 text-lg tracking-tight group-hover:text-[#1D8348] transition-colors">{row.title}</div>
                                                    <div className="text-[10px] text-gray-400 font-mono mt-1 opacity-50">{row.id}</div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#E8F1F5] flex items-center justify-center text-[10px] font-black text-[#173F4A]">{row.user.slice(0, 2).toUpperCase()}</div>
                                                        <span className="text-sm font-bold text-gray-600">{row.user}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-sm text-gray-500 font-medium">{row.date}</td>
                                                <td className="px-10 py-6">
                                                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${row.status === 'Validado' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}