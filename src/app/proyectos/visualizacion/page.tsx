'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiMap } from 'react-icons/fi';

export default function VisualizacionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get('id') || 'N/A';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-[var(--font-poppins)] flex flex-col">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f2b35] via-[#173F4A] to-[#1a5c3a] px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => router.push('/proyectos')}
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <p className="text-xs text-white/50 font-mono tracking-wider">{projectId}</p>
                        <h1 className="text-2xl font-bold text-white">Visualización del Proyecto</h1>
                    </div>
                </div>
            </div>

            {/* Content placeholder */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100 flex items-center justify-center mx-auto mb-6">
                        <FiMap className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Visualización</h2>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Esta sección mostrará la visualización geoespacial del proyecto. Contenido próximamente.
                    </p>
                </div>
            </div>
        </div>
    );
}
