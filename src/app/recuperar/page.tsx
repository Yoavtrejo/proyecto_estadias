"use client";
import fondo from "@/assets/Sicat_fondo.png";
import logo from "@/assets/SICAT_TR.png";
import Link from "next/link";
import { useState } from "react";
import api from "@/api/axiosconfig";

export default function RecoverPasswordPage() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('password-reset/', { email });
            // Aunque falle el correo no exista, la api con alta seguridad devuelve 200 OK
            setEnviado(true);
        } catch (error: any) {
            console.error(error);
            alert(`Error de servidor: ${error.response?.data?.error || error.message || "Intente de nuevo"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fixed inset-0 flex overflow-hidden bg-white">
            {/* ── Lado Izquierdo: Imagen ── */}
            <div className="hidden lg:flex w-1/2 h-full flex-shrink-0 relative">
                <img
                    src={fondo.src}
                    alt="Vista aérea de cultivos"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            {/* ── Lado Derecho: Formulario ── */}
            <div className="w-full lg:w-1/2 h-full flex flex-col bg-white">
                {/* Logo superior derecho */}
                <div className="flex justify-end px-10 pt-6 flex-shrink-0">
                    <img src={logo.src} alt="SICAT" className="h-14 w-auto" />
                </div>

                {/* Formulario centrado verticalmente */}
                <div className="flex-1 flex items-center justify-center px-8">
                    <div className="w-full max-w-sm">
                        <div className="w-full">
                            <div className="mb-7">
                                <h1 className="text-4xl font-serif text-[#3d2a1d] mb-2 leading-tight">
                                    Recuperar contraseña
                                </h1>
                                <p className="text-gray-500 text-sm">Ingrese su correo para recibir las instrucciones.</p>
                            </div>

                            {enviado ? (
                                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg shadow-sm">
                                    <h3 className="font-semibold mb-1">¡Correo enviado!</h3>
                                    <p className="text-sm">Si existe una cuenta asociada a ese correo, recibirás un enlace para restablecer tu contraseña.</p>
                                    <div className="mt-4">
                                        <Link href="/login" className="text-sm font-medium text-[#004b71] hover:underline">
                                            Volver al inicio de sesión
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Correo electrónico
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Ej. nombre.apellido@ejemplo.com"
                                                required
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-2.5 px-4 bg-gradient-to-r from-[#004b71] to-[#4caf50] text-white font-semibold rounded-lg shadow-sm transition-opacity text-sm 
                                            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:opacity-95'}`}
                                    >
                                        {loading ? "Enviando..." : "Enviar instrucciones"}
                                    </button>

                                    <div className="text-center mt-4">
                                        <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-[#004b71] transition-colors">
                                            Volver al inicio de sesión
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer fijo abajo */}
                <footer className="flex-shrink-0 pb-6 pt-3 text-center text-xs text-gray-400">
                    <div className="flex items-center justify-center gap-5 mb-1">
                        <a href="#" className="hover:underline underline-offset-2">Términos de servicio</a>
                        <a href="#" className="hover:underline underline-offset-2">Política de privacidad</a>
                    </div>
                    <p>© {new Date().getFullYear()} SICAT - Todos los derechos reservados.</p>
                </footer>
            </div>
        </main>
    );
}
