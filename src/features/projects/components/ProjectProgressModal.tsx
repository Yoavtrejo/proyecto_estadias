'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { Project, ProjectPhase } from '../types/project';

interface ProjectProgressModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedProject: Project) => void;
}

export default function ProjectProgressModal({ project, isOpen, onClose, onSave }: ProjectProgressModalProps) {
    const [fases, setFases] = useState<ProjectPhase[]>([]);
    const [avance, setAvance] = useState<number>(0);

    // Load data when modal opens
    useEffect(() => {
        if (project && isOpen) {
            setFases(project.fases ? [...project.fases] : []);
            setAvance(project.avance);
        }
    }, [project, isOpen]);

    const handleTogglePhase = (phaseId: string) => {
        setFases(prev => {
            const updated = prev.map(f =>
                f.id === phaseId ? { ...f, completed: !f.completed } : f
            );
            
            // Auto-calculate suggested progress based on phases
            const completedCount = updated.filter(f => f.completed).length;
            const suggestedProgress = updated.length > 0
                ? Math.round((completedCount / updated.length) * 100)
                : 0;
                
            setAvance(suggestedProgress);
            return updated;
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!project) return;

        // Auto-update status based on progress
        let newStatus: Project['status'] = 'Pendiente';
        if (avance > 0 && avance < 100) newStatus = 'En proceso';
        if (avance === 100) newStatus = 'Completado';

        onSave({
            ...project,
            fases,
            avance,
            status: newStatus,
        });
    };

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[fadeInUp_0.3s_ease-out]">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Actualizar Avance</h2>
                        <p className="text-xs text-gray-500 mt-0.5 font-mono">{project.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="px-6 py-5 space-y-6">
                    {/* Fases Checklist */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Fases del Proyecto
                        </label>
                        <div className="space-y-2">
                            {fases.map(fase => (
                                <label 
                                    key={fase.id} 
                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                        fase.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <input 
                                        type="checkbox"
                                        checked={fase.completed}
                                        onChange={() => handleTogglePhase(fase.id)}
                                        className="hidden"
                                    />
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                        fase.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-gray-50'
                                    }`}>
                                        {fase.completed && <FiCheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${fase.completed ? 'text-emerald-800' : 'text-gray-700'}`}>
                                        {fase.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Progress Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-semibold text-gray-700">
                                Porcentaje Manual
                            </label>
                            <span className="text-lg font-bold text-[#004b71] bg-blue-50 px-3 py-1 rounded-lg">
                                {avance}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={avance}
                            onChange={(e) => setAvance(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4caf50]"
                        />
                        <p className="text-xs text-gray-400 mt-2">
                            Puedes marcar fases para sugerir un porcentaje, o mover el deslizador manualmente para mayor precisión.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#004b71] to-[#4caf50] shadow-md hover:opacity-90 transition-all font-medium py-2 rounded"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
