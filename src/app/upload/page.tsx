'use client'

import React, {useEffect, useState} from 'react';
import { UploadLayerForm } from '@/features/dashboard';
import { useMapLayers } from '@/features/dashboard';
import Image from 'next/image';
import optionsImg from '@/assets/options.png';
import img from '@/assets/image.png';
import { useRouter } from 'next/navigation';


export default function Upfileview() {
    const router = useRouter();
    const {cargarListaCapas, listaCapas, eliminarCapa} = useMapLayers();
    const [paginaActual, setPaginaActual] = useState(1);
    const capasPorPagina = 5;

    // Estado para el modal de confirmación
    const [modalAbierto, setModalAbierto] = useState(false);
    const [capaAEliminar, setCapaAEliminar] = useState<{id: number, nombre: string} | null>(null);
    const [eliminando, setEliminando] = useState(false);

    // Estado para el toast de feedback
    const [toast, setToast] = useState<{text: string, type: 'success' | 'error'} | null>(null);

    const indiceUltimaCapa = paginaActual * capasPorPagina;
    const indicePrimeraCapa = indiceUltimaCapa - capasPorPagina;
    const capasActuales = listaCapas.slice(indicePrimeraCapa, indiceUltimaCapa);

    const totalPaginas = Math.ceil(listaCapas.length / capasPorPagina);

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    // Abrir modal de confirmación
    const abrirModalEliminar = (id: number, nombre: string) => {
        setCapaAEliminar({id, nombre});
        setModalAbierto(true);
    };

    // Confirmar eliminación
    const confirmarEliminacion = async () => {
        if (!capaAEliminar) return;
        setEliminando(true);
        try {
            await eliminarCapa(capaAEliminar.id);
            setToast({text: `Capa "${capaAEliminar.nombre}" eliminada exitosamente.`, type: 'success'});
            // Si la página actual queda vacía, retroceder
            const nuevasCantidad = listaCapas.length - 1;
            const nuevoTotalPaginas = Math.ceil(nuevasCantidad / capasPorPagina);
            if (paginaActual > nuevoTotalPaginas && nuevoTotalPaginas > 0) {
                setPaginaActual(nuevoTotalPaginas);
            }
        } catch {
            setToast({text: 'Error al eliminar la capa. Intenta de nuevo.', type: 'error'});
        } finally {
            setEliminando(false);
            setModalAbierto(false);
            setCapaAEliminar(null);
        }
    };

    // Auto-ocultar toast después de 3 segundos
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
            cargarListaCapas();
        },[cargarListaCapas]);
    return (
    <div className="bg-surface text-on-surface font-body min-h-screen topo-pattern">
        {/* Modal de confirmación de eliminación */}
        {modalAbierto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-surface-container-low rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-outline-variant/20 animate-in fade-in zoom-in">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-red-600 text-2xl">delete_forever</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-headline font-bold text-on-surface">Eliminar Capa</h3>
                            <p className="text-sm text-on-surface-variant">Esta acción no se puede deshacer</p>
                        </div>
                    </div>
                    <p className="text-on-surface-variant mb-6">
                        ¿Estás seguro de que deseas eliminar la capa{' '}
                        <strong className="text-on-surface">&quot;{capaAEliminar?.nombre}&quot;</strong>?
                        Se eliminarán todos los datos geográficos asociados.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => { setModalAbierto(false); setCapaAEliminar(null); }}
                            disabled={eliminando}
                            className="px-5 py-2.5 rounded-lg text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarEliminacion}
                            disabled={eliminando}
                            className={`px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all ${
                                eliminando 
                                ? 'bg-red-300 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700 shadow-sm hover:shadow-md'
                            }`}
                        >
                            {eliminando ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                    Eliminando...
                                </span>
                            ) : 'Eliminar'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
            <header className="mb-12 space-y-4">
                <h1 className="font-headline text-5xl md:text-6xl text-on-surface font-bold leading-tight">
                    Importar Datos <br/>
                    <span className="text-primary">Geoespaciales</span>
                </h1>
                <p className="text-on-surface-variant max-w-2xl text-lg">
                    Integre nuevas capas de informacion al sistema de iformacion catastral, el sistema procesará y validará sus datos para garantizar su correcta visualización y análisis en el mapa de SICAT.
                </p>
                <div>
                    <button 
                        onClick={() => router.push('/dashboard')}
                        className="bg-primary text-on-primary hover:bg-primary-container text-sm font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Dashboard
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <section className="lg:col-span-8">
                    <div className="bg-surface-container-lowest p-2 rounded-xl shadow-sm ring-1 ring-outline-variant/10">
                        <div className="border-2 border-dashed border-outline-variant/40 rounded-lg p-12 flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-low group">
                            <UploadLayerForm />
                        </div>
                    </div>
                    <div className="mt-8 p-6 bg-surface-container-low rounded-xl w-full">
                        <h3 className="text-xl font-headline font-bold text-on-surface mb-6">
                            Historial de capas subidas
                        </h3>

                        {listaCapas.length === 0 ? (
                            <p className="text-sm text-on-surface-variant italic text-center py-8">
                                No hay capas subidas aún.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-outline-variant/40">
                                            <th className="py-3 px-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider">Nombre de la Capa</th>
                                            <th className="py-3 px-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider">Categoría</th>
                                            <th className="py-3 px-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider">Municipio</th>
                                            <th className="py-3 px-4 text-sm font-bold text-on-surface-variant uppercase tracking-wider text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {capasActuales.map((capa) => (
                                            <tr 
                                                key={capa.id} 
                                                className="border-b border-outline-variant/20 hover:bg-surface-container-high transition-colors"
                                            >
                                                <td className="py-3 px-4 text-sm font-bold text-primary">
                                                    {capa.nombre_capa}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-on-surface-variant uppercase">
                                                    {capa.categoria}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-on-surface-variant uppercase">
                                                    {capa.municipio}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <button
                                                        id={`delete-layer-${capa.id}`}
                                                        onClick={() => abrirModalEliminar(capa.id, capa.nombre_capa)}
                                                        title="Eliminar capa"
                                                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {totalPaginas > 1 && (
                                    <div className="flex items-center justify-between mt-6 px-4">
                                        <p className="text-sm text-on-surface-variant">
                                            Mostrando <span className="font-bold">{indicePrimeraCapa + 1}</span> a <span className="font-bold">{Math.min(indiceUltimaCapa, listaCapas.length)}</span> de <span className="font-bold">{listaCapas.length}</span> capas
                                        </p>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={irPaginaAnterior}
                                                disabled={paginaActual === 1}
                                                className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                                                    paginaActual === 1 
                                                    ? 'text-outline-variant cursor-not-allowed' 
                                                    : 'text-on-surface hover:bg-surface-variant'
                                                }`}
                                            >
                                                
                                                <span className="sr-only">Anterior</span>
                                            </button>
                                            
                                            <span className="flex items-center text-sm font-medium text-on-surface px-4 py-2 bg-surface-container-highest rounded-md">
                                                Página {paginaActual} de {totalPaginas}
                                            </span>

                                            <button 
                                                onClick={irPaginaSiguiente}
                                                disabled={paginaActual === totalPaginas}
                                                className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                                                    paginaActual === totalPaginas 
                                                    ? 'text-outline-variant cursor-not-allowed' 
                                                    : 'text-on-surface hover:bg-surface-variant'
                                                }`}
                                            >
                                                
                                                <span className="sr-only">Siguiente</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-primary">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">info</span>
                            Guía de Formato
                        </h4>
                        <ul className="space-y-6 text-sm text-on-surface-variant">
                            <li className="space-y-2">
                                <strong className="text-on-surface block">Estructura de Datos</strong>
                                El archivo debe ser unicamente <code className="bg-surface-variant px-1 rounded-default font-mono">GEOJSON</code> con coordenadas válidas en WGS 84 (EPSG:4326).
                            </li>
                            <li className="space-y-2">
                                <strong className="text-on-surface block">Exportar Archivos desde ArcGIS PRO</strong>
                                <p className="text-xs text-on-surface-variant">
                                    Para exportar archivos desde ArcGIS PRO, siga estos pasos:
                                </p>
                                <ol className="list-decimal list-inside text-xs text-on-surface-variant space-y-1">
                                    <li>Dirigase a Geoanalisis y seleccione Features to Json</li>
                                    <li>Seleccione la capa que desea exportar.</li>
                                    <li>Seleccione donde guardar el archivo.</li>
                                    <li>En las opciones seleccione las opciones de la imagen a continuacion.</li>
                                    <li>Establezca la proyección en WGS 84 (EPSG:4326).</li>
                                    <li>Haga clic en OK para completar la exportación.</li>
                                </ol>
                            </li>
                            <li>
                                <Image src={optionsImg} alt="Guía de Formato" className="w-full h-full object-cover"/>
                            </li>
                        </ul>
                        <div className="relative overflow-hidden bg-surface-container-high rounded-xl aspect-square group">
                            <Image src={img}  alt="Previsualización" className='class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"'/>
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent">
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Previsualización</p>
                                <p className="text-sm font-medium text-on-surface">Las capas se renderizarán sobre el mapa base de SICAT para su validación final.</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>

        {/* Toast de feedback */}
        <div className={`fixed bottom-8 right-8 flex items-center gap-3 py-3 px-6 rounded-full shadow-2xl transition-all duration-300 ${
            toast 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
            toast?.type === 'success' 
            ? 'bg-emerald-600 text-white' 
            : toast?.type === 'error' 
            ? 'bg-red-600 text-white' 
            : 'bg-on-surface text-surface'
        }`}>
            <span className="material-symbols-outlined text-lg">
                {toast?.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="text-sm font-medium">{toast?.text}</span>
        </div>
    </div>
    );
}