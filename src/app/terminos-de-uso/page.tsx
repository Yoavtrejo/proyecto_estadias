import Link from 'next/link';
import fondo from "@/assets/fondo.png";

export default function Terminos() {
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
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#004b71] mb-4 tracking-tight">TÉRMINOS Y CONDICIONES DE USO</h1>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">SICAT - Sistema de Información Catastral</h2>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Instituto Universitario de Ciencias Ambientales (SIGSA) | Abril de 2026</p>
                    </div>

                    <div className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">1. ACEPTACIÓN DE LOS TÉRMINOS</h3>
                            <p className="mb-3">
                                Al acceder y utilizar el Sistema de Información Catastral (SICAT), operado por el Instituto Universitario de Ciencias Ambientales (SIGSA), con sede en el municipio de Tulancingo de Bravo, Hidalgo, México.
                                El usuario acepta quedar vinculado por los presentes Términos y condiciones de Uso, así como por las disposiciones aplicadas de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares
                                (LFPDPPP) y demás normatividades vigentes.
                            </p>
                            <p>
                                Si el usuario no está de acuerdo con alguno de los términos aquí establecidos, deberá abstenerse de utilizar el sistema.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">2. DESCRIPCIÓN DEL SERVICIO</h3>
                            <p className="mb-3">
                                El SICAT es un sistema de información interno desarrollado para la gestión, consulta y visualización de datos geoespaciales. El acceso al sistema está restringido a clientes externos debidamente autorizados por
                                el Instituto Universitario de Ciencias Ambientales (SIGSA), quienes deberán contar con credenciales de acceso válidas.
                            </p>
                            <h4 className="font-semibold text-gray-800 mb-2">Las principales funcionalidades del sistema son:</h4>
                            <ul className="list-disc pl-6 mb-3 space-y-1 text-gray-600">
                                <li>Consulta, visualización e impresión de información geoespacial</li>
                                <li>Generación de reportes relacionados con datos geoespaciales</li>
                                <li>Administración de datos personales asociados a predios y usuarios</li>
                            </ul>
                            <p>
                                El Instituto Universitario de Ciencias Ambientales (SIGSA) se reserva el derecho de modificar, suspender o interrumpir el servicio en cualquier momento, sin previo aviso.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">3. RESPONSABILIDADES DEL USUARIO</h3>
                            <p className="mb-3">
                                El usuario se compromete a utilizar el sistema de acuerdo con los presentes términos y condiciones, así como con las disposiciones aplicadas de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares
                                (LFPDPPP) y demás normatividades vigentes.
                            </p>
                            <h4 className="font-semibold text-gray-800 mb-2">El usuario se compromete a:</h4>
                            <ul className="list-disc pl-6 space-y-1 text-gray-600">
                                <li>Utilizar el sistema de acuerdo con los presentes términos y condiciones</li>
                                <li>No utilizar el sistema para fines ilegales o fraudulentos</li>
                                <li>No utilizar el sistema para fines de lucro</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">4. PROPIEDAD INTELECTUAL</h3>
                            <p>
                                El SICAT es propiedad del Instituto Universitario de Ciencias Ambientales (SIGSA) y está protegido por las leyes de propiedad intelectual. El usuario no podrá copiar, modificar, distribuir o transmitir el contenido del sistema
                                sin el permiso previo por escrito del Instituto Universitario de Ciencias Ambientales (SIGSA).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">5. CONFIDENCIALIDAD</h3>
                            <p>
                                El usuario se compromete a mantener la confidencialidad de la información a la que tenga acceso a través del sistema y a no divulgarla a terceros sin el permiso previo por escrito del Instituto Universitario de Ciencias Ambientales (SIGSA).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">6. LIMITACIÓN DE RESPONSABILIDAD</h3>
                            <p>
                                El Instituto Universitario de Ciencias Ambientales (SIGSA) no será responsable por ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso del sistema, incluyendo, entre otros, la pérdida de datos, la pérdida de beneficios o la interrupción del negocio.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">7. MODIFICACIONES</h3>
                            <p>
                                El Instituto Universitario de Ciencias Ambientales (SIGSA) se reserva el derecho de modificar los presentes términos y condiciones en cualquier momento, sin previo aviso. El usuario será notificado de cualquier modificación a través del sistema.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">8. LEGISLACIÓN APLICABLE</h3>
                            <p>
                                Los presentes términos y condiciones se rigen por las leyes de los Estados Unidos Mexicanos y las disposiciones aplicadas de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y demás normatividades vigentes.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">9. JURISDICCIÓN</h3>
                            <p>
                                Para la interpretación y cumplimiento de los presentes términos y condiciones, las partes se someten a la jurisdicción de los tribunales competentes del Estado de Hidalgo, México.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">10. ACEPTACIÓN</h3>
                            <p>
                                Al utilizar el sistema, el usuario acepta de manera expresa los presentes términos y condiciones.
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