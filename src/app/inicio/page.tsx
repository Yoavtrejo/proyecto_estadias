import fondo from "@/assets/fondo.png";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
            {/* El contenido principal se adapta al navbar superior */}
            <main className="transition-all duration-300">

                {/* Hero Section Refinada */}
                <section className="relative h-[500px] w-full overflow-hidden md:rounded-bl-[4rem] shadow-2xl">
                    <img
                        src={fondo.src}
                        alt="Fondo de cultivos"
                        className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-16">
                        <div className="max-w-2xl">
                            <span className="inline-block px-4 py-1 rounded-full bg-[#4aaccc]/20 text-[#4aaccc] text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md border border-[#4aaccc]/30">
                                Sistema de Información Catastral
                            </span>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                                Convirtiendo Datos en <span className="text-[#97bb5e]">Territorio</span>
                            </h1>
                            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
                                Impulsamos la gestión del entorno natural  y transformamos métricas complejas en información estratégica.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section (Las Cards) */}
                <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-card-border hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#4aaccc]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <span className="icon-[tabler--map-2] text-[#4aaccc] text-2xl"></span>
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-4">Análisis de Predios</h3>
                            <p className="opacity-70 text-sm leading-relaxed mb-6">
                                Evaluación detallada de terrenos para una gestión eficiente y transparente de los recursos territoriales.
                            </p>
                            <div className="h-1 w-12 bg-[#4aaccc] rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-card-border hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#97bb5e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <span className="icon-[tabler--leaf] text-[#97bb5e] text-2xl"></span>
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-4">Sostenibilidad</h3>
                            <p className="opacity-70 text-sm leading-relaxed mb-6">
                                Planificación equilibrada para un desarrollo respetuoso con el medio ambiente y las futuras generaciones.
                            </p>
                            <div className="h-1 w-12 bg-[#97bb5e] rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-card-border hover:-translate-y-3 transition-all duration-500 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#1e5482]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <span className="icon-[tabler--globe] text-[#1e5482] text-2xl"></span>
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-4">Gestión Geoespacial</h3>
                            <p className="opacity-70 text-sm leading-relaxed mb-6">
                                Integración estratégica de datos espaciales para optimizar el crecimiento urbano y rural.
                            </p>
                            <div className="h-1 w-12 bg-[#1e5482] rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}