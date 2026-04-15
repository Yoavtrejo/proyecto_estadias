'use client';

import React from 'react';
import { FiPlus, FiFolder } from 'react-icons/fi';

interface ProjectBannerProps {
    onNewProject: () => void;
}

export default function ProjectBanner({ onNewProject }: ProjectBannerProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0f2b35] via-[#173F4A] to-[#1a5c3a]">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-widest text-white/90">
                        <FiFolder className="w-3.5 h-3.5" />
                        GESTIÓN DE PROYECTOS
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Proyectos <span className="text-emerald-400">Catastrales</span>
                    </h1>
                    <p className="text-white/60 text-sm max-w-md">
                        Crea, administra y da seguimiento a tus proyectos con información geoespacial detallada.
                    </p>
                </div>

                <button
                    onClick={onNewProject}
                    id="btn-nuevo-proyecto"
                    className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                    <FiPlus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
                    Registrar Proyecto
                </button>
            </div>
        </div>
    );
}
