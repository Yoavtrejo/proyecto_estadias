'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import fondo from "@/assets/fondo.png"
import { getProjects } from "@/features/projects/service/projectService";
import { getUsers } from "@/features/users/service/userService";
import { Project } from "@/features/projects/types/project";
import { User } from "@/features/users/types/userTypes";
import { Users, ShieldCheck, Edit3, Loader2, FileText, CheckCircle2 } from "lucide-react";

export default function HomePage() {
    const [role, setRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
    const [userName, setUserName] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Estados para datos reales
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Recuperar info del usuario y cargar datos
    useEffect(() => {
        const savedRole = localStorage.getItem('role') as 'viewer' | 'editor' | 'admin';
        const savedName = localStorage.getItem('userName');

        if (savedRole) setRole(savedRole);
        if (savedName) setUserName(savedName);
        setIsLoaded(true);

        const loadData = async () => {
            try {
                setLoadingData(true);
                const [allProjects, allUsers] = await Promise.all([
                    getProjects(),
                    savedRole === 'admin' ? getUsers() : Promise.resolve([])
                ]);
                setProjects(allProjects);
                setUsers(allUsers);
            } catch (error) {
                console.error("Error cargando datos del dashboard:", error);
            } finally {
                setLoadingData(false);
            }
        };

        loadData();
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
                <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                        <span className="bg-[#8FC044] text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 inline-block shadow-lg shadow-[#8FC044]/20">
                            SISTEMA DE INFORMACIÓN CATASTRAL
                        </span>

                        {role === 'viewer' && (
                            <div className="max-w-3xl space-y-6">
                                <h1 className="text-4xl md:text-6xl font-serif text-white leading-[1.1] drop-shadow-2xl">
                                    Convirtiendo <span className="text-[#8FC044] italic">Datos</span><br />
                                    en <span className="font-sans font-black">Territorio</span>
                                </h1>
                                <p className="text-gray-200 text-base md:text-lg max-w-xl font-medium leading-relaxed opacity-90">
                                    Explora el futuro de la gestión territorial. Datos precisos, decisiones estratégicas y desarrollo sostenible para un México mejor.
                                </p>
                                <br />
                            </div>
                        )}

                        {(role === 'editor' || role === 'admin') && (
                            <div className="max-w-4xl animate-in zoom-in-95 duration-700">
                                <h2 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70">
                                    Bienvenido de nuevo, <span className="text-[#8FC044]">{userName || 'Usuario'}</span>
                                </h2>
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                                    {role === 'editor' ? 'ESPACIO DE TRABAJO' : 'PANEL DE CONTROL'}
                                    <span className="text-[#8FC044]">.</span>
                                </h1>
                                <p className="text-white/60 mt-4 max-w-lg font-medium leading-relaxed">
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
                                    <h3 className="text-2xl font-black text-[#173F4A] tracking-tighter uppercase">Mis Proyectos</h3>
                                    <p className="text-gray-400 text-xs font-medium mt-1">Gestión de capas y avances</p>
                                </div>
                                <span className="bg-[#8FC044]/10 text-[#8FC044] px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                                    {projects.length} TOTALES
                                </span>
                            </div>

                            {loadingData ? (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Cargando proyectos...</p>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                                    <p className="text-gray-400 text-sm font-medium">No se encontraron proyectos asignados.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.slice(0, 4).map((project, i) => (
                                        <div key={i} className="group p-6 rounded-3xl bg-[#FBFBFC] border border-gray-100 hover:border-[#8FC044] hover:shadow-2xl hover:shadow-[#8FC044]/5 transition-all duration-500">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#1D8348]">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${project.avance === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {project.avance === 100 ? 'Completado' : `${project.avance}%`}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-black text-gray-900 group-hover:text-[#1D8348] transition-colors truncate">{project.title}</h4>
                                            <p className="text-gray-400 text-[10px] font-mono mt-1 mb-6">{project.folio || 'SIN FOLIO'}</p>
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest overflow-hidden truncate mr-2">
                                                    {project.municipio}, {project.estado}
                                                </span>
                                                <button className="text-[#173F4A] hover:text-[#8FC044] transition-colors shrink-0">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Resumen de Proyectos (Editor) */}
                        <div className="lg:col-span-1 bg-[#173F4A] p-10 rounded-[2.5rem] shadow-2xl text-white">
                            <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Mi Resumen</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">Estadísticas de trabajo</p>

                            <div className="space-y-6">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#8FC044] flex items-center justify-center text-white">
                                        <Edit3 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">En Proceso</p>
                                        <h4 className="text-3xl font-black">{projects.filter(p => p.avance < 100).length}</h4>
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Completados</p>
                                        <h4 className="text-3xl font-black">{projects.filter(p => p.avance === 100).length}</h4>
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total Folios</p>
                                        <h4 className="text-3xl font-black">{projects.length}</h4>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-4 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#173F4A] transition-all duration-500">
                                Ver Todos los Proyectos
                            </button>
                        </div>
                    </div>
                )}

                {/* VISTA ADMIN */}
                {role === 'admin' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Tabla de Modificaciones */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden">
                            <div className="p-10 border-b border-gray-50 flex justify-between items-end">
                                <div>
                                    <h3 className="font-black text-[#173F4A] text-3xl tracking-tighter uppercase">Proyectos Recientes</h3>
                                    <p className="text-gray-400 text-sm font-light mt-1">Últimas actualizaciones en el sistema</p>
                                </div>
                                <span className="text-[10px] font-black text-[#173F4A] uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100 italic">
                                    {projects.length} REGISTROS
                                </span>
                            </div>
                            
                            {loadingData ? (
                                <div className="flex flex-col items-center justify-center py-24 text-gray-300">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sincronizando base de datos...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#FBFBFC]">
                                            <tr>
                                                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Proyecto / Folio</th>
                                                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ubicación</th>
                                                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Avance</th>
                                                <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Estatus</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {projects.slice(0, 5).map((row, i) => (
                                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-10 py-6">
                                                        <div className="font-black text-gray-900 text-lg tracking-tight group-hover:text-[#1D8348] transition-colors truncate max-w-[200px]">{row.title}</div>
                                                        <div className="text-[10px] text-gray-400 font-mono mt-1 opacity-50 uppercase">{row.folio || 'S/F'}</div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className="text-sm font-bold text-gray-600">{row.municipio}</div>
                                                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">{row.estado}</div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-[#8FC044] rounded-full transition-all duration-1000" style={{ width: `${row.avance}%` }}></div>
                                                            </div>
                                                            <span className="text-[10px] font-black text-gray-700">{row.avance}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${row.avance === 100 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                                                            {row.avance === 100 ? 'TERMINADO' : 'EN PROCESO'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Resumen de Usuarios (Admin) */}
                        <div className="lg:col-span-1 bg-[#173F4A] p-10 rounded-[2.5rem] shadow-2xl text-white flex flex-col">
                            <h3 className="text-xl font-black tracking-tighter uppercase mb-2">Resumen de Equipo</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">Control de acceso y perfiles</p>

                            <div className="space-y-6 flex-1">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <Users size={20} className="text-white" />
                                        </div>
                                        <span className="text-xs font-bold text-white/70 tracking-wide">Total Usuarios</span>
                                    </div>
                                    <h4 className="text-2xl font-black">{loadingData ? '...' : users.length}</h4>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-[#8FC044]/20 flex items-center justify-center">
                                            <Edit3 size={20} className="text-[#8FC044]" />
                                        </div>
                                        <span className="text-xs font-bold text-white/70 tracking-wide">Editores Activos</span>
                                    </div>
                                    <h4 className="text-2xl font-black">{loadingData ? '...' : users.filter(u => u.is_staff && !u.is_superuser).length}</h4>
                                </div>

                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                            <ShieldCheck size={20} className="text-blue-400" />
                                        </div>
                                        <span className="text-xs font-bold text-white/70 tracking-wide">Administradores</span>
                                    </div>
                                    <h4 className="text-2xl font-black">{loadingData ? '...' : users.filter(u => u.is_superuser).length}</h4>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-4 rounded-2xl bg-white text-[#173F4A] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#8FC044] hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
                                Gestionar Usuarios
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}