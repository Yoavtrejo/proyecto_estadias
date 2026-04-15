'use client';

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface ProjectSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function ProjectSearchBar({ searchTerm, onSearchChange }: ProjectSearchBarProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 -mt-5 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100 px-5 py-4 flex items-center gap-3">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    id="search-proyectos"
                    placeholder="Buscar por nombre, estado o municipio..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                {searchTerm && (
                    <button onClick={() => onSearchChange('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <FiX className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
