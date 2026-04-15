'use client';

import React, { useState, useMemo } from 'react';
import { FiFolder } from 'react-icons/fi';
import { Project, ProjectFormData } from '../types/project';
import ProjectBanner from './ProjectBanner';
import ProjectSearchBar from './ProjectSearchBar';
import ProjectCard from './ProjectCard';
import ProjectFormModal from './ProjectFormModal';
import ProjectProgressModal from './ProjectProgressModal';
import { useProjects } from '../hooks/useProjects';

export default function ProjectList() {
    const [searchTerm, setSearchTerm] = useState('');
    const { projects, loading, error, fetchProjects, addProject, updateProject, removeProject } = useProjects();
    
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Filtered projects
    const visibleProjects = useMemo(() => {
        if (!searchTerm) return projects;
        return projects.filter(
            (p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.municipio.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [projects, searchTerm]);

    // --- Handlers ---
    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
            await removeProject(id);
        }
    };

    const handleCreateProject = async (formData: ProjectFormData) => {
        const success = await addProject(formData);
        if (success) {
            setShowModal(false);
        }
    };

    const handleUpdateProject = async (updatedProject: Project) => {
        const success = await updateProject(updatedProject.id, updatedProject);
        if (success) {
            setEditingProject(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-[var(--font-poppins)]">
            {/* Banner */}
            <ProjectBanner onNewProject={() => setShowModal(true)} />

            {/* Search */}
            <ProjectSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {/* Project Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Global Error Alert */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-between">
                        <span className="text-sm font-medium">{error}</span>
                        <button onClick={() => fetchProjects()} className="text-sm font-semibold underline hover:text-red-800">
                            Reintentar
                        </button>
                    </div>
                )}

                {loading && visibleProjects.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Cargando proyectos...</p>
                    </div>
                ) : visibleProjects.length === 0 && !error ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiFolder className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-1">No se encontraron proyectos</h3>
                        <p className="text-sm text-slate-500">Intenta con otro término de búsqueda o registra un nuevo proyecto.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onEdit={setEditingProject}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Registration Modal */}
            <ProjectFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreateProject}
            />

            {/* Progress Edit Modal */}
            <ProjectProgressModal 
                isOpen={!!editingProject}
                project={editingProject}
                onClose={() => setEditingProject(null)}
                onSave={handleUpdateProject}
            />

            {/* Keyframe for modal animation */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
