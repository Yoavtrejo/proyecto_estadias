'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiChevronDown, FiLayers, FiPlus } from 'react-icons/fi';
import { ProjectFormData, AVAILABLE_CAPAS, EMPTY_FORM, CATEGORIA_CHOICES, ESCALA_CHOICES } from '../types/project';

interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => void;
}

export default function ProjectFormModal({ isOpen, onClose, onSubmit }: ProjectFormModalProps) {
    const [form, setForm] = useState<ProjectFormData>(EMPTY_FORM);
    const [capasDropdownOpen, setCapasDropdownOpen] = useState(false);
    const [customCapa, setCustomCapa] = useState('');
    const capasDropdownRef = useRef<HTMLDivElement>(null);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setForm(EMPTY_FORM);
            setCustomCapa('');
            setCapasDropdownOpen(false);
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (capasDropdownRef.current && !capasDropdownRef.current.contains(e.target as Node)) {
                setCapasDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleCapa = (capa: string) => {
        setForm((prev) => ({
            ...prev,
            capas: prev.capas.includes(capa)
                ? prev.capas.filter((c) => c !== capa)
                : [...prev.capas, capa],
        }));
    };

    const handleRemoveCapa = (capa: string) => {
        setForm((prev) => ({
            ...prev,
            capas: prev.capas.filter((c) => c !== capa),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Manejar capa personalizada "Otra"
        let finalCapas = [...form.capas];
        if (finalCapas.includes('Otra') && customCapa.trim()) {
            finalCapas = finalCapas.filter(c => c !== 'Otra');
            finalCapas.push(customCapa.trim());
        }

        const dataToSubmit = { ...form, capas: finalCapas };
        onSubmit(dataToSubmit);
        setForm(EMPTY_FORM);
        setCustomCapa('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[fadeInUp_0.3s_ease-out]">
                {/* Modal header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between rounded-t-2xl z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Registrar Proyecto</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Completa la información del nuevo proyecto catastral.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal body */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">

                    {/* Nombre del Proyecto */}
                    <div>
                        <label htmlFor="field-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Nombre del Proyecto
                        </label>
                        <input
                            type="text"
                            id="field-title"
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Ej: Zona Norte Hidalgo"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Estado & Municipio */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="field-estado" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Estado
                            </label>
                            <div className="relative">
                                <select
                                    id="field-estado"
                                    required
                                    value={form.estado}
                                    onChange={(e) => setForm({ ...form, estado: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                                >
                                    <option value="">Seleccionar estado</option>
                                    <option value="Aguascalientes">Aguascalientes</option>
                                    <option value="Baja California">Baja California</option>
                                    <option value="Baja California Sur">Baja California Sur</option>
                                    <option value="Campeche">Campeche</option>
                                    <option value="Chiapas">Chiapas</option>
                                    <option value="Chihuahua">Chihuahua</option>
                                    <option value="Ciudad de México">Ciudad de México</option>
                                    <option value="Coahuila">Coahuila</option>
                                    <option value="Colima">Colima</option>
                                    <option value="Durango">Durango</option>
                                    <option value="Guanajuato">Guanajuato</option>
                                    <option value="Guerrero">Guerrero</option>
                                    <option value="Hidalgo">Hidalgo</option>
                                    <option value="Jalisco">Jalisco</option>
                                    <option value="Estado de México">Estado de México</option>
                                    <option value="Michoacán">Michoacán</option>
                                    <option value="Morelos">Morelos</option>
                                    <option value="Nayarit">Nayarit</option>
                                    <option value="Nuevo León">Nuevo León</option>
                                    <option value="Oaxaca">Oaxaca</option>
                                    <option value="Puebla">Puebla</option>
                                    <option value="Querétaro">Querétaro</option>
                                    <option value="Quintana Roo">Quintana Roo</option>
                                    <option value="San Luis Potosí">San Luis Potosí</option>
                                    <option value="Sinaloa">Sinaloa</option>
                                    <option value="Sonora">Sonora</option>
                                    <option value="Tabasco">Tabasco</option>
                                    <option value="Tamaulipas">Tamaulipas</option>
                                    <option value="Tlaxcala">Tlaxcala</option>
                                    <option value="Veracruz">Veracruz</option>
                                    <option value="Yucatán">Yucatán</option>
                                    <option value="Zacatecas">Zacatecas</option>
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="field-municipio" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Municipio
                            </label>
                            <input
                                type="text"
                                id="field-municipio"
                                required
                                value={form.municipio}
                                onChange={(e) => setForm({ ...form, municipio: e.target.value })}
                                placeholder="Ej: Pachuca de Soto"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Categoría */}
                    <div>
                        <label htmlFor="field-categoria" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Categoría
                        </label>
                        <div className="relative">
                            <select
                                id="field-categoria"
                                required
                                value={form.categoria}
                                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                            >
                                <option value="">Seleccionar categoría</option>
                                {CATEGORIA_CHOICES.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Tipo de Escala */}
                    <div>
                        <label htmlFor="field-escala" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Tipo de Escala
                        </label>
                        <div className="relative">
                            <select
                                id="field-escala"
                                required
                                value={form.tipoEscala}
                                onChange={(e) => setForm({ ...form, tipoEscala: e.target.value })}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all bg-white"
                            >
                                <option value="">Seleccionar escala</option>
                                {ESCALA_CHOICES.map(e => (
                                    <option key={e.value} value={e.value}>{e.label}</option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Capas - Multi-select combo box */}
                    <div ref={capasDropdownRef}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Nombres de Capas
                        </label>

                        {/* Dropdown trigger */}
                        <button
                            type="button"
                            id="btn-capas-dropdown"
                            onClick={() => setCapasDropdownOpen(!capasDropdownOpen)}
                            className={`w-full border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all bg-white ${capasDropdownOpen
                                    ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <span className={form.capas.length > 0 ? 'text-gray-700' : 'text-gray-400'}>
                                {form.capas.length > 0
                                    ? `${form.capas.length} capa${form.capas.length > 1 ? 's' : ''} seleccionada${form.capas.length > 1 ? 's' : ''}`
                                    : 'Seleccionar capas...'}
                            </span>
                            <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${capasDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown options */}
                        {capasDropdownOpen && (
                            <div className="mt-2 border border-gray-200 rounded-xl bg-white shadow-lg shadow-black/10 max-h-52 overflow-y-auto animate-[fadeInUp_0.15s_ease-out]">
                                {AVAILABLE_CAPAS.map((capa) => {
                                    const isSelected = form.capas.includes(capa);
                                    return (
                                        <button
                                            type="button"
                                            key={capa}
                                            onClick={() => handleToggleCapa(capa)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${isSelected
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {/* Checkbox visual */}
                                            <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                                                    ? 'bg-emerald-500 border-emerald-500'
                                                    : 'border-gray-300'
                                                }`}>
                                                {isSelected && (
                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </span>
                                            <FiLayers className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-500' : 'text-gray-400'}`} />
                                            {capa}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Selected tags */}
                        {form.capas.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {form.capas.map((capa) => (
                                    <span
                                        key={capa}
                                        className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
                                    >
                                        <FiLayers className="w-3 h-3" />
                                        {capa}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCapa(capa)}
                                            className="ml-0.5 text-emerald-400 hover:text-red-500 transition-colors"
                                        >
                                            <FiX className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {/* Custom Capa Input */}
                        {form.capas.includes('Otra') && (
                            <div className="mt-3 animate-[fadeInUp_0.15s_ease-out]">
                                <label htmlFor="field-custom-capa" className="block text-xs font-semibold text-emerald-600 mb-1.5 ml-1">
                                    Especifica el nombre de la capa
                                </label>
                                <input
                                    type="text"
                                    id="field-custom-capa"
                                    required
                                    value={customCapa}
                                    onChange={(e) => setCustomCapa(e.target.value)}
                                    placeholder="Ej: Levantamiento Aéreo"
                                    className="w-full border border-emerald-200 bg-emerald-50/30 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Submit buttons */}
                    <div className="flex justify-end gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            id="btn-submit-proyecto"
                            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#004b71] to-[#4caf50] shadow-md hover:opacity-90 transition-all"
                        >
                            Registrar Proyecto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
