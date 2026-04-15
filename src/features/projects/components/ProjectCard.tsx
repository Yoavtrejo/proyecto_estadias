'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiEye, FiMapPin, FiLayers } from 'react-icons/fi';
import { Project, STATUS_CONFIG } from '../types/project';

// --- Helper ---
const getProgressColor = (avance: number) => {
    if (avance >= 80) return 'from-emerald-400 to-emerald-600';
    if (avance >= 40) return 'from-amber-400 to-amber-500';
    return 'from-slate-300 to-slate-400';
};

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
    const router = useRouter();
    const statusStyle = STATUS_CONFIG[project.status];

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            {/* Card top accent */}
            <div className="h-1 bg-gradient-to-r from-[#173F4A] to-emerald-500" />

            <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="text-xs font-mono font-medium text-emerald-500 bg-emerald-50 inline-block px-2 py-1 rounded-md mb-2">
                            {project.folio || project.id}
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-[#4caf50] transition-colors">{project.title}</h3>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {project.status}
                    </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                    <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{project.municipio}, {project.estado}</span>
                </div>

                {/* Progress */}
                <div className="mb-5">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-gray-500 font-medium">Avance del proyecto</span>
                        <span className="font-bold text-gray-700 text-sm">{project.avance}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-2">
                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(project.avance)} transition-all duration-700`}
                            style={{ width: `${project.avance}%` }}
                        />
                    </div>
                    <div className="flex justify-start items-center">
                        <span className="text-[11px] text-gray-400 font-medium">
                            Fases completadas: <strong className="text-gray-600">{project.fases ? project.fases.filter(f => f.completed).length : 0}/{project.fases ? project.fases.length : 5}</strong>
                        </span>
                    </div>
                </div>

                {/* Layers preview */}
                <div className="flex items-center gap-2 mb-5">
                    <FiLayers className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                        {project.capas.slice(0, 3).map((capa) => (
                            <span key={capa} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                {capa}
                            </span>
                        ))}
                        {project.capas.length > 3 && (
                            <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                                +{project.capas.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <button
                        onClick={() => router.push(`/dashboard?proyecto_id=${project.id}&estado=${encodeURIComponent(project.estado)}&municipio=${encodeURIComponent(project.municipio)}`)}
                        id={`btn-ver-${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#173F4A] hover:text-emerald-600 transition-colors duration-200"
                    >
                        <FiEye className="w-4 h-4" />
                        Ver en mapa
                    </button>

                    <div className="flex items-center gap-1">
                        <button
                            id={`btn-editar-${project.id}`}
                            onClick={() => onEdit(project)}
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            title="Editar avance y fases"
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(project.id)}
                            id={`btn-eliminar-${project.id}`}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                            title="Eliminar proyecto"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
