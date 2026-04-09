import Link from 'next/link';
import fondo from "@/assets/fondo.png";

export default function Politicas() {
    return (
        <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={fondo.src}
                    alt="Fondo SICAT"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full">
                {/* Header Strip */}
                <div className="bg-gradient-to-r from-[#004b71] to-[#4caf50] h-3 w-full"></div>

                <div className="p-8 sm:p-12">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#004b71] mb-4 tracking-tight">POLÍTICA DE PRIVACIDAD</h1>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">SICAT - Sistema de Información Catastral</h2>
                    </div>

                    <div className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">

                        <section>
                            <p>
                                El SICAT es un sistema de información interno desarrollado para la gestión, consulta y visualización de datos catastrales. Este sistema es propiedad del Instituto Geográfico Nacional (IGN) y su uso está restringido a personal autorizado.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Datos Personales</h3>
                            <p>
                                El SICAT recopila datos personales de los usuarios, incluyendo nombre, correo electrónico y contraseña. Estos datos son utilizados únicamente para la gestión de acceso al sistema y no son compartidos con terceros.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Cookies</h3>
                            <p>
                                El SICAT utiliza cookies para mantener la sesión del usuario y almacenar preferencias. Estas cookies son temporales y no almacenan información personal.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Seguridad</h3>
                            <p>
                                El SICAT implementa medidas de seguridad para proteger los datos de los usuarios, incluyendo encriptación de contraseñas y control de acceso basado en roles.
                            </p>
                        </section>

                    </div>

                    {/* Botón de regreso */}
                    <div className="mt-16 flex justify-center">
                        <Link href="/login" className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                            Volver al inicio
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}